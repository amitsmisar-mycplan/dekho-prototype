// Audit tools are installed outside the application dependency tree; see README.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
const toolsDir = process.env.LIGHTHOUSE_TOOLS_DIR || '/tmp/dekho-audit';
const require = createRequire(path.join(toolsDir, 'package.json'));
const { default: lighthouse } = await import(pathToFileURL(require.resolve('lighthouse')).href);
const { launch } = await import(pathToFileURL(require.resolve('chrome-launcher')).href);
const { default: puppeteer } = await import(pathToFileURL(require.resolve('puppeteer-core')).href);
const origin = process.env.AUDIT_ORIGIN || 'http://localhost:3001', pollId = process.env.AUDIT_POLL_ID;
if (!pollId || !/^[A-Za-z0-9_-]{8}$/.test(pollId)) throw new Error('Set AUDIT_POLL_ID to an open poll you created for the audit.');
const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
try {
  const browser = await puppeteer.connect({ browserURL: `http://localhost:${chrome.port}` });
  const page = await browser.newPage();
  await page.goto(`${origin}/welcome`);
  // Only this disposable Chrome profile is modified. The user's profile is never touched.
  await page.evaluate(() => {
    localStorage.setItem('dekho-prototype-v0', JSON.stringify({ state: { prefs: { name: 'Amit', avatarId: 'lagoon', services: ['netflix', 'prime-video'], languages: ['Hindi', 'English'], freeOnly: false }, onboardingComplete: true, shortlist: [], watchlist: [], recentSearches: [], personalRatings: {} }, version: 0 }));
    localStorage.setItem('dekho-splash-seen', '1');
  });
  await page.close();
  const results = [];
  for (const [name, route] of [['home', '/'], ['title', '/t/aavesham'], ['voter', `/p/${pollId}`]]) {
    const { lhr } = await lighthouse(origin + route, { port: chrome.port, onlyCategories: ['performance', 'accessibility'], output: 'json', logLevel: 'error' });
    const result = {
      name, route: name === 'voter' ? '/p/[id] (open poll)' : route,
      measuredAt: lhr.fetchTime, lighthouseVersion: lhr.lighthouseVersion,
      settings: { formFactor: lhr.configSettings.formFactor, throttlingMethod: lhr.configSettings.throttlingMethod, throttling: lhr.configSettings.throttling },
      scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)])),
      metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map((key) => [key, { value: lhr.audits[key].numericValue, display: lhr.audits[key].displayValue }])),
      accessibilityFailures: lhr.categories.accessibility.auditRefs.filter(({ id }) => lhr.audits[id].score === 0).map(({ id }) => id),
    };
    results.push(result); console.log(name, result.scores);
  }
  await fs.mkdir('docs/audits', { recursive: true });
  await fs.writeFile('docs/audits/mobile-summary.json', JSON.stringify(results, null, 2) + '\n');
  await browser.disconnect();
  if (results.some((r) => r.scores.performance < 90 || r.scores.accessibility < 90)) process.exitCode = 1;
} finally { await chrome.kill(); }

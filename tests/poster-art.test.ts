import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { dataSource } from '../lib/data';
import { posterDesign, posterSeed, titleLockup, fitTitle, lineUnits } from '../lib/poster-art';
import { GeneratedPoster } from '../components/poster/GeneratedPoster';
describe('generated key art', () => {
  it('is deterministic with distinct seeds for all 68 titles and all blob centres inside the canvas', async () => {
    const titles = await dataSource.listTitles();
    expect(titles).toHaveLength(68);
    expect(new Set(titles.map((t) => posterSeed(t.id))).size).toBe(68);
    for (const title of titles) {
      const design = posterDesign(title); expect(design).toEqual(posterDesign(structuredClone(title)));
      expect(design.blobs).toHaveLength(3); expect(design.blobs.every((p) => p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100)).toBe(true);
      const lines = titleLockup(title.title); expect(lines.join(' ')).toBe(title.title); expect(lines.length).toBeLessThanOrEqual(3);
      if (title.title.includes(' ')) expect(lines.length).toBeGreaterThanOrEqual(2);
    }
  });
  it('uses primary mood and genre without changing with user preferences', async () => {
    const title = (await dataSource.getTitle('vikram'))!;
    for (const [mood, color] of Object.entries({ 'Edge-of-seat': '#9D243C', 'Feel-good': '#E5AD51', 'Mind-bender': '#8855CE', Family: '#268F88', Laugh: '#E47C39' })) {
      expect(posterDesign({ ...title, moods: [mood as typeof title.moods[number]] }).accent).toBe(color);
    }
    for (const genre of ['Thriller', 'Crime', 'Comedy', 'Drama', 'Romance']) expect(posterDesign({ ...title, genres: [genre] }).motif).toBe(genre.toLowerCase());
    expect(posterDesign({ ...title, genres: ['Science Fiction'] }).motif).toBe('sci-fi');
  });
  it('renders every title without external images, with film grain, metadata and stable aspect ratios', async () => {
    for (const title of await dataSource.listTitles()) {
      const html = renderToStaticMarkup(createElement(GeneratedPoster, { title }));
      expect(html).toContain('viewBox="0 0 300 450"'); expect(html).toContain('feTurbulence'); expect(html).toContain('opacity="0.07"');
      expect(html).toContain(title.originalLanguage.toUpperCase()); expect(html).toContain(String(title.year));
      expect(html).not.toMatch(/<image|<img|https?:\/\//);
      if (title.type === 'series') expect(html).toContain('SERIES · S1');
    }
    const title = (await dataSource.getTitle('panchayat'))!;
    const html = renderToStaticMarkup(createElement(GeneratedPoster, { title, variant: 'backdrop', serviceColor: '#65CFFF', serviceName: 'Prime Video' }));
    expect(html).toContain('viewBox="0 0 800 450"'); expect(html).toContain('On your Prime Video'); expect(html).toContain('SERIES · S1–S3');
  });
  it('allocates separate SVG definitions when the same title is rendered twice', async () => {
    const title = (await dataSource.getTitle('vikram'))!;
    const html = renderToStaticMarkup(createElement('div', null, createElement(GeneratedPoster, { title }), createElement(GeneratedPoster, { title })));
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});


describe('poster variety and responsive title fitting', () => {
  it('has no same-genre anchor/hue collision in any row of six', async () => {
    const titles = await dataSource.listTitles();
    const genres = [...new Set(titles.map((t) => t.genres[0]))];
    for (const genre of genres) {
      const group = titles.filter((t) => t.genres[0] === genre);
      const keys = group.map((title) => { const d = posterDesign(title); return `${d.anchor}:${d.hueBucket}`; });
      // Global uniqueness within each genre also covers every six-card row, regardless of rail ordering.
      expect(new Set(keys).size, genre).toBe(keys.length);
      for (let start = 0; start < keys.length; start++) { const row = keys.slice(start, start + 6); expect(new Set(row).size).toBe(row.length); }
    }
    const designs = titles.map(posterDesign);
    expect(new Set(designs.map((d) => d.family)).size).toBe(5);
    expect(new Set(designs.map((d) => d.anchor)).size).toBe(4);
    expect(designs.every((d) => d.scale >= .8 && d.scale <= 1.3 && d.tilt >= -20 && d.tilt <= 20 && Math.abs(d.hueShift) <= 35)).toBe(true);
    expect(designs.every((d) => d.palette.every((color) => /^#[0-9a-f]{6}$/i.test(color)))).toBe(true);
  });
  it.each(['The Family Man', 'Manjummel Boys', 'Everything Everywhere All at Once'])('fits %s at rail size without losing words', (title) => {
    const fit = fitTitle(title, 252, 18 * 300 / 138);
    expect(fit.fontSize * 138 / 300).toBeGreaterThanOrEqual(18);
    expect(fit.lines.length).toBeLessThanOrEqual(3);
    expect(fit.lines.join(' ')).toBe(title);
    expect(fit.widths.every((width) => width <= 252)).toBe(true);
  });
  it('ellipsizes oversized titles rather than adding a fourth line or shrinking below the minimum', () => {
    const title = 'Supercalifragilisticexpialidocious '.repeat(10).trim();
    const fit = fitTitle(title, 252, 38);
    expect(fit.fontSize).toBe(38); expect(fit.lines).toHaveLength(3);
    expect(fit.lines.every((line) => line.endsWith('…') && lineUnits(line) * fit.fontSize <= 252)).toBe(true);
  });
});

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { loadCopy } from './load-copy.mjs';
const { copy } = await loadCopy();
await mkdir('.generated/copy', { recursive: true });
for (const [screen, entries] of Object.entries(copy)) {
  const file = `.generated/copy/${screen}.ts`;
  const value = `// GENERATED from lib/copy.ts. Edit the source catalogue, never this build artifact.\nexport const ${screen}Copy = ${JSON.stringify(Object.fromEntries(Object.entries(entries).map(([key,line])=>[key,{indianEnglish:line.indianEnglish,hinglish:line.hinglish}])))} as const;\n`;
  let previous = ''; try { previous = await readFile(file, 'utf8'); } catch { /* First build. */ }
  if (previous !== value) await writeFile(file, value);
}

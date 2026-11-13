import { loadCopy } from './load-copy.mjs';
import { writeFile } from 'node:fs/promises';
const { copy } = await loadCopy();
const escape = (value) => value.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
const lines = ['# India copy review', '', 'Generated from `lib/copy.ts`. Review both voices with the Context column and `docs/voice.md`.', '', 'Hinglish is Roman-script Hindi + English, enabled only when Hindi is a saved viewing language. Unknown visitors and server share images use Indian English. Buttons stay clear. Errors, privacy, deletion and money are plain; an error may have a direct Hindi translation, never a joke. Context metadata is stripped from runtime bundles.', '', 'Placeholders such as `{name}`, `{group}`, `{count}` and `{p1}` are runtime values. Fragment rows combine with nearby labels. Catalogue titles, cast, provider names, brand names and user comments are content, not translated UI copy. Moment boundaries use browser-local time; see the voice guide.', '', '| Screen | Key | Context | Indian English | Hinglish |', '| --- | --- | --- | --- | --- |'];
let count=0;
for (const [screen, group] of Object.entries(copy)) for (const [key, line] of Object.entries(group)) { lines.push(`| ${screen} | ${key} | ${escape(line.context ?? `${screen} · ${key}`)} | ${escape(line.indianEnglish)} | ${escape(line.hinglish)} |`);count++; }
await writeFile('docs/copy-review.md', lines.join('\n') + '\n');
console.log(`Exported ${count} copy rows with context.`);

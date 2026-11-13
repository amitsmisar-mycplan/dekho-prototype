import { loadCopy } from './load-copy.mjs';
const { copy } = await loadCopy();
import { writeFile } from 'node:fs/promises';
const escape = (value) => value.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
const lines = ['# India copy review', '', 'Generated from `lib/copy.ts`. Review the Indian English and Hinglish columns with friends in India.', '', 'Tone: Hinglish only when saved viewing languages include Hindi. Unknown visitors and all server-rendered share cards use Indian English. Buttons and errors use the same Hindi-free copy in both tones. Each screen uses at most one optional Hinglish phrase; most shared labels are identical.', '', 'Placeholders such as `{p1}`, `{group}`, `{count}` and `{winner}` are runtime values, not visible braces. Short rows can be parts of a sentence or accessibility label. Film/web-series titles, synopses, cast/provider/language names from the catalogue, brand names from `lib/brand.ts`, and people’s own names, group names and comments are content, not translated UI copy.', '', '| Screen | Key | Indian English | Hinglish |', '| --- | --- | --- | --- |'];
for (const [screen, group] of Object.entries(copy)) for (const [key, line] of Object.entries(group)) lines.push(`| ${screen} | ${key} | ${escape(line.indianEnglish)} | ${escape(line.hinglish)} |`);
await writeFile('docs/copy-review.md', lines.join('\n') + '\n');
console.log(`Exported ${lines.length - 10} copy rows to docs/copy-review.md.`);

/** Optional local importer. Uses Node 22.18+ native TypeScript support; never runs in build or CI. */
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Node requires the TS extension for direct execution; Next's noEmit check permits this import.
// @ts-expect-error Native Node TypeScript entrypoint requires an explicit .ts extension.
import { artworkQuery, selectArtworkMatch, validImagePath } from './tmdb-match.ts';
import type { TmdbCandidate, ArtworkTarget } from './tmdb-match';
interface SeedTitle extends ArtworkTarget { id: string; posterPath: string | null; backdropPath: string | null }
async function main() {
  const key = process.env.TMDB_API_KEY;
  if (!key) { console.info('No TMDB_API_KEY set. Catalog unchanged; gradient posters work without a key.'); return; }
  const path = resolve(dirname(fileURLToPath(import.meta.url)), '../data/catalog.json');
  const original = await readFile(path, 'utf8');
  const catalog: { titles: SeedTitle[] } = JSON.parse(original);
  let updated = 0, skipped = 0;
  for (const title of catalog.titles) {
    if (title.posterPath && title.backdropPath) { skipped++; continue; }
    const url = new URL(`https://api.themoviedb.org/3/search/${title.type === 'movie' ? 'movie' : 'tv'}`);
    url.searchParams.set('api_key', key);
    url.searchParams.set('query', artworkQuery(title.title));
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('language', 'en-US');
    url.searchParams.set(title.type === 'movie' ? 'primary_release_year' : 'first_air_date_year', String(title.year));
    // Do not print request URLs or fetch error objects: they can contain the private key.
    const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`TMDb returned HTTP ${response.status}; catalog was not written.`);
    const payload: { results?: TmdbCandidate[] } = await response.json();
    if (!Array.isArray(payload.results)) throw new Error('Unexpected TMDb response; catalog was not written.');
    const match = selectArtworkMatch(title, payload.results);
    if (!match) { console.info(`Skipped ${title.id}: no unique title/year/language match.`); skipped++; continue; }
    let changed = false;
    if (!title.posterPath && validImagePath(match.poster_path)) { title.posterPath = match.poster_path; changed = true; }
    if (!title.backdropPath && validImagePath(match.backdrop_path)) { title.backdropPath = match.backdrop_path; changed = true; }
    if (changed) updated++; else skipped++;
    // Serial requests with a modest pause keep this optional 60-title run gentle.
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  if (!updated) { console.info(`No artwork changes; ${skipped} titles skipped.`); return; }
  if (await readFile(path, 'utf8') !== original) throw new Error('Catalog changed during the import; refusing to overwrite it.');
  const tempPath = `${path}.${process.pid}.tmp`;
  try { await writeFile(tempPath, `${JSON.stringify(catalog, null, 2)}\n`, { flag: 'wx' }); await rename(tempPath, path); }
  finally { await unlink(tempPath).catch(() => {}); }
  console.info(`Updated artwork for ${updated} titles; skipped ${skipped}. Ratings and provider listings were not changed.`);
}
main().catch(() => { console.error('Artwork import failed. Check your key, connection, response status or catalog file. No partial import was saved; private request details are intentionally omitted.'); process.exitCode = 1; });

import { languages, moods, type CatalogData, type Provider } from './types';
function requireValue(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Invalid seed data: ${message}`);
}
function record(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value); }
function text(value: unknown): value is string { return typeof value === 'string' && value.trim().length > 0; }
function strings(value: unknown): value is string[] { return Array.isArray(value) && value.every(text); }
function positiveInteger(value: unknown): boolean { return typeof value === 'number' && Number.isInteger(value) && value > 0; }
function safeUrl(value: unknown): boolean {
  if (!text(value)) return false;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
}
const artwork = (value: unknown) => value === null || (typeof value === 'string' && /^\/[a-zA-Z0-9_-]+\.(jpg|png|webp)$/.test(value));
export function parseProviders(input: unknown): Provider[] {
  requireValue(Array.isArray(input), 'providers must be an array');
  const ids = new Set<string>();
  for (const item of input) {
    requireValue(record(item), 'provider must be an object');
    requireValue(text(item.id) && !ids.has(item.id), 'provider ids must be unique');
    ids.add(item.id);
    requireValue(text(item.name) && typeof item.color === 'string' && /^#[a-f\d]{6}$/i.test(item.color) && safeUrl(item.homepageUrl), `provider ${item.id}`);
  }
  return structuredClone(input) as Provider[];
}
export function parseCatalog(input: unknown, providers: readonly Provider[]): CatalogData {
  requireValue(record(input), 'catalog must be an object');
  requireValue(positiveInteger(input.version) && input.region === 'IN' && input.illustrative === true && text(input.disclaimer), 'catalog metadata');
  requireValue(Array.isArray(input.titles), 'titles must be an array');
  const ids = new Set<string>(), slugs = new Set<string>();
  for (const title of input.titles) {
    requireValue(record(title), 'title must be an object');
    requireValue(text(title.id) && !ids.has(title.id), 'duplicate or empty title id'); ids.add(title.id);
    requireValue(text(title.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(title.slug) && !slugs.has(title.slug), `slug for ${title.id}`); slugs.add(title.slug);
    for (const key of ['title', 'director', 'synopsis', 'certification']) requireValue(text(title[key]), `${title.id}.${key}`);
    requireValue(strings(title.aliases) && strings(title.cast) && title.cast.length === 4 && strings(title.genres) && title.genres.length > 0, `${title.id} aliases/cast/genres`);
    requireValue(strings(title.languages) && title.languages.length > 0 && title.languages.every((l) => (languages as readonly string[]).includes(l)) && typeof title.originalLanguage === 'string' && title.languages.includes(title.originalLanguage), `${title.id} languages`);
    requireValue(strings(title.moods) && title.moods.every((m) => (moods as readonly string[]).includes(m)), `${title.id} moods`);
    requireValue(typeof title.year === 'number' && Number.isInteger(title.year) && title.year >= 2015 && title.year <= 2026, `${title.id} year`);
    requireValue((title.type === 'movie' && positiveInteger(title.runtimeMin) && title.seasons === undefined) || (title.type === 'series' && positiveInteger(title.seasons) && title.runtimeMin === undefined), `${title.id} runtime/seasons`);
    requireValue(typeof title.tmdbRating === 'number' && Number.isFinite(title.tmdbRating) && title.tmdbRating >= 0 && title.tmdbRating <= 10, `${title.id} rating`);
    requireValue(artwork(title.posterPath) && artwork(title.backdropPath), `${title.id} artwork paths`);
    requireValue(strings(title.palette) && title.palette.length === 2 && title.palette.every((c) => /^#[a-f\d]{6}$/i.test(c)), `${title.id} palette`);
    requireValue(Array.isArray(title.providers) && title.providers.length > 0, `${title.id} offers`);
    const offers = new Set<string>();
    for (const offer of title.providers) {
      requireValue(record(offer) && providers.some((p) => p.id === offer.providerId) && ['stream', 'rent', 'buy', 'free'].includes(String(offer.type)), `${title.id} provider reference/offer type`);
      requireValue(offer.deepLink === undefined || safeUrl(offer.deepLink), `${title.id} unsafe provider link`);
      requireValue(offer.priceInr === undefined || (typeof offer.priceInr === 'number' && Number.isFinite(offer.priceInr) && offer.priceInr >= 0), `${title.id} price`);
      requireValue(!['rent', 'buy'].includes(String(offer.type)) || typeof offer.priceInr === 'number', `${title.id} paid offer price missing`);
      const key = `${offer.providerId}:${offer.type}`;
      requireValue(!offers.has(key), `${title.id} duplicate offer`); offers.add(key);
    }
  }
  return structuredClone(input) as unknown as CatalogData;
}

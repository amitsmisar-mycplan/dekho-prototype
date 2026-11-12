import catalogJson from '../../data/catalog.json';
import providersJson from '../../data/providers.json';
import { parseCatalog, parseProviders } from './validate';
import type { CatalogData, CatalogInfo, DataSource, Mood, Provider, ProviderOffer, SimilarTitle, Title, UserPrefs } from './types';
export { languages, moods } from './types';
export type { CatalogData, CatalogInfo, DataSource, Language, Mood, Offer, OfferType, Provider, ProviderOffer, SimilarTitle, Title, UserPrefs } from './types';

/** Shared by search and the offline artwork importer; punctuation/diacritics do not change a match. */
export function normalizeSearch(value: string): string {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}
function distance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) row[j] = Math.min(row[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    previous = row;
  }
  return previous[b.length];
}
function searchScore(title: Title, query: string): number {
  const fields = [title.title, ...title.aliases, ...title.cast].map(normalizeSearch);
  if (normalizeSearch(title.title) === query) return 100;
  if (fields.includes(query)) return 95;
  if (fields.some((field) => field.startsWith(query))) return 85;
  if (fields.some((field) => field.includes(query))) return 75;
  const words = fields.flatMap((field) => field.split(' '));
  const matches = query.split(' ').map((token) => {
    if (words.includes(token)) return 70;
    if (words.some((word) => word.startsWith(token))) return 60;
    if (token.length < 4) return 0;
    const tolerance = token.length >= 7 ? 2 : 1;
    return words.some((word) => Math.abs(word.length - token.length) <= tolerance && distance(word, token) <= tolerance) ? 40 : 0;
  });
  return matches.every(Boolean) ? Math.min(...matches) : 0;
}
function overlap(a: readonly string[], b: readonly string[]): number {
  const left = new Set(a), right = new Set(b);
  const union = new Set([...left, ...right]);
  return union.size ? [...left].filter((item) => right.has(item)).length / union.size : 0;
}
export function similarity(source: Title, candidate: Title): SimilarTitle {
  const genreScore = overlap(source.genres, candidate.genres);
  const languageScore = overlap(source.languages, candidate.languages);
  const sameDirector = source.director === candidate.director;
  const sharedCast = source.cast.filter((name) => candidate.cast.includes(name));
  const peopleScore = 0.5 * Number(sameDirector) + 0.5 * overlap(source.cast, candidate.cast);
  const sameRatingBand = Math.floor(source.tmdbRating) === Math.floor(candidate.tmdbRating);
  const weightedScore = 0.4 * genreScore + 0.25 * languageScore + 0.25 * peopleScore + 0.1 * Number(sameRatingBand);
  const score = genreScore === 0 ? Math.min(weightedScore, 0.35) : weightedScore;
  const sharedGenres = source.genres.filter((genre) => candidate.genres.includes(genre));
  const sharedLanguage = source.languages.find((language) => candidate.languages.includes(language));
  const reasons: string[] = [];
  if (sameDirector) reasons.push('Same director');
  if (sharedCast.length) reasons.push(`With ${sharedCast[0]}`);
  if (sharedLanguage || sharedGenres.length) reasons.push([sharedLanguage, sharedGenres.slice(0, 2).join(' / ').toLowerCase()].filter(Boolean).join(' '));
  if (sameRatingBand) reasons.push('Similar rating band');
  return { title: candidate, score: Number(score.toFixed(6)), because: reasons.join(' · ') || 'A different direction to explore' };
}
const stableOrder = (a: Title, b: Title) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
function limitCount(value: number): number { return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0; }
export class JsonDataSource implements DataSource {
  private readonly catalog: CatalogData;
  private readonly providers: Provider[];
  constructor(catalog: unknown = catalogJson, providers: unknown = providersJson) {
    this.providers = parseProviders(providers);
    this.catalog = parseCatalog(catalog, this.providers);
  }
  async listTitles(): Promise<Title[]> { return structuredClone(this.catalog.titles); }
  async listProviders(): Promise<Provider[]> { return structuredClone(this.providers); }
  async getCatalogInfo(): Promise<CatalogInfo> {
    const { titles, ...info } = this.catalog;
    return { ...info, titleCount: titles.length };
  }
  async searchTitles(query: string): Promise<Title[]> {
    const normalized = normalizeSearch(query.slice(0, 160));
    if (!normalized) return [];
    return structuredClone(this.catalog.titles.map((title) => ({ title, score: searchScore(title, normalized) }))
      .filter((item) => item.score > 0).sort((a, b) => b.score - a.score || stableOrder(a.title, b.title)).map((item) => item.title));
  }
  async getTitle(slug: string): Promise<Title | null> {
    return structuredClone(this.catalog.titles.find((title) => title.slug === slug) ?? null);
  }
  async getSimilar(id: string, limit = 8): Promise<SimilarTitle[]> {
    const source = this.catalog.titles.find((title) => title.id === id);
    if (!source) return [];
    return structuredClone(this.catalog.titles.filter((title) => title.id !== id && title.genres.some((genre) => source.genres.includes(genre))).map((title) => similarity(source, title))
      .filter((item) => item.score > 0).sort((a, b) => b.score - a.score || stableOrder(a.title, b.title)).slice(0, limitCount(limit)));
  }
  async getProviders(id: string, userServices: readonly string[] = []): Promise<ProviderOffer[]> {
    const title = this.catalog.titles.find((item) => item.id === id);
    if (!title) return [];
    const offers = title.providers.map((offer) => {
      const provider = this.providers.find((item) => item.id === offer.providerId)!;
      return { ...offer, provider, deepLink: offer.deepLink ?? provider.homepageUrl, onYourServices: userServices.includes(provider.id) };
    });
    // Subscription membership never implies a rental or purchase is included.
    const typeOrder = { stream: 0, free: 1, rent: 2, buy: 3 };
    return structuredClone(offers.sort((a, b) => Number(b.onYourServices) - Number(a.onYourServices) || typeOrder[a.type] - typeOrder[b.type] || a.provider.name.localeCompare(b.provider.name, 'en')));
  }
  async getMoodPicks(mood: Mood, prefs: UserPrefs = {}, limit = 4): Promise<Title[]> {
    const services = prefs.services ?? [], languages = prefs.languages ?? [];
    const isIncluded = (title: Title) => title.providers.some((offer) => (offer.type === 'stream' && services.includes(offer.providerId)) || offer.type === 'free');
    const languageMatch = (title: Title) => title.languages.some((language) => languages.includes(language));
    // Selected languages are a hard filter; included/free access ranks first, without hiding alternatives.
    return structuredClone(this.catalog.titles.filter((title) => title.moods.includes(mood) && (!prefs.freeOnly || title.providers.some((offer) => offer.type === 'free')) && (!languages.length || languageMatch(title)))
      .sort((a, b) => Number(isIncluded(b)) - Number(isIncluded(a)) || b.tmdbRating - a.tmdbRating || stableOrder(a, b)).slice(0, limitCount(limit)));
  }
}
export const dataSource: DataSource = new JsonDataSource();

/** A selected service may offer a rental; do not claim it is absent in that case. */
export function getAvailabilityMessage(offers: readonly ProviderOffer[], selectedServices: readonly Provider[]): string | null {
  if (!selectedServices.length || offers.some((offer) => selectedServices.some((service) => service.id === offer.providerId))) return null;
  const streaming = [...new Set(offers.filter((offer) => offer.type === 'stream').map((offer) => offer.provider.name))];
  return `Not on ${selectedServices.map((service) => service.name).join(', ')} · ${streaming.length ? `streaming on ${streaming.join(', ')}` : 'no streaming offer listed'}`;
}

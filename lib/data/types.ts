export const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi'] as const;
export type Language = typeof languages[number];
export const moods = ['Laugh', 'Edge-of-seat', 'Family', 'Feel-good', 'Mind-bender', 'Drama night'] as const;
export type Mood = typeof moods[number];
export type OfferType = 'stream' | 'rent' | 'buy' | 'free';
export interface Provider { id: string; name: string; color: string; homepageUrl: string }
export interface Offer { providerId: string; type: OfferType; priceInr?: number; deepLink?: string }
export interface Title {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  type: 'movie' | 'series';
  year: number;
  runtimeMin?: number;
  seasons?: number;
  languages: Language[];
  originalLanguage: Language;
  genres: string[];
  cast: string[];
  director: string;
  synopsis: string;
  tmdbRating: number;
  certification: string;
  posterPath: string | null;
  backdropPath: string | null;
  palette: [string, string];
  moods: Mood[];
  providers: Offer[];
}
export interface CatalogData {
  version: number;
  region: 'IN';
  illustrative: true;
  disclaimer: string;
  titles: Title[];
}
export type CatalogInfo = Omit<CatalogData, 'titles'> & { titleCount: number };
export interface UserPrefs { services?: readonly string[]; languages?: readonly string[] }
export interface SimilarTitle { title: Title; score: number; because: string }
export interface ProviderOffer extends Offer { provider: Provider; deepLink: string; onYourServices: boolean }
export interface DataSource {
  searchTitles(query: string): Promise<Title[]>;
  getTitle(slug: string): Promise<Title | null>;
  getSimilar(id: string, limit?: number): Promise<SimilarTitle[]>;
  getProviders(id: string, userServices?: readonly string[]): Promise<ProviderOffer[]>;
  getMoodPicks(mood: Mood, userPrefs?: UserPrefs, limit?: number): Promise<Title[]>;
  listTitles(): Promise<Title[]>;
  listProviders(): Promise<Provider[]>;
  getCatalogInfo(): Promise<CatalogInfo>;
}

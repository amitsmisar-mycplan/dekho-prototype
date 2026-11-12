'use client';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { defaultPreferences, normalizePreferences, type Preferences } from './preferences';
export type State = {
  prefs: Preferences;
  onboardingComplete: boolean;
  hydrated: boolean;
  shortlist: string[];
  watchlist: string[];
  recentSearches: string[];
  personalRatings: Record<string, { score: -1 | 1 | 2; take: string }>;
  rateTitle: (id: string, score: -1 | 1 | 2, take: string) => void;
  toggleWatchlist: (id: string) => void;
  setShortlist: (ids: string[]) => void;
  rememberSearch: (query: string) => void;
  clearSearches: () => void;
  completeOnboarding: (prefs: Preferences) => void;
  updatePreferences: (prefs: Preferences) => void;
  resetOnboarding: () => void;
  toggleShortlist: (id: string) => void;
};
// Exported factory lets tests exercise real persistence without a browser or added test libraries.
export const createPrototypeStore = (storage?: StateStorage) => create<State>()(persist((set) => ({
  prefs: defaultPreferences(), onboardingComplete: false, hydrated: false, shortlist: [], watchlist: [], recentSearches: [], personalRatings: {},
  rateTitle: (id, score, take) => set((s) => ({ personalRatings: { ...s.personalRatings, [id]: { score, take: take.trim().slice(0, 160) } } })),
  toggleWatchlist: (id) => set((s) => ({ watchlist: s.watchlist.includes(id) ? s.watchlist.filter((v) => v !== id) : [...s.watchlist, id] })),
  setShortlist: (ids) => set({ shortlist: [...new Set(ids)].slice(0, 4) }),
  rememberSearch: (query) => { const value = query.trim().slice(0, 160); if (value) set((s) => ({ recentSearches: [value, ...s.recentSearches.filter((q) => q.toLowerCase() !== value.toLowerCase())].slice(0, 6) })); },
  clearSearches: () => set({ recentSearches: [] }),
  completeOnboarding: (prefs) => set({ prefs: normalizePreferences(prefs), onboardingComplete: true }),
  updatePreferences: (prefs) => set({ prefs: normalizePreferences(prefs) }),
  resetOnboarding: () => set({ prefs: defaultPreferences(), onboardingComplete: false }),
  toggleShortlist: (id) => set((s) => ({ shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : s.shortlist.length < 4 ? [...s.shortlist, id] : s.shortlist })),
}), {
  name: 'dekho-prototype-v0',
  storage: createJSONStorage(() => storage ?? localStorage),
  skipHydration: true,
  partialize: (state) => ({ prefs: state.prefs, onboardingComplete: state.onboardingComplete, shortlist: state.shortlist, watchlist: state.watchlist, recentSearches: state.recentSearches, personalRatings: state.personalRatings }),
  merge: (persisted, current) => {
    const old = (persisted && typeof persisted === 'object' ? persisted : {}) as Partial<State>;
    const strings = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
    const ratings = Object.fromEntries(Object.entries(old.personalRatings ?? {}).filter(([, value]) => value && [-1, 1, 2].includes(value.score) && typeof value.take === 'string').map(([id, value]) => [id, { score: value.score, take: value.take.slice(0, 160) }]));
    return { ...current, personalRatings: ratings, prefs: normalizePreferences(old.prefs), onboardingComplete: old.onboardingComplete === true, shortlist: strings(old.shortlist).slice(0, 4), watchlist: strings(old.watchlist), recentSearches: strings(old.recentSearches).slice(0, 6) };
  },
}));
export const usePrototype = createPrototypeStore();

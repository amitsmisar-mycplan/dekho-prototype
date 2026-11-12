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
  completeOnboarding: (prefs: Preferences) => void;
  updatePreferences: (prefs: Preferences) => void;
  resetOnboarding: () => void;
  toggleShortlist: (id: string) => void;
};
// Exported factory lets tests exercise real persistence without a browser or added test libraries.
export const createPrototypeStore = (storage?: StateStorage) => create<State>()(persist((set) => ({
  prefs: defaultPreferences(), onboardingComplete: false, hydrated: false, shortlist: [], watchlist: [],
  completeOnboarding: (prefs) => set({ prefs: normalizePreferences(prefs), onboardingComplete: true }),
  updatePreferences: (prefs) => set({ prefs: normalizePreferences(prefs) }),
  resetOnboarding: () => set({ prefs: defaultPreferences(), onboardingComplete: false }),
  toggleShortlist: (id) => set((s) => ({ shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : s.shortlist.length < 4 ? [...s.shortlist, id] : s.shortlist })),
}), {
  name: 'dekho-prototype-v0',
  storage: createJSONStorage(() => storage ?? localStorage),
  skipHydration: true,
  partialize: (state) => ({ prefs: state.prefs, onboardingComplete: state.onboardingComplete, shortlist: state.shortlist, watchlist: state.watchlist }),
  merge: (persisted, current) => {
    const old = (persisted && typeof persisted === 'object' ? persisted : {}) as Partial<State>;
    const strings = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
    return { ...current, prefs: normalizePreferences(old.prefs), onboardingComplete: old.onboardingComplete === true, shortlist: strings(old.shortlist).slice(0, 4), watchlist: strings(old.watchlist) };
  },
}));
export const usePrototype = createPrototypeStore();

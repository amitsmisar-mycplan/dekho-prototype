'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type State = {
    prefs: {
        name: string;
        services: string[];
        languages: string[];
    };
    shortlist: string[];
    watchlist: string[];
    toggleShortlist: (id: string) => void;
};
export const usePrototype = create<State>()(persist((set) => ({
    prefs: { name: '', services: [], languages: ['Hindi', 'English'] }, shortlist: [], watchlist: [],
    toggleShortlist: (id) => set((s) => ({ shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : s.shortlist.length < 4 ? [...s.shortlist, id] : s.shortlist })),
}), { name: 'dekho-prototype-v0' }));

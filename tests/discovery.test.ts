import { describe, expect, it } from 'vitest';
import { dataSource } from '../lib/data';
import { canDiscover, greeting, hasFreeOffer, homeSelections, offerLabel, peopleMatches } from '../lib/discovery';
import { defaultPreferences, normalizePreferences, resolveCatalogPreferences } from '../lib/preferences';
import { createPrototypeStore } from '../lib/store';
import { getOpenPoll } from '../lib/polls';
describe('home discovery', () => {
  it('picks five real included titles without treating rentals as included', async () => {
    const titles = await dataSource.listTitles();
    const prefs = { ...defaultPreferences(), services: ['netflix', 'prime-video'] };
    const { hero, included, trending } = homeSelections(titles, prefs);
    expect(hero).toHaveLength(5);
    expect(new Set(hero.map((t) => t.id)).size).toBe(5);
    expect(hero.every((t) => t.providers.some((o) => prefs.services.includes(o.providerId) && o.type === 'stream'))).toBe(true);
    expect(included.every((t) => canDiscover(t, prefs))).toBe(true);
    expect(trending.map((t) => t.id)).toEqual(homeSelections(titles, prefs).trending.map((t) => t.id));
    const primeOnly = homeSelections(titles, { ...prefs, services: ['prime-video'] });
    expect(primeOnly.included.some((t) => t.id === 'oppenheimer')).toBe(false);
  });
  it('never pads free-only selections with paid titles, including mood picks', async () => {
    const titles = await dataSource.listTitles();
    const prefs = { ...defaultPreferences(), languages: [], freeOnly: true };
    const { hero, eligible, included, trending } = homeSelections(titles, prefs);
    expect(hero).toHaveLength(5);
    expect([...eligible, ...included, ...trending].every(hasFreeOffer)).toBe(true);
    expect((await dataSource.getMoodPicks('Family', prefs)).every(hasFreeOffer)).toBe(true);
    expect((await dataSource.getMoodPicks('Mind-bender', prefs)).every(hasFreeOffer)).toBe(true);
    expect(homeSelections(titles, { ...prefs, languages: ['Hindi'] }).hero).toHaveLength(5);
  });
  it('uses real service labels and distinguishes subscription access from rentals', async () => {
    const providers = await dataSource.listProviders();
    const oppenheimer = (await dataSource.getTitle('oppenheimer'))!;
    const panchayat = (await dataSource.getTitle('panchayat'))!;
    const prefs = { ...defaultPreferences(), services: ['prime-video'] };
    expect(offerLabel(panchayat, providers, prefs).text).toBe('On your Prime Video');
    expect(offerLabel(oppenheimer, providers, prefs).included).toBe(false);
    expect(offerLabel(oppenheimer, providers, prefs).text).toBe('Netflix');
    expect(offerLabel((await dataSource.getTitle('jersey'))!, providers, { ...prefs, freeOnly: true }).text).toBe('Free on MX Player');
  });
  it('uses the device day/time and first name for greetings', () => {
    expect(greeting('Amit Misar', new Date(2026, 10, 13, 21), 'hinglish')).toBe('Friday night, Amit. Kya plan hai?');
    expect(greeting('', new Date(2026, 10, 13, 9))).toBe('Friday morning. What shall we watch?');
  });
  it('leaves the open-poll stub empty without fabricated voters or deadlines', async () => { expect(await getOpenPoll()).toBeNull(); });
});
describe('people and recent searches', () => {
  it('groups cast and directors with their actual catalog titles', async () => {
    const titles = await dataSource.listTitles();
    const fahadh = peopleMatches(titles, 'fahadh')[0];
    expect(fahadh.name).toBe('Fahadh Faasil');
    expect(fahadh.titles.map((t) => t.id)).toContain('vikram');
    expect(peopleMatches(titles, 'lokesh')[0].titles.map((t) => t.id).sort()).toEqual(['kaithi', 'vikram']);
    expect(peopleMatches(titles, 'Timothée')[0].name).toBe('Timothee Chalamet');
    expect(peopleMatches(titles, '')).toEqual([]);
    expect(peopleMatches(titles, 'unrelated xyz')).toEqual([]);
  });
  it('persists deduplicated bounded recent searches and a four-item shortlist', async () => {
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
    const store = createPrototypeStore(storage);
    for (const query of ['a', 'b', 'c', 'd', 'e', 'f', 'g', ' G ', '']) store.getState().rememberSearch(query);
    expect(store.getState().recentSearches).toEqual(['G', 'f', 'e', 'd', 'c', 'b']);
    store.getState().setShortlist(['vikram', 'kaithi', 'vikram', 'panchayat', 'jersey', '96']);
    const restored = createPrototypeStore(storage); await restored.persist.rehydrate();
    expect(restored.getState().recentSearches).toHaveLength(6);
    expect(restored.getState().shortlist).toEqual(['vikram', 'kaithi', 'panchayat', 'jersey']);
    restored.getState().clearSearches(); expect(restored.getState().recentSearches).toEqual([]);
  });
  it('keeps free-only mutually exclusive with service subscriptions and migrates old prefs', () => {
    expect(normalizePreferences({ services: ['netflix'], freeOnly: true }).services).toEqual([]);
    expect(normalizePreferences({ services: ['netflix'] }).freeOnly).toBe(false);
    expect(resolveCatalogPreferences({ ...defaultPreferences(), freeOnly: true }, 'netflix', '').services).toEqual([]);
  });
});

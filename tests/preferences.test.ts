import { describe, expect, it } from 'vitest';
import { createPrototypeStore } from '../lib/store';
import { defaultPreferences, initials, normalizePreferences, resolveCatalogPreferences } from '../lib/preferences';
import { dataSource, getAvailabilityMessage } from '../lib/data';
function memoryStorage(initial?: string) {
  const values = new Map<string, string>(initial ? [['dekho-prototype-v0', initial]] : []);
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
}
describe('onboarding persistence', () => {
  it('starts incomplete with Hindi and English preselected', () => {
    const store = createPrototypeStore(memoryStorage());
    expect(store.getState().onboardingComplete).toBe(false);
    expect(store.getState().prefs.languages).toEqual(['Hindi', 'English']);
  });
  it('restores completion, name, avatar and preferences in a new store', async () => {
    const storage = memoryStorage(); const first = createPrototypeStore(storage);
    first.getState().completeOnboarding({ name: '  Amit Misar  ', avatarId: 'lagoon', services: ['netflix', 'prime-video'], languages: ['Hindi', 'Malayalam'] });
    const returning = createPrototypeStore(storage);
    expect(returning.getState().onboardingComplete).toBe(false);
    await returning.persist.rehydrate();
    expect(returning.getState().onboardingComplete).toBe(true);
    expect(returning.getState().prefs).toEqual({ name: 'Amit Misar', avatarId: 'lagoon', services: ['netflix', 'prime-video'], languages: ['Hindi', 'Malayalam'] });
    expect(returning.getState().hydrated).toBe(false); // Transient UI readiness is never persisted.
  });
  it('supports skipping the name and empty preferences without forcing defaults back', async () => {
    const storage = memoryStorage(); const store = createPrototypeStore(storage);
    store.getState().completeOnboarding({ name: '', avatarId: 'berry', services: [], languages: [] });
    const returning = createPrototypeStore(storage); await returning.persist.rehydrate();
    expect(returning.getState().prefs.name).toBe(''); expect(returning.getState().prefs.languages).toEqual([]);
    expect(returning.getState().onboardingComplete).toBe(true);
  });
  it('preserves P0/P1 lists and existing preferences while requiring first onboarding', async () => {
    const storage = memoryStorage(JSON.stringify({ state: { prefs: { name: 'Old friend', services: ['netflix'], languages: ['Tamil'] }, shortlist: ['After Hours'], watchlist: ['vikram'] }, version: 0 }));
    const store = createPrototypeStore(storage); await store.persist.rehydrate();
    expect(store.getState().prefs).toEqual({ name: 'Old friend', avatarId: 'sunset', services: ['netflix'], languages: ['Tamil'] });
    expect(store.getState().onboardingComplete).toBe(false);
    expect(store.getState().shortlist).toEqual(['After Hours']); expect(store.getState().watchlist).toEqual(['vikram']);
  });
  it('edits only prefs and resets onboarding without clearing saved lists', async () => {
    const storage = memoryStorage(); const store = createPrototypeStore(storage);
    store.getState().toggleShortlist('After Hours');
    store.getState().completeOnboarding({ ...defaultPreferences(), name: 'Amit', avatarId: 'forest' });
    store.getState().updatePreferences({ ...store.getState().prefs, services: ['aha'], languages: ['Telugu'] });
    expect(store.getState().prefs.name).toBe('Amit'); expect(store.getState().prefs.avatarId).toBe('forest');
    expect(store.getState().onboardingComplete).toBe(true);
    store.getState().resetOnboarding();
    const returning = createPrototypeStore(storage); await returning.persist.rehydrate();
    expect(returning.getState().onboardingComplete).toBe(false);
    expect(returning.getState().prefs).toEqual(defaultPreferences());
    expect(returning.getState().shortlist).toEqual(['After Hours']);
  });
  it('normalizes malformed saved values and keeps store actions callable', async () => {
    const storage = memoryStorage(JSON.stringify({ state: { prefs: { name: 5, services: [null, 'netflix', 'netflix'], languages: 'Hindi', avatarId: 'bogus' }, completeOnboarding: 'not a function' }, version: 0 }));
    const store = createPrototypeStore(storage); await store.persist.rehydrate();
    expect(store.getState().prefs).toEqual({ name: '', services: ['netflix'], languages: ['Hindi', 'English'], avatarId: 'sunset' });
    expect(typeof store.getState().completeOnboarding).toBe('function');
    expect(normalizePreferences(null)).toEqual(defaultPreferences());
  });
  it('builds initials without emoji defaults', () => {
    expect(initials('Amit Misar')).toBe('AM'); expect(initials('Amit')).toBe('A'); expect(initials('')).toBe('YOU'); expect(initials('🍿')).toBe('YOU');
  });
});
describe('catalog saved preference priority', () => {
  it('uses saved values over both URL dropdown values', () => {
    expect(resolveCatalogPreferences({ ...defaultPreferences(), services: ['netflix', 'prime-video'], languages: ['Hindi', 'Tamil'] }, 'aha', 'Telugu')).toEqual({ services: ['netflix', 'prime-video'], languages: ['Hindi', 'Tamil'], savedServices: true, savedLanguages: true });
  });
  it('falls back separately for each empty preference', () => {
    expect(resolveCatalogPreferences({ ...defaultPreferences(), services: [] }, 'aha', 'Telugu')).toEqual({ services: ['aha'], languages: ['Hindi', 'English'], savedServices: false, savedLanguages: true });
    expect(resolveCatalogPreferences({ ...defaultPreferences(), services: ['netflix'], languages: [] }, 'aha', 'Telugu')).toEqual({ services: ['netflix'], languages: ['Telugu'], savedServices: true, savedLanguages: false });
    expect(resolveCatalogPreferences({ ...defaultPreferences(), services: [], languages: [] }, '', '').languages).toEqual([]);
  });
  it('passes multiple saved service IDs through the real data layer', async () => {
    const prefs = resolveCatalogPreferences({ ...defaultPreferences(), services: ['netflix', 'prime-video'] }, '', '');
    const offers = await dataSource.getProviders('panchayat', prefs.services);
    expect(offers[0].onYourServices).toBe(true);
    expect(getAvailabilityMessage(offers, (await dataSource.listProviders()).filter((p) => prefs.services.includes(p.id)))).toBeNull();
  });
});

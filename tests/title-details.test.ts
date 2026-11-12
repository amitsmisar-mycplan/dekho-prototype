import { afterEach, describe, expect, it, vi } from 'vitest';
import { dataSource, JsonDataSource } from '../lib/data';
import { titleAvailabilityMessage, titleRecommendations, versionLabel, whatsappShareUrl } from '../lib/title-details';
import { defaultPreferences } from '../lib/preferences';
import { createPrototypeStore } from '../lib/store';
import { getGroupRating, pollStore } from '../lib/polls';
const storage = () => { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } }; };
afterEach(() => vi.unstubAllGlobals());
describe('title decisions', () => {
  it('pins the original in both directions and filters the remaining recommendations', async () => {
    const hindi = (await dataSource.getTitle('drishyam-2'))!, original = (await dataSource.getTitle('drishyam-2-malayalam'))!;
    const prefs = { ...defaultPreferences(), services: ['sonyliv'] };
    const matches = titleRecommendations(hindi, await dataSource.getSimilar(hindi.id, 68), [original], prefs, true);
    expect(matches[0].title.id).toBe(original.id);
    expect(matches[0].because).toBe('Original Malayalam version');
    expect(matches.slice(1).every((r) => r.title.providers.some((o) => o.providerId === 'sonyliv' && o.type === 'stream'))).toBe(true);
    expect(versionLabel(original, hindi)).toBe('Hindi remake');
    const all = titleRecommendations(hindi, await dataSource.getSimilar(hindi.id, 68), [original], prefs, false);
    expect(all).toHaveLength(8); expect(new Set(all.map((r) => r.title.id)).size).toBe(8);
    expect(versionLabel(hindi, (await dataSource.getTitle('vikram'))!)).toBeNull();
  });
  it('rejects dangling or self remake references', async () => {
    const info = await dataSource.getCatalogInfo(), titles = await dataSource.listTitles(), providers = await dataSource.listProviders();
    titles[0].remakeOf = 'missing'; expect(() => new JsonDataSource({ ...info, titles }, providers)).toThrow('remake reference');
    titles[0].remakeOf = titles[0].id; expect(() => new JsonDataSource({ ...info, titles }, providers)).toThrow('remake reference');
  });
  it('does not mistake a paid rental for an included streaming offer', async () => {
    const offers = await dataSource.getProviders('oppenheimer', ['prime-video']);
    expect(titleAvailabilityMessage(offers, ['prime-video'])).toBe('Not on your apps · streaming on Netflix');
    expect(titleAvailabilityMessage(offers, ['netflix'])).toBeNull();
  });
  it('adds exactly eight unverified free titles on the requested tiers', async () => {
    const free = (await dataSource.listTitles()).filter((t) => t.id !== 'jersey' && t.providers.some((o) => o.type === 'free'));
    expect(free).toHaveLength(8);
    expect(free.every((t) => t.providers.every((o) => o.verifiedAt === null && ['mx-player', 'zee5'].includes(o.providerId)))).toBe(true);
  });
  it('persists independent personal takes and watchlist selections', async () => {
    const saved = storage(), store = createPrototypeStore(saved);
    store.getState().rateTitle('vikram', 2, '  Loved the action  '); store.getState().toggleWatchlist('vikram');
    const restored = createPrototypeStore(saved); await restored.persist.rehydrate();
    expect(restored.getState().personalRatings.vikram).toEqual({ score: 2, take: 'Loved the action' });
    expect(restored.getState().watchlist).toEqual(['vikram']);
    restored.getState().toggleWatchlist('vikram'); expect(restored.getState().watchlist).toEqual([]);
    expect(restored.getState().shortlist).toEqual([]);
  });
  it('encodes WhatsApp text and canonical title URL without losing punctuation', () => {
    const result = new URL(whatsappShareUrl('Dune: Part Two & friends?', 'https://example.com/t/dune-part-two'));
    expect(result.origin).toBe('https://wa.me');
    expect(result.searchParams.get('text')).toBe('Dune: Part Two & friends? https://example.com/t/dune-part-two');
  });
});
describe('group rating from local poll votes', () => {
  it('shows no fabricated score, then derives support from polls containing the title', async () => {
    vi.stubGlobal('localStorage', storage()); vi.stubGlobal('window', new EventTarget()); vi.stubGlobal('BroadcastChannel', undefined);
    expect(await getGroupRating('vikram')).toBeNull();
    const poll = await pollStore.createPoll({ titleIds: ['vikram', 'kaithi'], expectedVoters: 3, deadline: new Date(Date.now() + 60000).toISOString() });
    expect(await getGroupRating('vikram')).toBeNull();
    const listener = vi.fn(), unsubscribe = pollStore.subscribe(listener);
    await pollStore.castVote(poll.id, 'a', 'vikram'); await pollStore.castVote(poll.id, 'b', 'kaithi');
    expect(await getGroupRating('vikram')).toEqual({ percent: 50, votes: 2 });
    expect(await getGroupRating('panchayat')).toBeNull();
    expect(await pollStore.getResults(poll.id)).toEqual({ vikram: 1, kaithi: 1 });
    expect(listener).toHaveBeenCalledTimes(2); unsubscribe();
    await expect(pollStore.castVote(poll.id, 'c', 'other')).rejects.toThrow();
  });
});

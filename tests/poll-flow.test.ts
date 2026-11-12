import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPrototypeStore } from '../lib/store';
import { pollStore, nanoid8, encodePoll, decodePoll, pollPath, defaultPollName, deadlineFor } from '../lib/polls';
import { deckIntent } from '../lib/shortlist';
function storage() { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } }; }
afterEach(() => vi.unstubAllGlobals());
describe('shortlist flow', () => {
  it('keeps the fifth pending, swaps in place, validates reorder and persists the final order', async () => {
    const saved = storage(), store = createPrototypeStore(saved);
    for (const id of ['vikram', 'kaithi', 'panchayat', 'jailer']) expect(store.getState().requestShortlist(id)).toBe('added');
    expect(store.getState().requestShortlist('vikram')).toBe('exists');
    expect(store.getState().requestShortlist('aavesham')).toBe('full');
    expect(store.getState().shortlist).toEqual(['vikram', 'kaithi', 'panchayat', 'jailer']);
    expect(store.getState().shortlistOpen).toBe(true); expect(store.getState().pendingSwap).toBe('aavesham');
    store.getState().swapShortlist('kaithi'); expect(store.getState().shortlist).toEqual(['vikram', 'aavesham', 'panchayat', 'jailer']);
    expect(store.getState().pendingSwap).toBeNull();
    store.getState().reorderShortlist(['jailer', 'vikram', 'aavesham', 'panchayat']);
    store.getState().reorderShortlist(['jailer', 'jailer', 'aavesham', 'panchayat']);
    const restored = createPrototypeStore(saved); await restored.persist.rehydrate();
    expect(restored.getState().shortlist).toEqual(['jailer', 'vikram', 'aavesham', 'panchayat']);
    expect(restored.getState().shortlistOpen).toBe(false);
    restored.getState().toggleShortlist('vikram'); expect(restored.getState().shortlist).toHaveLength(3);
  });
  it('chooses add, skip or watchlist only after a deliberate swipe', () => {
    expect(deckIntent(110, 10)).toBe('add'); expect(deckIntent(-110, 30)).toBe('skip'); expect(deckIntent(30, -120)).toBe('watchlist');
    expect(deckIntent(20, -30)).toBeNull(); expect(deckIntent(0, 100)).toBeNull();
  });
});
describe('local poll creation and portable previews', () => {
  beforeEach(() => { vi.stubGlobal('localStorage', storage()); vi.stubGlobal('window', new EventTarget()); vi.stubGlobal('BroadcastChannel', undefined); });
  const input = () => ({ titleIds: ['vikram', 'kaithi'], deadline: new Date(Date.now() + 3600000).toISOString(), expectedVoters: 0, name: 'Friday movie night', note: 'Popcorn on me.' });
  it('creates eight-character URL-safe IDs, saves one ordered snapshot and starts with zero votes', async () => {
    const ids = new Set(Array.from({ length: 100 }, nanoid8)); expect(ids.size).toBe(100); expect([...ids].every((id) => /^[A-Za-z0-9_-]{8}$/.test(id))).toBe(true);
    const poll = await pollStore.createPoll(input()); expect(poll.id).toHaveLength(8); expect(await pollStore.getPoll(poll.id)).toEqual(poll); expect(await pollStore.getResults(poll.id)).toEqual({ vikram: 0, kaithi: 0 });
    expect(poll.titleIds).toEqual(['vikram', 'kaithi']);
  });
  it('rejects too few/many picks, unknown titles, old deadlines and oversized text', async () => {
    for (const change of [{ titleIds: ['vikram'] }, { titleIds: ['vikram', 'kaithi', 'panchayat', 'jailer', 'aavesham'] }, { titleIds: ['vikram', 'unknown'] }, { deadline: '2000-01-01' }, { name: 'x'.repeat(81) }, { note: 'x'.repeat(241) }]) await expect(pollStore.createPoll({ ...input(), ...change })).rejects.toThrow();
  });
  it('round-trips Unicode metadata without sharing votes and rejects malformed or mismatched links', async () => {
    const poll = await pollStore.createPoll({ ...input(), name: 'शुक्रवार movie night', note: 'Chalo — snacks?' });
    await pollStore.castVote(poll.id, 'one', 'vikram'); const encoded = encodePoll(poll);
    const decoded = decodePoll(encoded, poll.id)!; expect(decoded.name).toBe(poll.name); expect(decoded.note).toBe(poll.note); expect(decoded).not.toHaveProperty('votes');
    expect(pollPath(poll)).toContain(`/p/${poll.id}?poll=`); expect(pollPath(poll, true)).toContain('/result?poll=');
    expect(decodePoll(encoded, 'wrong-id')).toBeNull(); expect(decodePoll('!!!', poll.id)).toBeNull(); expect(decodePoll('x'.repeat(3001), poll.id)).toBeNull();
    vi.stubGlobal('localStorage', storage()); const imported = await pollStore.importPoll(decoded); expect(imported.votes).toEqual({}); expect(imported.titleIds).toEqual(poll.titleIds);
    await pollStore.castVote(imported.id, 'two', 'kaithi'); await pollStore.importPoll(decoded); expect(await pollStore.getResults(imported.id)).toEqual({ vikram: 0, kaithi: 1 });
  });
  it('uses local weekday and explicit future cutoff choices', () => {
    const now = new Date(2026, 10, 13, 20, 0);
    expect(defaultPollName(now)).toBe('Friday movie night');
    expect(deadlineFor('30', now).getTime() - now.getTime()).toBe(1800000);
    expect(deadlineFor('60', now).getTime() - now.getTime()).toBe(3600000);
    expect(deadlineFor('tonight', now).getHours()).toBe(21);
    expect(deadlineFor('tonight', new Date(2026, 10, 13, 22)).getTime()).toBeLessThan(new Date(2026, 10, 13, 22).getTime());
    expect(deadlineFor('custom', now, '2026-11-14T18:30').getHours()).toBe(18);
  });
  it('notifies same-tab and cross-tab subscribers and unsubscribes cleanly', async () => {
    class Channel extends EventTarget { static instances: Channel[] = []; constructor(public name: string) { super(); Channel.instances.push(this); } postMessage() { for (const channel of Channel.instances) if (channel !== this) channel.dispatchEvent(new Event('message')); } close() { Channel.instances = Channel.instances.filter((c) => c !== this); } }
    vi.stubGlobal('BroadcastChannel', Channel); const listener = vi.fn(); const off = pollStore.subscribe(listener);
    const poll = await pollStore.createPoll(input()); expect(listener).toHaveBeenCalled(); listener.mockClear();
    await pollStore.castVote(poll.id, 'one', 'kaithi'); expect(listener).toHaveBeenCalled(); off(); listener.mockClear();
    await pollStore.castVote(poll.id, 'two', 'vikram'); expect(listener).not.toHaveBeenCalled();
  });
});

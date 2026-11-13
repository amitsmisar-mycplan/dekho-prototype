import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createSupabasePollStore, cloudError } from '../lib/polls/supabase';
import { privateDeviceId } from '../lib/polls/device';
const poll = { id: 'test1234', name: 'Movie night', note: '', titleIds: ['vikram', 'kaithi'], deadline: '2030-01-01T00:00:00Z', creator: { id: 'this-device', name: 'Amit' }, ballots: {}, closedAt: null };
function mock() {
  const events = new Map<string, () => void>();
  const channel = { on: vi.fn((_kind, filter, fn) => { events.set(filter.event, fn); return channel; }), subscribe: vi.fn((fn) => { fn('SUBSCRIBED'); return channel; }) };
  const client = { rpc: vi.fn().mockResolvedValue({ data: poll, error: null }), channel: vi.fn(() => channel), removeChannel: vi.fn() };
  return { client, events, store: createSupabasePollStore(client as unknown as SupabaseClient, true) };
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.resetModules(); });
describe('Supabase PollStore boundary', () => {
  it('reads ID-only polls and never imports a shared snapshot into the database', async () => {
    const { client, store } = mock();
    expect((await store.getPoll(poll.id))?.creator?.name).toBe('Amit');
    expect(client.rpc).toHaveBeenCalledWith('read_poll', { p_id: poll.id });
    client.rpc.mockResolvedValueOnce({ data: null, error: null });
    await expect(store.importPoll(poll)).rejects.toThrow('not on the server');
    expect(client.rpc.mock.calls.every(([name]) => name === 'read_poll')).toBe(true);
    expect(await store.getPoll('bad')).toBeNull();
  });
  it('sends votes/takes/closure without accepting a private device ID from UI parameters', async () => {
    const { client, store } = mock();
    await store.rateTitle(poll.id, 'this-device', 'Riya', 'vikram', { score: -1 });
    expect(client.rpc).toHaveBeenLastCalledWith('vote_on_poll', { p_id: poll.id, p_title_id: 'vikram', p_voter_name: 'Riya', p_value: -1 });
    await store.setTake(poll.id, 'this-device', 'Next weekend');
    expect(client.rpc).toHaveBeenLastCalledWith('take_on_poll', { p_id: poll.id, p_text: 'Next weekend' });
    await store.closePoll(poll.id, 'this-device');
    expect(client.rpc).toHaveBeenLastCalledWith('close_poll', { p_id: poll.id });
    await expect(store.rateTitle(poll.id, 'someone-else', 'Fake', 'vikram', { score: 1 })).rejects.toThrow('local demo');
  });
  it('subscribes to all three invalidations and releases channels/timer on unmount', async () => {
    vi.useFakeTimers(); const { store, client, events } = mock(); const listener = vi.fn();
    await store.getPoll(poll.id); const stop = store.subscribe(listener);
    expect(client.channel).toHaveBeenCalledWith('poll:test1234', { config: { private: false } });
    listener.mockClear(); for (const event of ['votes', 'takes', 'polls']) events.get(event)!();
    expect(listener).toHaveBeenCalledTimes(3); vi.advanceTimersByTime(10000); expect(listener).toHaveBeenCalledTimes(4);
    stop(); expect(client.removeChannel).toHaveBeenCalledTimes(1); vi.advanceTimersByTime(10000); expect(listener).toHaveBeenCalledTimes(4);
  });
  it('surfaces setup failures instead of silently creating local-only polls', async () => {
    const { client, store } = mock(); client.rpc.mockResolvedValue({ data: null, error: { code: 'PGRST202' } });
    await expect(store.getPoll(poll.id)).rejects.toThrow('001_polls.sql');
    expect(cloudError({ code: 'bad', message: 'private request data' }).message).not.toContain('private');
    await expect(store.createPoll({ ...poll, expectedVoters: 0, creator: { id: 'this-device', name: 'WatchTogether' } })).rejects.toThrow('name');
  });
  it('creates a new private capability instead of reusing a previously shared voter ID', () => {
    const values = new Map<string, string>([['dekho-voter', JSON.stringify({ id: 'old-public-id', name: 'Riya' })]]);
    vi.stubGlobal('localStorage', { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
    const id = privateDeviceId(); expect(id).toMatch(/^[\da-f-]{36}$/); expect(id).not.toBe('old-public-id'); expect(privateDeviceId()).toBe(id);
    expect(values.get('dekho-voter')).toContain('Riya');
  });
  it('requires both configuration values and produces clean cloud share URLs', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co'); vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    expect((await import('../lib/polls/config')).cloudPollsEnabled).toBe(false);
    vi.resetModules(); vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-public-key');
    expect((await import('../lib/polls/config')).cloudPollsEnabled).toBe(true);
    const { pollPath } = await import('../lib/polls/share');
    expect(pollPath(poll)).toBe('/p/test1234'); expect(pollPath(poll, true)).toBe('/p/test1234/result');
  });
});

import { createClient, type SupabaseClient, type RealtimeChannel } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey, selfDeviceAlias, usableCreatorName } from './config';
import { privateDeviceId } from './device';
import { parseSnapshot } from './share';
import { scorePoll } from './results';
import type { Poll, PollStore } from './types';
import { nanoid8 } from './local';

export function cloudError(error: { code?: string; message?: string }) {
  if (error.code === 'PGRST202' || error.code === '42P01') return new Error('Supabase setup is incomplete. Run the pending SQL files in supabase/migrations in the SQL editor.');
  if (error.code === 'P0001' && error.message) return new Error(error.message);
  return new Error('Could not reach the poll service. Check the Supabase setup and try again.');
}
export function parseCloudPoll(value: unknown): Poll | null {
  if (value === null) return null;
  const snapshot = parseSnapshot(value);
  if (!snapshot || !value || typeof value !== 'object') throw new Error('The poll service returned an invalid poll.');
  const raw = value as Poll;
  return { ...snapshot, votes: {}, expectedVoters: 0, ballots: raw.ballots ?? {}, ...(raw.closedAt ? { closedAt: raw.closedAt } : {}) };
}
export function createSupabasePollStore(client: SupabaseClient, realtime = typeof window !== 'undefined'): PollStore {
  const ids = new Set<string>(), listeners = new Set<() => void>(), channels = new Map<string, RealtimeChannel>();
  let timer: ReturnType<typeof setInterval> | undefined;
  const emit = () => listeners.forEach((fn) => fn());
  function watch(id: string) {
    if (!realtime) return; ids.add(id);
    if (!listeners.size || channels.has(id)) return;
    const channel = client.channel(`poll:${id}`, { config: { private: false } });
    channels.set(id, channel);
    channel.on('broadcast', { event: 'votes' }, emit).on('broadcast', { event: 'takes' }, emit).on('broadcast', { event: 'polls' }, emit)
      .subscribe((status) => { if (status === 'SUBSCRIBED') emit(); });
  }
  async function rpc(name: string, args: Record<string, unknown>) {
    const { data, error } = await client.rpc(name, args);
    if (error) throw cloudError(error);
    return data;
  }
  function own(id: string) { if (id !== selfDeviceAlias) throw new Error('Simulated voters are available in local demo mode only.'); }
  const store: PollStore = {
    async getMyPolls() {
      const rows = await rpc('my_polls', {});
      if (!Array.isArray(rows)) throw new Error('Your polls could not be loaded.');
      return rows.flatMap((row) => { const poll = parseCloudPoll(row); if (poll) watch(poll.id); return poll ? [poll] : []; });
    },
    async createPoll(input) {
      const creator = usableCreatorName(input.creator?.name);
      if (!creator) throw new Error('Your name helps friends know who’s asking.');
      const catalog = await (await import('../data')).dataSource.listTitles();
      if (input.titleIds.some((id) => !catalog.some((t) => t.id === id))) throw new Error('Choose catalog titles for this poll.');
      for (let attempt = 0; attempt < 3; attempt++) {
        const id = nanoid8();
        const { data, error } = await client.rpc('create_poll', { p_id: id, p_name: input.name?.trim() ?? '', p_note: input.note ?? '', p_creator_name: creator, p_title_ids: input.titleIds, p_deadline: input.deadline });
        if (error?.code === '23505') continue;
        if (error) throw cloudError(error);
        const poll = parseCloudPoll(data); if (!poll) throw new Error('The poll was not created.'); watch(id); emit(); return poll;
      }
      throw new Error('Could not allocate a poll link. Try again.');
    },
    async getPoll(id) { if (!/^[A-Za-z0-9_-]{8}$/.test(id)) return null; watch(id); return parseCloudPoll(await rpc('read_poll', { p_id: id })); },
    async importPoll(snapshot) { const poll = await store.getPoll(snapshot.id); if (!poll) throw new Error('This poll is not on the server. Ask for a new link.'); return poll; },
    async castVote(id, voterId, titleId) { return store.rateTitle(id, voterId, 'Voter', titleId, { score: 1 }); },
    async rateTitle(id, voterId, name, titleId, rating) { own(voterId); await rpc('vote_on_poll', { p_id: id, p_title_id: titleId, p_voter_name: name, p_value: rating.score }); emit(); },
    async setTake(id, voterId, take) { own(voterId); await rpc('take_on_poll', { p_id: id, p_text: take }); emit(); },
    async closePoll(id, creatorId) { own(creatorId); await rpc('close_poll', { p_id: id }); emit(); },
    async getStreak(id) { return Number(await rpc('poll_streak', { p_id: id })) || 0; },
    async getResults(id) { const poll = await store.getPoll(id); return poll ? Object.fromEntries(scorePoll(poll).map((r) => [r.id, r.score])) : {}; },
    subscribe(listener) {
      if (!realtime) return () => {};
      listeners.add(listener); ids.forEach(watch);
      // Recover missed websocket events after a mobile browser resumes/backgrounds.
      if (!timer) timer = setInterval(emit, 10000);
      return () => { listeners.delete(listener); if (!listeners.size) { clearInterval(timer); timer = undefined; channels.forEach((c) => { void client.removeChannel(c); }); channels.clear(); ids.clear(); } };
    },
  };
  return store;
}
let client: SupabaseClient | undefined;
export function getSupabaseClient() {
  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (typeof window !== 'undefined') headers.set('x-dekho-device', privateDeviceId());
      return fetch(input, { ...init, headers, cache: 'no-store' });
    } },
  });
  return client;
}
let store: PollStore | undefined;
export function getCloudStore() { return store ??= createSupabasePollStore(getSupabaseClient()); }
export async function getCloudGroupRating(titleId: string) {
  const { data, error } = await getSupabaseClient().rpc('poll_group_rating', { p_title_id: titleId });
  if (error) throw cloudError(error);
  return data as { percent: number; votes: number } | null;
}

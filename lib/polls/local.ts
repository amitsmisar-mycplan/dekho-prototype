import { nanoid8 } from './id';

import { formatCopy } from '@/lib/copy';
import { pollErrorsCopy } from '@/.generated/copy/pollErrors';
import { groupKey } from './groups';
import { voterIdentity } from './identity';
import { normalizeBallot, scorePoll, tiedWinnerIds } from './results';
import { defaultPollName, parseSnapshot } from './share';
import type { Poll, PollStore, OpenPollSummary } from './types';
export type { PollSnapshot } from './share';
const key = 'dekho-polls-v0';

function read(): Poll[] {
  if (typeof localStorage === 'undefined') return [];
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((p): p is Poll => p && typeof p.id === 'string' && Array.isArray(p.titleIds) && p.titleIds.every((id: unknown) => typeof id === 'string') && p.votes && typeof p.votes === 'object' && typeof p.deadline === 'string' && Number.isFinite(Date.parse(p.deadline)) && Number.isFinite(p.expectedVoters)).map((p) => ({ ...p, name: typeof p.name === 'string' ? p.name : formatCopy(pollErrorsCopy['movie_night']), note: typeof p.note === 'string' ? p.note : '', ...(p.ballots ? { ballots: Object.fromEntries(Object.entries(p.ballots).map(([id, b]) => [id, normalizeBallot(b)])) } : {}) })) : []; } catch { return []; }
}
function write(polls: Poll[]) {
  localStorage.setItem(key, JSON.stringify(polls));
  window.dispatchEvent(new Event(key));
  if (typeof BroadcastChannel !== 'undefined') { const channel = new BroadcastChannel(key); channel.postMessage('changed'); channel.close(); }
}
export const localPollStore: PollStore = {
  async createPoll(input) {
    const titleIds = [...new Set(input.titleIds)]; const existing = read();
    let id = nanoid8(); for (let attempt = 0; existing.some((p) => p.id === id); attempt++) { if (attempt >= 16) throw new Error(formatCopy(pollErrorsCopy['could_not_allocate_a_poll_link_try_again'])); id = nanoid8(); }
    const snapshot = parseSnapshot({ ...input, id, titleIds, name: input.name?.trim() || defaultPollName(), note: input.note?.trim() || '' });
    if (!snapshot || !Number.isInteger(input.expectedVoters) || input.expectedVoters < 0 || Date.parse(snapshot.deadline) <= Date.now()) throw new Error(formatCopy(pollErrorsCopy['choose_two_to_four_picks_and_a_future_deadline']));
    const catalog = await (await import('../data')).dataSource.listTitles();
    if (titleIds.some((id) => !catalog.some((t) => t.id === id))) throw new Error(formatCopy(pollErrorsCopy['choose_catalog_titles_for_this_poll']));
    const poll: Poll = { ...snapshot, createdAt: new Date().toISOString(), expectedVoters: input.expectedVoters, votes: {} }; write([...read(), poll]); return poll;
  },
  async importPoll(snapshot, allowedTitleIds) {
    const valid = parseSnapshot(snapshot); if (!valid) throw new Error(formatCopy(pollErrorsCopy['this_poll_link_is_incomplete']));
    const existing = read(); const found = existing.find((p) => p.id === valid.id); if (found) return found;
    const allowed = allowedTitleIds ?? (await (await import('../data')).dataSource.listTitles()).map((t) => t.id); if (valid.titleIds.some((id) => !allowed.includes(id))) throw new Error(formatCopy(pollErrorsCopy['a_poll_title_is_unavailable']));
    const latest = read(); const imported = latest.find((p) => p.id === valid.id); if (imported) return imported;
    const poll: Poll = { ...valid, expectedVoters: 0, votes: {} }; write([...latest, poll]); return poll;
  },
  async getVotedPolls() { const me=voterIdentity().id; return read().filter(p=>p.ballots?.[me]||p.votes[me]); },
  async getMyPolls() { const me = voterIdentity().id; return read().filter((p) => p.creator?.id === me).reverse(); },
  async getPoll(id) { return read().find((p) => p.id === id) ?? null; },
  async castVote(id, voterId, titleId) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll || !poll.titleIds.includes(titleId) || !voterId || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error(formatCopy(pollErrorsCopy['this_vote_cannot_be_cast']));
    poll.votes[voterId] = titleId; write(polls);
  },
  async rateTitle(id, voterId, name, titleId, rating) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error(formatCopy(pollErrorsCopy['voting_is_closed']));
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(voterId) || ['__proto__', 'constructor', 'prototype'].includes(voterId) || !name.trim() || name.trim().length > 40 || !poll.titleIds.includes(titleId) || ![-1, 1].includes(rating.score) || (rating.take !== undefined && (typeof rating.take !== 'string' || rating.take.length > 80))) throw new Error(formatCopy(pollErrorsCopy['add_a_first_name_and_a_take_of_up_to_80_characters']));
    const ballots = poll.ballots ?? {}; const old = Object.hasOwn(ballots, voterId) ? ballots[voterId] : undefined;
    poll.ballots = { ...ballots, [voterId]: { name: name.trim(), take: old?.take ?? rating.take?.trim() ?? '', ratings: { ...old?.ratings, [titleId]: { score: rating.score } } } };
    delete poll.votes[voterId]; write(polls);
  },
  async setTake(id, voterId, take) {
    const polls = read(), poll = polls.find((p) => p.id === id), ballot = poll?.ballots?.[voterId];
    if (!poll || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error(formatCopy(pollErrorsCopy['voting_is_closed']));
    if (!ballot || !poll.titleIds.every((id) => ballot.ratings[id]) || typeof take !== 'string' || take.length > 80) throw new Error(formatCopy(pollErrorsCopy['vote_on_every_pick_first_then_add_up_to_80_characters']));
    ballot.take = take.trim(); write(polls);
  },
  async tossPoll(id, creatorId) {
    const polls = read(), poll = polls.find(p => p.id === id);
    if (!poll?.creator || poll.creator.id !== creatorId || voterIdentity().id !== creatorId) throw new Error(formatCopy(pollErrorsCopy.only_the_creator_can_call_it));
    if (poll.toss) return poll;
    const tied = tiedWinnerIds(poll);
    const checkins = JSON.parse(localStorage.getItem('dekho-checkins-v1') || '{}');
    if (tied.length < 2 || checkins[id]?.length) throw new Error(formatCopy(pollErrorsCopy.this_vote_cannot_be_cast));
    poll.toss = true;
    poll.winnerId = tied[Math.floor(Math.random() * tied.length)];
    poll.closedAt ||= new Date().toISOString();
    write(polls); return poll;
  },
  async closePoll(id, creatorId) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll?.creator || poll.creator.id !== creatorId) throw new Error(formatCopy(pollErrorsCopy['only_the_creator_can_call_it']));
    if (!poll.closedAt) { poll.closedAt = new Date().toISOString(); write(polls); }
  },
  async getStreak(id) {
    const polls = read(), current = polls.find((p) => p.id === id); if (!current?.creator) return 0;
    return polls.filter((p) => p.creator?.id === current.creator!.id && groupKey(p.groupName) === groupKey(current.groupName) && (p.closedAt || Date.parse(p.deadline) <= Date.now()) && (Object.keys(p.ballots ?? {}).length || Object.keys(p.votes).length)).length;
  },
  async getResults(id) { const poll = await this.getPoll(id); return poll ? Object.fromEntries(poll.titleIds.map((titleId) => [titleId, scorePoll(poll).find((r) => r.id === titleId)?.score ?? 0])) : {}; },
  subscribe(listener) {
    if (typeof window === 'undefined') return () => {};
    const channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(key);
    const storage = (event: StorageEvent) => { if (event.key === key || event.key === null) listener(); };
    channel?.addEventListener('message', listener); window.addEventListener(key, listener); window.addEventListener('storage', storage);
    return () => { channel?.close(); window.removeEventListener(key, listener); window.removeEventListener('storage', storage); };
  },
};
/** No fake open poll banner until the poll-screen phase exists. */
export async function getOpenPoll(): Promise<OpenPollSummary | null> { return null; }
export async function getGroupRating(titleId: string): Promise<{ percent: number; votes: number } | null> {
  return (await import('./checkin-store')).localCheckinRating(titleId, (await localPollStore.getVotedPolls()).map(p=>p.id));
}

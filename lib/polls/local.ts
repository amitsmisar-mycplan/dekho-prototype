import { voterIdentity } from './identity';
import { normalizeBallot, scorePoll } from './results';
import { defaultPollName, parseSnapshot } from './share';
import type { Poll, PollStore, OpenPollSummary } from './types';
export type { PollSnapshot } from './share';
const key = 'dekho-polls-v0';
/** Nano ID's URL-safe alphabet; a byte mask is uniform because the alphabet has 64 symbols. */
export function nanoid8() { const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'; return Array.from(crypto.getRandomValues(new Uint8Array(8)), (byte) => alphabet[byte & 63]).join(''); }
function read(): Poll[] {
  if (typeof localStorage === 'undefined') return [];
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((p): p is Poll => p && typeof p.id === 'string' && Array.isArray(p.titleIds) && p.titleIds.every((id: unknown) => typeof id === 'string') && p.votes && typeof p.votes === 'object' && typeof p.deadline === 'string' && Number.isFinite(Date.parse(p.deadline)) && Number.isFinite(p.expectedVoters)).map((p) => ({ ...p, name: typeof p.name === 'string' ? p.name : 'Movie night', note: typeof p.note === 'string' ? p.note : '', ...(p.ballots ? { ballots: Object.fromEntries(Object.entries(p.ballots).map(([id, b]) => [id, normalizeBallot(b)])) } : {}) })) : []; } catch { return []; }
}
function write(polls: Poll[]) {
  localStorage.setItem(key, JSON.stringify(polls));
  window.dispatchEvent(new Event(key));
  if (typeof BroadcastChannel !== 'undefined') { const channel = new BroadcastChannel(key); channel.postMessage('changed'); channel.close(); }
}
export const localPollStore: PollStore = {
  async createPoll(input) {
    const titleIds = [...new Set(input.titleIds)]; const existing = read();
    let id = nanoid8(); for (let attempt = 0; existing.some((p) => p.id === id); attempt++) { if (attempt >= 16) throw new Error('Could not allocate a poll link. Try again.'); id = nanoid8(); }
    const snapshot = parseSnapshot({ ...input, id, titleIds, name: input.name?.trim() || defaultPollName(), note: input.note?.trim() || '' });
    if (!snapshot || !Number.isInteger(input.expectedVoters) || input.expectedVoters < 0 || Date.parse(snapshot.deadline) <= Date.now()) throw new Error('Choose two to four picks and a future deadline.');
    const catalog = await (await import('../data')).dataSource.listTitles();
    if (titleIds.some((id) => !catalog.some((t) => t.id === id))) throw new Error('Choose catalog titles for this poll.');
    const poll: Poll = { ...snapshot, expectedVoters: input.expectedVoters, votes: {} }; write([...read(), poll]); return poll;
  },
  async importPoll(snapshot, allowedTitleIds) {
    const valid = parseSnapshot(snapshot); if (!valid) throw new Error('This poll link is incomplete.');
    const existing = read(); const found = existing.find((p) => p.id === valid.id); if (found) return found;
    const allowed = allowedTitleIds ?? (await (await import('../data')).dataSource.listTitles()).map((t) => t.id); if (valid.titleIds.some((id) => !allowed.includes(id))) throw new Error('A poll title is unavailable.');
    const latest = read(); const imported = latest.find((p) => p.id === valid.id); if (imported) return imported;
    const poll: Poll = { ...valid, expectedVoters: 0, votes: {} }; write([...latest, poll]); return poll;
  },
  async getMyPolls() { const me = voterIdentity().id; return read().filter((p) => p.creator?.id === me).reverse(); },
  async getPoll(id) { return read().find((p) => p.id === id) ?? null; },
  async castVote(id, voterId, titleId) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll || !poll.titleIds.includes(titleId) || !voterId || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error('This vote cannot be cast.');
    poll.votes[voterId] = titleId; write(polls);
  },
  async rateTitle(id, voterId, name, titleId, rating) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error('Voting is closed.');
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(voterId) || ['__proto__', 'constructor', 'prototype'].includes(voterId) || !name.trim() || name.trim().length > 40 || !poll.titleIds.includes(titleId) || ![-1, 1].includes(rating.score) || (rating.take !== undefined && (typeof rating.take !== 'string' || rating.take.length > 80))) throw new Error('Add a first name and a take of up to 80 characters.');
    const ballots = poll.ballots ?? {}; const old = Object.hasOwn(ballots, voterId) ? ballots[voterId] : undefined;
    poll.ballots = { ...ballots, [voterId]: { name: name.trim(), take: old?.take ?? rating.take?.trim() ?? '', ratings: { ...old?.ratings, [titleId]: { score: rating.score } } } };
    delete poll.votes[voterId]; write(polls);
  },
  async setTake(id, voterId, take) {
    const polls = read(), poll = polls.find((p) => p.id === id), ballot = poll?.ballots?.[voterId];
    if (!poll || poll.closedAt || Date.parse(poll.deadline) <= Date.now()) throw new Error('Voting is closed.');
    if (!ballot || !poll.titleIds.every((id) => ballot.ratings[id]) || typeof take !== 'string' || take.length > 80) throw new Error('Vote on every pick first, then add up to 80 characters.');
    ballot.take = take.trim(); write(polls);
  },
  async closePoll(id, creatorId) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll?.creator || poll.creator.id !== creatorId) throw new Error('Only the creator can call it.');
    if (!poll.closedAt) { poll.closedAt = new Date().toISOString(); write(polls); }
  },
  async getStreak(id) {
    const polls = read(), current = polls.find((p) => p.id === id); if (!current?.creator) return 0;
    const names = new Set(Object.values(current.ballots ?? {}).map((b) => b.name.trim().toLowerCase()));
    return polls.filter((p) => p.creator?.id === current.creator!.id && (p.closedAt || Date.parse(p.deadline) <= Date.now()) && Object.values(p.ballots ?? {}).some((b) => names.has(b.name.trim().toLowerCase()))).length;
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
  const polls = read().filter((p) => p.titleIds.includes(titleId));
  const votes = polls.flatMap((p) => Object.values(p.votes).filter((v) => p.titleIds.includes(v)));
  const ratings = polls.flatMap((p) => Object.values(p.ballots ?? {}).flatMap((b) => b.ratings[titleId] ? [b.ratings[titleId]] : []));
  const count = votes.length + ratings.length;
  return count ? { percent: Math.round((votes.filter((v) => v === titleId).length + ratings.filter((r) => r.score === 1).length) / count * 100), votes: count } : null;
}

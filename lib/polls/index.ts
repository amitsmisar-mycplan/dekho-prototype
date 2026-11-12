import { dataSource } from '../data';
import { defaultPollName, parseSnapshot, type PollSnapshot } from './share';
export { encodePoll, decodePoll, pollPath, defaultPollName, deadlineFor } from './share';
export type { PollSnapshot } from './share';
export interface OpenPollSummary { id: string; votes: number; expectedVoters: number; deadline: string }
export interface Poll extends PollSnapshot { votes: Record<string, string>; expectedVoters: number }
export interface PollStore {
  createPoll(input: Omit<Poll, 'id' | 'votes' | 'name' | 'note'> & { name?: string; note?: string }): Promise<Poll>;
  importPoll(snapshot: PollSnapshot): Promise<Poll>;
  getPoll(id: string): Promise<Poll | null>;
  castVote(id: string, voterId: string, titleId: string): Promise<void>;
  getResults(id: string): Promise<Record<string, number>>;
  subscribe(listener: () => void): () => void;
}
const key = 'dekho-polls-v0';
/** Nano ID's URL-safe alphabet; a byte mask is uniform because the alphabet has 64 symbols. */
export function nanoid8() { const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'; return Array.from(crypto.getRandomValues(new Uint8Array(8)), (byte) => alphabet[byte & 63]).join(''); }
function read(): Poll[] {
  if (typeof localStorage === 'undefined') return [];
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((p): p is Poll => p && typeof p.id === 'string' && Array.isArray(p.titleIds) && p.titleIds.every((id: unknown) => typeof id === 'string') && p.votes && typeof p.votes === 'object' && typeof p.deadline === 'string' && Number.isFinite(Date.parse(p.deadline)) && Number.isFinite(p.expectedVoters)).map((p) => ({ ...p, name: typeof p.name === 'string' ? p.name : 'Movie night', note: typeof p.note === 'string' ? p.note : '' })) : []; } catch { return []; }
}
function write(polls: Poll[]) {
  localStorage.setItem(key, JSON.stringify(polls));
  window.dispatchEvent(new Event(key));
  if (typeof BroadcastChannel !== 'undefined') { const channel = new BroadcastChannel(key); channel.postMessage('changed'); channel.close(); }
}
export const pollStore: PollStore = {
  async createPoll(input) {
    const titleIds = [...new Set(input.titleIds)]; const existing = read();
    let id = nanoid8(); for (let attempt = 0; existing.some((p) => p.id === id); attempt++) { if (attempt >= 16) throw new Error('Could not allocate a poll link. Try again.'); id = nanoid8(); }
    const snapshot = parseSnapshot({ ...input, id, titleIds, name: input.name?.trim() || defaultPollName(), note: input.note?.trim() || '' });
    if (!snapshot || !Number.isInteger(input.expectedVoters) || input.expectedVoters < 0 || Date.parse(snapshot.deadline) <= Date.now()) throw new Error('Choose two to four picks and a future deadline.');
    const catalog = await dataSource.listTitles();
    if (titleIds.some((id) => !catalog.some((t) => t.id === id))) throw new Error('Choose catalog titles for this poll.');
    const poll: Poll = { ...snapshot, expectedVoters: input.expectedVoters, votes: {} }; write([...read(), poll]); return poll;
  },
  async importPoll(snapshot) {
    const valid = parseSnapshot(snapshot); if (!valid) throw new Error('This poll link is incomplete.');
    const existing = read(); const found = existing.find((p) => p.id === valid.id); if (found) return found;
    const catalog = await dataSource.listTitles(); if (valid.titleIds.some((id) => !catalog.some((t) => t.id === id))) throw new Error('A poll title is unavailable.');
    const latest = read(); const imported = latest.find((p) => p.id === valid.id); if (imported) return imported;
    const poll: Poll = { ...valid, expectedVoters: 0, votes: {} }; write([...latest, poll]); return poll;
  },
  async getPoll(id) { return read().find((p) => p.id === id) ?? null; },
  async castVote(id, voterId, titleId) {
    const polls = read(), poll = polls.find((p) => p.id === id);
    if (!poll || !poll.titleIds.includes(titleId) || !voterId || Date.parse(poll.deadline) <= Date.now()) throw new Error('This vote cannot be cast.');
    poll.votes[voterId] = titleId; write(polls);
  },
  async getResults(id) { const poll = await this.getPoll(id); return poll ? Object.fromEntries(poll.titleIds.map((titleId) => [titleId, Object.values(poll.votes).filter((v) => v === titleId).length])) : {}; },
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
  return votes.length ? { percent: Math.round(votes.filter((v) => v === titleId).length / votes.length * 100), votes: votes.length } : null;
}

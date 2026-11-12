export interface OpenPollSummary { id: string; votes: number; expectedVoters: number; deadline: string }
export interface Poll { id: string; titleIds: string[]; votes: Record<string, string>; deadline: string; expectedVoters: number }
export interface PollStore {
  createPoll(input: Omit<Poll, 'id' | 'votes'>): Promise<Poll>;
  getPoll(id: string): Promise<Poll | null>;
  castVote(id: string, voterId: string, titleId: string): Promise<void>;
  getResults(id: string): Promise<Record<string, number>>;
  subscribe(listener: () => void): () => void;
}
const key = 'dekho-polls-v0';
function read(): Poll[] {
  if (typeof localStorage === 'undefined') return [];
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((p): p is Poll => p && typeof p.id === 'string' && Array.isArray(p.titleIds) && p.titleIds.every((id: unknown) => typeof id === 'string') && p.votes && typeof p.votes === 'object' && typeof p.deadline === 'string' && Number.isFinite(Date.parse(p.deadline)) && Number.isFinite(p.expectedVoters)) : []; } catch { return []; }
}
function write(polls: Poll[]) {
  localStorage.setItem(key, JSON.stringify(polls));
  window.dispatchEvent(new Event(key));
  if (typeof BroadcastChannel !== 'undefined') { const channel = new BroadcastChannel(key); channel.postMessage('changed'); channel.close(); }
}
export const pollStore: PollStore = {
  async createPoll(input) {
    const titleIds = [...new Set(input.titleIds)];
    if (titleIds.length < 2 || titleIds.length > 4 || !Number.isFinite(Date.parse(input.deadline))) throw new Error('A poll needs two to four titles and a deadline.');
    const poll: Poll = { ...input, titleIds, id: crypto.randomUUID(), votes: {} }; write([...read(), poll]); return poll;
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

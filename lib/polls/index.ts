import { cloudPollsEnabled } from './config';
import type { PollStore, OpenPollSummary } from './types';
export type { Poll, PollStore, OpenPollSummary } from './types';
export type { PollSnapshot } from './share';
export { encodePoll, decodePoll, pollPath, defaultPollName, deadlineFor } from './share';
export { nanoid8 } from './local';
export { pollMode } from './config';
async function adapter(): Promise<PollStore> {
  return cloudPollsEnabled ? (await import('./supabase')).getCloudStore() : (await import('./local')).localPollStore;
}
/** Existing UI contract. Only transport, persistence and subscriptions change. */
export const pollStore: PollStore = {
  createPoll: async (input) => (await adapter()).createPoll(input),
  importPoll: async (snapshot, ids) => (await adapter()).importPoll(snapshot, ids),
  getMyPolls: async () => (await adapter()).getMyPolls(),
  getPoll: async (id) => (await adapter()).getPoll(id),
  castVote: async (id, voter, title) => (await adapter()).castVote(id, voter, title),
  rateTitle: async (id, voter, name, title, rating) => (await adapter()).rateTitle(id, voter, name, title, rating),
  setTake: async (id, voter, take) => (await adapter()).setTake(id, voter, take),
  closePoll: async (id, creator) => (await adapter()).closePoll(id, creator),
  getStreak: async (id) => (await adapter()).getStreak(id),
  getResults: async (id) => (await adapter()).getResults(id),
  subscribe(listener) {
    let active = true, unsubscribe: (() => void) | undefined;
    void adapter().then((store) => { if (active) unsubscribe = store.subscribe(listener); });
    return () => { active = false; unsubscribe?.(); };
  },
};
export async function getOpenPoll(): Promise<OpenPollSummary | null> { return null; }
export async function getGroupRating(id: string) { return cloudPollsEnabled ? (await import('./supabase')).getCloudGroupRating(id) : (await import('./local')).getGroupRating(id); }

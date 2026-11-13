import type { PollSnapshot } from './share';
import type { Ballot, Rating } from './results';
export interface OpenPollSummary { id: string; votes: number; expectedVoters: number; deadline: string }
export interface Poll extends PollSnapshot { votes: Record<string, string>; expectedVoters: number; ballots?: Record<string, Ballot>; closedAt?: string }
export interface PollStore {
  createPoll(input: Omit<Poll, 'id' | 'votes' | 'name' | 'note' | 'ballots' | 'closedAt'> & { name?: string; note?: string }): Promise<Poll>;
  importPoll(snapshot: PollSnapshot, allowedTitleIds?: string[]): Promise<Poll>;
  getMyPolls(): Promise<Poll[]>;
  getPoll(id: string): Promise<Poll | null>;
  castVote(id: string, voterId: string, titleId: string): Promise<void>;
  rateTitle(id: string, voterId: string, name: string, titleId: string, rating: Rating): Promise<void>;
  setTake(id: string, voterId: string, take: string): Promise<void>;
  closePoll(id: string, creatorId: string): Promise<void>;
  getStreak(id: string): Promise<number>;
  getResults(id: string): Promise<Record<string, number>>;
  subscribe(listener: () => void): () => void;
}

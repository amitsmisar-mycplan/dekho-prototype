import type { Poll } from './index';
export interface Rating { score: -1 | 1; take: string }
export interface Ballot { name: string; ratings: Record<string, Rating> }
export function scorePoll(poll: Poll, ratings: Record<string, number> = {}) {
  return poll.titleIds.map((id) => {
    const votes = Object.values(poll.ballots ?? {}).flatMap((b) => b.ratings[id] ? [{ name: b.name, ...b.ratings[id] }] : []);
    const legacy = Object.entries(poll.votes).filter(([voter, title]) => title === id && !poll.ballots?.[voter]).length;
    const up = votes.filter((v) => v.score === 1).length + legacy, down = votes.filter((v) => v.score === -1).length;
    return { id, up, down, score: up - down, takes: votes.filter((v) => v.take), rating: ratings[id] ?? 0 };
  }).sort((a, b) => b.score - a.score || b.rating - a.rating || poll.titleIds.indexOf(a.id) - poll.titleIds.indexOf(b.id));
}
export function voterCount(poll: Poll) { return new Set([...Object.keys(poll.votes), ...Object.keys(poll.ballots ?? {})]).size; }
export function countdown(deadline: string, now: number) {
  const s = Math.max(0, Math.ceil((Date.parse(deadline) - now) / 1000));
  return s ? `${Math.floor(s / 3600) ? `${Math.floor(s / 3600)}h ` : ''}${Math.floor(s % 3600 / 60)}m ${String(s % 60).padStart(2, '0')}s left` : 'Voting closed';
}


import { formatCopy } from '@/lib/copy';
import { resultsCopy } from '@/.generated/copy/results';
import type { Poll } from './index';
export interface Rating { score: -1 | 1; take?: string }
export interface Ballot { name: string; take?: string; ratings: Record<string, Rating> }
export function scorePoll(poll: Poll, ratings: Record<string, number> = {}) {
  return poll.titleIds.map((id) => {
    const votes = Object.values(poll.ballots ?? {}).flatMap((b) => b.ratings[id] ? [{ name: b.name, ...b.ratings[id] }] : []);
    const legacy = Object.entries(poll.votes).filter(([voter, title]) => title === id && !poll.ballots?.[voter]).length;
    const up = votes.filter((v) => v.score === 1).length + legacy, down = votes.filter((v) => v.score === -1).length;
    return { id, up, down, score: up - down, takes: Object.values(poll.ballots ?? {}).filter((b) => b.take).map((b) => ({ name: b.name, take: b.take!, score: b.ratings[id]?.score ?? 1 })), rating: ratings[id] ?? 0 };
  }).sort((a, b) => b.score - a.score || b.rating - a.rating || poll.titleIds.indexOf(a.id) - poll.titleIds.indexOf(b.id));
}
export function voterCount(poll: Poll) { return new Set([...Object.keys(poll.votes), ...Object.keys(poll.ballots ?? {})]).size; }
export function countdown(deadline: string, now: number) {
  const s = Math.max(0, Math.ceil((Date.parse(deadline) - now) / 1000));
  return s ? formatCopy(resultsCopy['valuevaluem_values_left'], { p1: Math.floor(s / 3600) ? formatCopy(resultsCopy['valueh'], { p1: Math.floor(s / 3600) }) : '', p2: Math.floor(s % 3600 / 60), p3: String(s % 60).padStart(2, '0') }) : formatCopy(resultsCopy['voting_closed']);
}

export function yesSummary(up: number, down: number) { return formatCopy(resultsCopy['value_of_value_said_yesvalue'], { p1: up, p2: up + down, p3: down ? formatCopy(resultsCopy['value_said_not_tonight'], { p1: down }) : '' }); }
/** Retain the first legacy comment when migrating per-title takes to one poll take. */
export function normalizeBallot(ballot: Ballot): Ballot {
  const take = ballot.take ?? Object.values(ballot.ratings).find((r) => r.take)?.take ?? '';
  return { name: ballot.name, take: take.slice(0, 80), ratings: Object.fromEntries(Object.entries(ballot.ratings).map(([id, rating]) => [id, { score: rating.score }])) };
}

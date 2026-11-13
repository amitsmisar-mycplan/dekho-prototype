import type { Poll } from './types';
import { scorePoll, voterCount } from './results';
export interface Checkin { device: string; titleId: string; name: string; watched: boolean | null; rating: -1 | 1 | 2 | null; take: string; createdAt: string }
export type CheckinInput = Pick<Checkin, 'watched' | 'rating' | 'take'>;
export function closedTime(poll: Poll) { return Math.min(Date.parse(poll.deadline), poll.closedAt ? Date.parse(poll.closedAt) : Infinity); }
export function checkinDue(poll: Poll, device: string, rows: Checkin[], now = Date.now(), demo = false) {
  if (!poll.ballots?.[device] && !poll.votes[device]) return false;
  if (closedTime(poll) > now || (!demo && now - closedTime(poll) < 6 * 3600_000)) return false;
  const own = rows.find(r => r.device === device);
  return !own || (own.watched === null && now - Date.parse(own.createdAt) >= 24 * 3600_000);
}
export function winnerId(poll: Poll, ratings: Record<string, number>) { return voterCount(poll) ? scorePoll(poll, ratings)[0]?.id : undefined; }
export function verdict(poll: Poll, rows: Checkin[]) { return { total: voterCount(poll), watched: rows.filter(r => r.watched === true).length, loved: rows.filter(r => r.watched === true && r.rating === 2).length, takes: rows.filter(r => r.watched === true && r.take).sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0) || a.createdAt.localeCompare(b.createdAt)) }; }
export function validCheckin(input: CheckinInput) { return [true,false,null].includes(input.watched) && (input.watched === true ? [-1,1,2].includes(input.rating as number) : input.rating === null) && typeof input.take === 'string' && input.take.length <= 80 && (input.watched === true || input.take === ''); }

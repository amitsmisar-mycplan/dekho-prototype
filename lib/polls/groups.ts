import type { Poll } from './types';
import { scorePoll, voterCount } from './results';
export const normalizeGroupName = (value: string) => value.trim().replace(/\s+/g, ' ');
export const groupKey = (value?: string) => normalizeGroupName(value ?? '').toLocaleLowerCase('en-IN');
export function groupPolls(polls: Poll[], ratings: Record<string, number>, now = Date.now()) {
  const groups = new Map<string, { name: string; polls: Poll[]; nights: number; lastFinishedAt: number; lastWinner?: string }>();
  const ordered = [...polls].sort((a, b) => Date.parse(b.createdAt ?? b.closedAt ?? b.deadline) - Date.parse(a.createdAt ?? a.closedAt ?? a.deadline));
  for (const poll of ordered) {
    const key = groupKey(poll.groupName), group = groups.get(key) ?? { name: normalizeGroupName(poll.groupName ?? ''), polls: [], nights: 0, lastFinishedAt: -Infinity };
    group.polls.push(poll);
    if ((poll.closedAt || Date.parse(poll.deadline) <= now) && voterCount(poll)) {
      group.nights++;
      const finishedAt = Date.parse(poll.closedAt ?? poll.deadline);
      if (finishedAt > group.lastFinishedAt) { group.lastFinishedAt = finishedAt; group.lastWinner = scorePoll(poll, ratings)[0]?.id; }
    }
    groups.set(key, group);
  }
  return [...groups.values()];
}
export function recentGroups(names: string[]) {
  const seen = new Set<string>();
  return names.map(normalizeGroupName).filter((name) => { const key = groupKey(name); if (!name || name.length > 60 || seen.has(key)) return false; seen.add(key); return true; }).slice(0, 8);
}

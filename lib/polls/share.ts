
import { formatCopy } from '@/lib/copy';
import { pollCreateCopy } from '@/.generated/copy/pollCreate';
import { cloudPollsEnabled } from './config';
export interface PollSnapshot { toss?: boolean; winnerId?: string; id: string; name: string; note: string; titleIds: string[]; deadline: string; groupName?: string; createdAt?: string; creator?: { id: string; name: string } }
export function parseSnapshot(value: unknown): PollSnapshot | null {
  if (!value || typeof value !== 'object') return null;
  const p = value as Partial<PollSnapshot>;
  if (typeof p.id !== 'string' || !/^[A-Za-z0-9_-]{8}$/.test(p.id) || typeof p.name !== 'string' || !p.name.trim() || p.name.length > 80 || typeof p.note !== 'string' || p.note.length > 240 || !Array.isArray(p.titleIds) || p.titleIds.length < 2 || p.titleIds.length > 4 || new Set(p.titleIds).size !== p.titleIds.length || !p.titleIds.every((id) => typeof id === 'string' && /^[a-z0-9-]{1,100}$/.test(id)) || typeof p.deadline !== 'string' || !Number.isFinite(Date.parse(p.deadline))) return null;
  if (p.groupName !== undefined && (typeof p.groupName !== 'string' || p.groupName.length > 60)) return null;
  if (p.createdAt !== undefined && (typeof p.createdAt !== 'string' || !Number.isFinite(Date.parse(p.createdAt)))) return null;
  if (p.creator !== undefined && (!p.creator || typeof p.creator.id !== 'string' || !/^[A-Za-z0-9_-]{8,64}$/.test(p.creator.id) || typeof p.creator.name !== 'string' || !p.creator.name.trim() || p.creator.name.length > 40)) return null;
  if (p.toss !== undefined && typeof p.toss !== 'boolean') return null;
  if (p.toss && (typeof p.winnerId !== 'string' || !p.titleIds.includes(p.winnerId))) return null;
  return { ...(p.toss ? { toss: true, winnerId: p.winnerId } : {}), ...(p.groupName !== undefined ? { groupName: p.groupName.trim().replace(/\s+/g, ' ') } : {}), ...(p.createdAt ? { createdAt: p.createdAt } : {}), ...(p.creator ? { creator: p.creator } : {}), id: p.id, name: p.name.trim(), note: p.note, titleIds: p.titleIds, deadline: new Date(p.deadline).toISOString() };
}
export function encodePoll(poll: PollSnapshot) {
  const bytes = new TextEncoder().encode(JSON.stringify({ ...(poll.toss ? { toss: true, winnerId: poll.winnerId } : {}), id: poll.id, name: poll.name, ...(poll.groupName !== undefined ? { groupName: poll.groupName } : {}), ...(poll.createdAt ? { createdAt: poll.createdAt } : {}), note: poll.note, titleIds: poll.titleIds, deadline: poll.deadline, ...(poll.creator ? { creator: poll.creator } : {}) }));
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodePoll(encoded: string | undefined, id: string): PollSnapshot | null {
  if (!encoded || encoded.length > 3000) return null;
  try { const raw = atob(encoded.replace(/-/g, '+').replace(/_/g, '/')); const snapshot = parseSnapshot(JSON.parse(new TextDecoder().decode(Uint8Array.from(raw, (c) => c.charCodeAt(0))))); return snapshot?.id === id ? snapshot : null; } catch { return null; }
}
export function pollPath(poll: PollSnapshot, result = false) { return cloudPollsEnabled ? `/p/${poll.id}${result ? '/result' : ''}` : `/p/${poll.id}${result ? '/result' : ''}?poll=${encodePoll(poll)}`; }
export function defaultPollName(now = new Date()) { return formatCopy(pollCreateCopy['value_movie_night'], { p1: now.toLocaleDateString('en-IN', { weekday: 'long' }) }); }
export function deadlineFor(choice: string, now = new Date(), custom = '') {
  if (choice === 'custom') return new Date(custom);
  if (choice === 'tonight') { const date = new Date(now); date.setHours(21, 0, 0, 0); return date; }
  return new Date(now.getTime() + (choice === '60' ? 60 : 30) * 60_000);
}

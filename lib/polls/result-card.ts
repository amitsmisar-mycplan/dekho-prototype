import { parseSnapshot, type PollSnapshot } from './share';
import { scorePoll } from './results';
import type { Poll } from './index';
export interface ResultCard { poll: PollSnapshot; rows: { id: string; up: number; down: number; takes: { name: string; take: string }[] }[] }
export function resultCard(poll: Poll): ResultCard { return { poll: { id: poll.id, name: poll.name, groupName: poll.groupName, createdAt: poll.createdAt, note: poll.note, titleIds: poll.titleIds, deadline: poll.deadline, creator: poll.creator }, rows: scorePoll(poll).map(({ id, up, down, takes }) => ({ id, up, down, takes: takes.map(({ name, take }) => ({ name, take })) })) }; }
export function parseResult(value: unknown): ResultCard | null {
  if (!value || typeof value !== 'object') return null;
  const p = value as Partial<ResultCard>, poll = parseSnapshot(p.poll);
  if (!poll || !Array.isArray(p.rows) || p.rows.length !== poll.titleIds.length || new Set(p.rows.map((r) => r?.id)).size !== p.rows.length) return null;
  for (const row of p.rows) {
    if (!row || !poll.titleIds.includes(row.id) || !Number.isInteger(row.up) || row.up < 0 || row.up > 10000 || !Number.isInteger(row.down) || row.down < 0 || row.down > 10000 || !Array.isArray(row.takes) || row.takes.length > 100 || row.takes.some((t) => !t || typeof t.name !== 'string' || t.name.length > 40 || typeof t.take !== 'string' || t.take.length > 80)) return null;
  }
  if (!p.rows.some((r) => r.up || r.down)) return null;
  return { poll, rows: p.rows };
}
export function encodeResult(card: ResultCard) { return btoa(Array.from(new TextEncoder().encode(JSON.stringify(card)), (b) => String.fromCharCode(b)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
export function decodeResult(value?: string) { if (!value || value.length > 65000) return null; try { return parseResult(JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))))); } catch { return null; } }

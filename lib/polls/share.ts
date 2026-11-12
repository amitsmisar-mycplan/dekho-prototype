export interface PollSnapshot { id: string; name: string; note: string; titleIds: string[]; deadline: string }
export function parseSnapshot(value: unknown): PollSnapshot | null {
  if (!value || typeof value !== 'object') return null;
  const p = value as Partial<PollSnapshot>;
  if (typeof p.id !== 'string' || !/^[A-Za-z0-9_-]{8}$/.test(p.id) || typeof p.name !== 'string' || !p.name.trim() || p.name.length > 80 || typeof p.note !== 'string' || p.note.length > 240 || !Array.isArray(p.titleIds) || p.titleIds.length < 2 || p.titleIds.length > 4 || new Set(p.titleIds).size !== p.titleIds.length || !p.titleIds.every((id) => typeof id === 'string' && /^[a-z0-9-]{1,100}$/.test(id)) || typeof p.deadline !== 'string' || !Number.isFinite(Date.parse(p.deadline))) return null;
  return { id: p.id, name: p.name.trim(), note: p.note, titleIds: p.titleIds, deadline: new Date(p.deadline).toISOString() };
}
export function encodePoll(poll: PollSnapshot) {
  const bytes = new TextEncoder().encode(JSON.stringify({ id: poll.id, name: poll.name, note: poll.note, titleIds: poll.titleIds, deadline: poll.deadline }));
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodePoll(encoded: string | undefined, id: string): PollSnapshot | null {
  if (!encoded || encoded.length > 3000) return null;
  try { const raw = atob(encoded.replace(/-/g, '+').replace(/_/g, '/')); const snapshot = parseSnapshot(JSON.parse(new TextDecoder().decode(Uint8Array.from(raw, (c) => c.charCodeAt(0))))); return snapshot?.id === id ? snapshot : null; } catch { return null; }
}
export function pollPath(poll: PollSnapshot, result = false) { return `/p/${poll.id}${result ? '/result' : ''}?poll=${encodePoll(poll)}`; }
export function defaultPollName(now = new Date()) { return `${now.toLocaleDateString('en-IN', { weekday: 'long' })} movie night`; }
export function deadlineFor(choice: string, now = new Date(), custom = '') {
  if (choice === 'custom') return new Date(custom);
  if (choice === 'tonight') { const date = new Date(now); date.setHours(21, 0, 0, 0); return date; }
  return new Date(now.getTime() + (choice === '60' ? 60 : 30) * 60_000);
}


import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';
import { lineUnits, posterDesign, type PosterTitle } from '@/lib/poster-art';
export const ogMotifs = ['thriller', 'crime', 'comedy', 'drama', 'sci-fi', 'romance'] as const;
export type OgMotif = typeof ogMotifs[number];
export function uniqueMotifs(titles: PosterTitle[]): OgMotif[] {
  const used = new Set<string>();
  return titles.map((title) => {
    const preferred = posterDesign(title).motif;
    const motif = ogMotifs.find((m) => m === preferred && !used.has(m)) ?? ogMotifs.find((m) => !used.has(m))!;
    used.add(motif); return motif;
  });
}
// The centered WhatsApp square spans x=285..915. Every poster is inside it.
export function posterSlots(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    left: count === 3 && i === 2 ? 399 : 291 + (i % 2) * 216,
    top: count === 2 ? 165 : 9 + Math.floor(i / 2) * 312,
    width: 200, height: 300,
  }));
}
export function pollNameLockup(name: string) {
  const words = name.trim().split(/\s+/); let lines = [name], cost = Infinity;
  for (let i = 1; i < words.length; i++) {
    const pair = [words.slice(0, i).join(' '), words.slice(i).join(' ')];
    const score = Math.max(...pair.map(lineUnits));
    if (score < cost) { lines = pair; cost = score; }
  }
  return { lines, fontSize: Math.min(52, 390 / Math.max(...lines.map(lineUnits)) * .9) };
}
export function deadlineLabel(deadline: string) {
  return formatCopy(commonCopy['closes_value'], { p1: new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(deadline)).toLowerCase() });
}

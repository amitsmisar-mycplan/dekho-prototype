import type { Title } from './data';
export type PosterTitle = Pick<Title, 'id' | 'title' | 'type' | 'palette' | 'genres' | 'moods' | 'originalLanguage' | 'year' | 'seasons'>;
export function posterSeed(id: string) { let seed = 2166136261; for (const char of id) { seed ^= char.codePointAt(0)!; seed = Math.imul(seed, 16777619); } return seed >>> 0; }
export function posterDesign(title: PosterTitle) {
  const seed = posterSeed(title.id);
  const accents: Record<string, string> = { 'Edge-of-seat': '#9D243C', 'Feel-good': '#E5AD51', 'Mind-bender': '#8855CE', Family: '#268F88', Laugh: '#E47C39' };
  const genre = title.genres[0]?.toLowerCase() ?? 'drama';
  const motif = genre === 'science fiction' || genre === 'sci-fi' ? 'sci-fi' : ['thriller', 'crime', 'comedy', 'drama', 'romance'].includes(genre) ? genre : genre === 'action' ? 'thriller' : genre === 'family' ? 'comedy' : genre === 'fantasy' ? 'sci-fi' : 'drama';
  return { seed, accent: accents[title.moods[0]] ?? '#B58165', motif, tilt: (seed % 17) - 8, blobs: [0, 1, 2].map((i) => ({ x: 10 + ((seed >>> (i * 7)) % 80), y: 8 + ((seed >>> (i * 5 + 2)) % 80) })) };
}
/** Balanced word lockup with at most three lines; font size adapts to the widest line. */
export function titleLockup(title: string) {
  const words = title.split(/\s+/).filter(Boolean); const count = Math.min(words.length, title.length > 22 ? 3 : 2);
  if (count < 2) return [title];
  let best: string[] = [title], cost = Infinity;
  for (let a = 1; a < words.length; a++) for (let b = count === 3 ? a + 1 : words.length; b <= words.length; b++) {
    const lines = count === 3 ? [words.slice(0, a).join(' '), words.slice(a, b).join(' '), words.slice(b).join(' ')] : [words.slice(0, a).join(' '), words.slice(a).join(' ')];
    if (lines.some((line) => !line)) continue;
    const sizes = lines.map((line) => line.length); const score = Math.max(...sizes) * 3 + Math.max(...sizes) - Math.min(...sizes);
    if (score < cost) { best = lines; cost = score; }
  }
  return best;
}

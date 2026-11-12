import type { Title } from './data';
export type PosterTitle = Pick<Title, 'id' | 'title' | 'type' | 'palette' | 'genres' | 'moods' | 'originalLanguage' | 'year' | 'seasons'>;
export function posterSeed(id: string) { let seed = 2166136261; for (const char of id) { seed ^= char.codePointAt(0)!; seed = Math.imul(seed, 16777619); } return seed >>> 0; }
const families = ['#912544', '#2456A0', '#167F83', '#7043AA', '#AF842C'] as const;
function shiftHue(hex: string, degrees: number) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min, light = (max + min) / 2;
  const saturation = delta ? delta / (1 - Math.abs(2 * light - 1)) : 0;
  const hue = ((delta ? max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4 : 0) * 60 + degrees + 360) % 360;
  const c = (1 - Math.abs(2 * light - 1)) * saturation, x = c * (1 - Math.abs((hue / 60) % 2 - 1)), m = light - c / 2;
  const rgb = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x];
  return '#' + rgb.map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
}
function mix(a: string, b: string, weight: number) { return '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - weight) + parseInt(b.slice(i, i + 2), 16) * weight).toString(16).padStart(2, '0')).join(''); }
export function posterDesign(title: PosterTitle) {
  const seed = posterSeed(title.id), anchor = posterSeed(`${title.id}:anchor`) % 4;
  const family = posterSeed(`${title.id}:family`) % families.length, hueShift = posterSeed(`${title.id}:hue`) % 71 - 35;
  const accents: Record<string, string> = { 'Edge-of-seat': '#9D243C', 'Feel-good': '#E5AD51', 'Mind-bender': '#8855CE', Family: '#268F88', Laugh: '#E47C39' };
  const genre = title.genres[0]?.toLowerCase() ?? 'drama';
  const motif = genre === 'science fiction' || genre === 'sci-fi' ? 'sci-fi' : ['thriller', 'crime', 'comedy', 'drama', 'romance'].includes(genre) ? genre : genre === 'action' ? 'thriller' : genre === 'family' ? 'comedy' : genre === 'fantasy' ? 'sci-fi' : 'drama';
  // Hue buckets combine an editorial colour family with a ten-degree palette shift.
  const palette = title.palette.map((color, i) => mix(shiftHue(color, hueShift), shiftHue(families[family], hueShift), i ? .45 : .72));
  return { seed, accent: accents[title.moods[0]] ?? '#B58165', motif, palette, anchor, family, hueShift, hueBucket: `${family}:${Math.floor((hueShift + 35) / 10)}`,
    position: [{ x: 112, y: 112 }, { x: 188, y: 112 }, { x: 112, y: 180 }, { x: 188, y: 180 }][anchor],
    scale: .8 + (posterSeed(`${title.id}:scale`) % 51) / 100, tilt: posterSeed(`${title.id}:rotation`) % 41 - 20,
    blobs: [0, 1, 2].map((i) => ({ x: 10 + ((seed >>> (i * 7)) % 80), y: 8 + ((seed >>> (i * 5 + 2)) % 80) })) };
}
/** Approximate display-font advances, including tight tracking; SVG textLength enforces the final width. */
export function lineUnits(line: string) {
  return Math.max(0, Array.from(line).reduce((sum, c) => sum + (/\s/.test(c) ? .27 : /[ilIjtfr1.,:!'|]/.test(c) ? .32 : /[MWmw@]/.test(c) ? .88 : /[A-Z0-9]/.test(c) ? .66 : .57), 0) - Math.max(0, Array.from(line).length - 1) * .045);
}
export function titleLockup(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean); const count = Math.min(words.length, title.length > 22 ? 3 : 2);
  if (count < 2) return [title];
  let best: string[] = [title], cost = Infinity;
  for (let a = 1; a < words.length; a++) for (let b = count === 3 ? a + 1 : words.length; b <= words.length; b++) {
    const lines = count === 3 ? [words.slice(0, a).join(' '), words.slice(a, b).join(' '), words.slice(b).join(' ')] : [words.slice(0, a).join(' '), words.slice(a).join(' ')];
    if (lines.some((line) => !line)) continue;
    const sizes = lines.map(lineUnits); const score = Math.max(...sizes) * 4 - Math.min(...sizes);
    if (score < cost) { best = lines; cost = score; }
  }
  return best;
}
export function fitTitle(title: string, width = 252, minimum = 18, maximum = 49) {
  const original = titleLockup(title).slice(0, 3);
  const fontSize = Math.max(minimum, Math.min(maximum, width / Math.max(1, ...original.map(lineUnits))));
  const lines = original.map((line) => {
    if (lineUnits(line) * fontSize <= width) return line;
    const chars = Array.from(line);
    while (chars.length && lineUnits(chars.join('') + '…') * fontSize > width) chars.pop();
    return chars.join('').trimEnd() + '…';
  });
  return { lines, fontSize, widths: lines.map((line) => Math.min(width, lineUnits(line) * fontSize)) };
}

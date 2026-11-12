export interface TmdbCandidate {
  id: number;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  original_language: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
export interface ArtworkTarget { title: string; aliases: string[]; type: 'movie' | 'series'; year: number; originalLanguage: string }
const codes: Record<string, string> = { Hindi: 'hi', English: 'en', Tamil: 'ta', Telugu: 'te', Malayalam: 'ml', Kannada: 'kn', Bengali: 'bn', Marathi: 'mr' };
export function artworkQuery(title: string): string { return title.replace(/\s*\(Malayalam\)$/, ''); }
function normalized(value: string): string { return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''); }
/** Never silently choose a popular remake or a different year. Ambiguous matches are skipped. */
export function selectArtworkMatch(target: ArtworkTarget, results: TmdbCandidate[]): TmdbCandidate | null {
  const names = [artworkQuery(target.title), ...target.aliases].map(normalized);
  const matches = results.filter((candidate) => {
    const date = target.type === 'movie' ? candidate.release_date : candidate.first_air_date;
    return date?.slice(0, 4) === String(target.year) && candidate.original_language === codes[target.originalLanguage]
      && [candidate.title, candidate.original_title, candidate.name, candidate.original_name].some((name) => name && names.includes(normalized(name)));
  });
  return matches.length === 1 ? matches[0] : null;
}
export function validImagePath(value: unknown): value is string { return typeof value === 'string' && /^\/[a-zA-Z0-9_-]+\.(jpg|png|webp)$/.test(value); }

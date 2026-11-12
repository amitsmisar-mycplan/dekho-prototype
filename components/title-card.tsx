'use client';
import { PosterCard } from '@/components/ui';
import { PosterLink } from '@/components/poster-transition';
import { offerLabel } from '@/lib/discovery';
import type { Provider, Title } from '@/lib/data';
import type { Preferences } from '@/lib/preferences';
export function TitleCard({ title, providers, prefs, onNavigate }: { title: Title; providers: Provider[]; prefs: Preferences; onNavigate?: () => void }) {
  const label = offerLabel(title, providers, prefs);
  return <article className="movie-card"><PosterLink title={title} onNavigate={onNavigate}><PosterCard catalogTitle={title} title={title.title} palette={title.palette} posterPath={title.posterPath} eyebrow={`${title.year} · ${title.originalLanguage}`}/><span className="sr-only">{title.title}</span></PosterLink><span className={`offer-label ${label.included || prefs.freeOnly ? 'on-service' : ''}`}>{label.text}</span></article>;
}

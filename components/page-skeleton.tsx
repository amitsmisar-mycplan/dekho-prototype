
'use client';
import { useCopy } from '@/lib/use-copy';
import { commonCopy } from '@/.generated/copy/common';
export function PageSkeleton({ kind = 'cards' }: { kind?: 'cards' | 'title' | 'poll' | 'profile' | 'search' }) {
  const formatCopy=useCopy();
  return <div className={`page-content loading-page loading-${kind}`} role="status" aria-label={formatCopy(commonCopy['getting_your_next_movie_night_ready'])}><p className="muted">{formatCopy(commonCopy['getting_your_next_movie_night_ready'])}</p><div className="skeleton skeleton-heading"/>{kind === 'title' || kind === 'cards' ? <div className="skeleton skeleton-hero"/> : null}<div className="skeleton skeleton-line"/><div className="loading-cards">{[0, 1, 2].map((n) => <div key={n} className="skeleton"/>)}</div></div>;
}

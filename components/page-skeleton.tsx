export function PageSkeleton({ kind = 'cards' }: { kind?: 'cards' | 'title' | 'poll' | 'profile' | 'search' }) {
  return <div className={`page-content loading-page loading-${kind}`} role="status" aria-label="Getting your next movie night ready"><span className="sr-only">Loading…</span><div className="skeleton skeleton-heading"/>{kind === 'title' || kind === 'cards' ? <div className="skeleton skeleton-hero"/> : null}<div className="skeleton skeleton-line"/><div className="loading-cards">{[0, 1, 2].map((n) => <div key={n} className="skeleton"/>)}</div></div>;
}

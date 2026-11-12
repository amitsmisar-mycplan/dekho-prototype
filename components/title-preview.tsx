'use client';
import { CatalogArtwork } from '@/components/poster/CatalogArtwork';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowUpRight, Bookmark, Check, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { DestinationPoster, PosterLink } from '@/components/poster-transition';
import { ShortlistButton } from '@/components/shortlist-button';
import { PosterCard } from '@/components/ui';
import type { Title, Provider, ProviderOffer, SimilarTitle, OfferType } from '@/lib/data';
import { offerLabel } from '@/lib/discovery';
import { titleAvailabilityMessage, titleRecommendations, versionLabel, whatsappShareUrl } from '@/lib/title-details';
import { getGroupRating, pollStore } from '@/lib/polls';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
import { brand } from '@/lib/brand';
import { initials } from '@/lib/preferences';
const offerGroups: { type: OfferType; label: string }[] = [{ type: 'stream', label: 'Stream' }, { type: 'rent', label: 'Rent' }, { type: 'buy', label: 'Buy' }, { type: 'free', label: 'Free' }];
export function TitlePreview({ title, providers, offers, similar, versions }: { title: Title; providers: Provider[]; offers: ProviderOffer[]; similar: SimilarTitle[]; versions: Title[] }) {
  const prefs = usePrototype((s) => s.prefs); const watchlist = usePrototype((s) => s.watchlist); const rating = usePrototype((s) => s.personalRatings[title.id]);
  const [expanded, setExpanded] = useState(false); const [onlyServices, setOnlyServices] = useState(true);
  const [group, setGroup] = useState<{ percent: number; votes: number } | null>(null); const [take, setTake] = useState(rating?.take ?? ''); const [notice, setNotice] = useState(''); const [shareUrl, setShareUrl] = useState(''); const [shareFallback, setShareFallback] = useState(false);
  const recommended = titleRecommendations(title, similar, versions, prefs, onlyServices); const unavailable = titleAvailabilityMessage(offers, prefs.services);
  useEffect(() => { track('title_view', { titleId: title.id }); let active = true; const update = () => { getGroupRating(title.id).then((value) => { if (active) setGroup(value); }); }; update(); const unsubscribe = pollStore.subscribe(update); return () => { active = false; unsubscribe(); }; }, [title.id]);
  useEffect(() => { setShareUrl(whatsappShareUrl(`${title.title} — tonight on ${brand.name}?`, `${window.location.origin}/t/${title.slug}`)); }, [title.slug, title.title]);
  async function share() {
    const url = `${window.location.origin}/t/${title.slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: title.title, text: `Tonight on ${brand.name}?`, url }); setNotice('Shared. Bring the gang.'); return; }
      catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
    }
    setShareFallback(true);
  }
  return <article className="title-page" style={{ '--title-a': title.palette[0], '--title-b': title.palette[1] } as CSSProperties}>
    <section className="title-hero">
      <div className="title-backdrop"><CatalogArtwork title={title} variant="backdrop"/></div>
      <Link href="/" className="text-action title-back"><ArrowLeft size={16}/> Tonight</Link>
      <div className="title-identity"><DestinationPoster title={title}/><div><h1>{title.title}</h1><p className="title-meta">{title.year} · {title.runtimeMin ? `${title.runtimeMin} min` : `${title.seasons} seasons`} · {title.certification}<br/>{title.languages.join(' · ')}</p><div className="genre-chips">{title.genres.map((genre) => <span key={genre}>{genre}</span>)}</div></div></div>
    </section>
    <div className="title-body">
      <section className="ratings-strip" aria-label="Ratings"><div className="tmdb-rating"><span className="rating-ring" style={{ '--rating': `${title.tmdbRating * 10}%` } as CSSProperties}><b>{title.tmdbRating.toFixed(1)}</b></span><div><strong>TMDb</strong><small>Illustrative score / 10</small></div></div><div className="group-rating"><ThumbsUp size={17}/><strong>Your groups</strong><small>{group ? `${group.percent}% picked this · ${group.votes} votes` : 'No group votes yet'}</small></div></section>
      <section className="watch-section"><h2>Where to watch <span>in India</span></h2>{unavailable && <p className="unavailable-note">{unavailable}</p>}
        {offerGroups.map(({ type, label }) => { const rows = offers.filter((o) => o.type === type).sort((a, b) => Number(prefs.services.includes(b.providerId)) - Number(prefs.services.includes(a.providerId))); return rows.length ? <div className="offer-group" key={type}><h3>{label}</h3>{rows.map((offer) => <div className="watch-row" key={`${offer.providerId}-${type}`}><div><strong style={{ color: offer.provider.color }}>{offer.provider.name}</strong><div className="watch-row-meta">{prefs.services.includes(offer.providerId) && <span className="on-service">You have this</span>}<span>{type === 'free' ? 'Free tier' : offer.priceInr !== undefined ? `₹${offer.priceInr.toLocaleString('en-IN')}${type === 'rent' || type === 'buy' ? ' extra' : ''}` : 'Subscription'}</span></div></div><a href={offer.deepLink} target="_blank" rel="noopener noreferrer" aria-label={`Watch on ${offer.provider.name} (${label}, opens in new tab)`} onClick={() => track('watch_click', { titleId: title.id, providerId: offer.providerId, offerType: type })}>Watch on {offer.provider.name}<ArrowUpRight size={14}/></a></div>)}</div> : null; })}
        <p className="availability-note">Availability is illustrative. Check price and access with the provider. Links may open the provider homepage.</p>
      </section>
      <section className="similar-section"><div className="similar-heading"><h2>More like this</h2><label className="service-toggle"><input type="checkbox" checked={onlyServices} onChange={(event) => setOnlyServices(event.target.checked)}/> Only what’s on my services</label></div>{versions.length > 0 && <p className="prototype-note">Originals and remakes stay pinned, even on other apps.</p>}{prefs.freeOnly && <p className="prototype-note">Free-only preferences apply to the other recommendations.</p>}
        {recommended.length ? <div className="movie-rail similar-rail">{recommended.map(({ title: pick, because }) => { const label = offerLabel(pick, providers, prefs.freeOnly && !pick.providers.some((o) => o.type === 'free') ? { ...prefs, freeOnly: false } : prefs); const pinned = versionLabel(title, pick); return <article className="similar-card" key={pick.id}><PosterLink title={pick} onNavigate={() => track('similar_tap', { titleId: title.id, targetId: pick.id })}><PosterCard catalogTitle={pick} title={pick.title} palette={pick.palette} posterPath={pick.posterPath} eyebrow={String(pick.year)}/></PosterLink><ShortlistButton title={pick} compact/><p className={pinned ? 'version-label' : 'because-line'}>{because}</p><span className={`offer-label ${label.included ? 'on-service' : ''}`}>{label.included || label.text.startsWith('Free') ? label.text : label.provider ? `${label.provider.name} only` : label.text}</span></article>; })}</div> : <div className="rail-empty">No matching picks on these services yet. Turn off the filter to explore more.</div>}
        {recommended.length > 0 && recommended.length < 8 && <p className="prototype-note">{recommended.length} matching picks in this small catalog. Try turning off the service filter for more.</p>}
      </section>
      <section className="story-section"><h2>The story</h2><p className={expanded ? 'synopsis expanded' : 'synopsis'}>{title.synopsis}</p><button className="text-action" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Read more'}</button><h3>The familiar faces</h3><div className="cast-row">{title.cast.map((name, i) => <div className="cast-person" key={name}><span style={{ background: `linear-gradient(${90 + i * 40}deg, var(--title-a), var(--title-b))` }}>{initials(name)}</span><p>{name}</p></div>)}</div><p className="prototype-note">Directed by {title.director}</p></section>
      <section className="personal-rating"><h2>Seen it?</h2><p className="muted">Your take. Saved just for you.</p><div className="thumb-options">{([-1, 1, 2] as const).map((score) => <button key={score} aria-pressed={rating?.score === score} aria-label={score === -1 ? 'Not for me' : score === 1 ? 'Liked it' : 'Loved it'} onClick={() => { usePrototype.getState().rateTitle(title.id, score, take); setNotice('Your rating is saved.'); }}>{score === -1 ? <ThumbsDown size={20}/> : <><ThumbsUp size={20}/>{score === 2 && <ThumbsUp size={20}/>}</>}<span>{score === -1 ? 'Not for me' : score === 1 ? 'Liked it' : 'Loved it'}</span></button>)}</div><label htmlFor="personal-take">One-line take <span>(optional)</span></label><input id="personal-take" maxLength={160} value={take} onChange={(event) => setTake(event.target.value)} placeholder="Worth staying up for?"/><button className="text-action" disabled={!rating} onClick={() => { if (rating) { usePrototype.getState().rateTitle(title.id, rating.score, take); setNotice('Your take is saved.'); } }}>Save take</button>{!rating && <small>Pick a thumb to save your take.</small>}</section>
      <p role="status" className="title-notice">{notice}</p>{shareUrl && <a className="whatsapp-share" href={shareUrl} target="_blank" rel="noopener noreferrer">Share on WhatsApp <ArrowUpRight size={16}/></a>}
      <p className="title-attribution">Original generated key art. This product is not endorsed or certified by TMDb. Ratings are illustrative snapshots.</p>
    </div>
    <div className="title-sticky-actions">{shareFallback && <div className="share-fallback"><a href={shareUrl} target="_blank" rel="noopener noreferrer">Share on WhatsApp <ArrowUpRight size={16}/></a><button className="icon-button" onClick={() => setShareFallback(false)} aria-label="Close share options">×</button></div>}<ShortlistButton title={title}/><button className="icon-button" aria-label={watchlist.includes(title.id) ? 'Remove from watchlist' : 'Add to watchlist'} aria-pressed={watchlist.includes(title.id)} onClick={() => { usePrototype.getState().toggleWatchlist(title.id); setNotice(watchlist.includes(title.id) ? 'Removed from watchlist.' : 'Saved to watchlist.'); }}>{watchlist.includes(title.id) ? <Check size={20}/> : <Bookmark size={20}/>}</button><button className="icon-button" aria-label="Share title" onClick={share}><Share2 size={20}/></button></div>
  </article>;
}

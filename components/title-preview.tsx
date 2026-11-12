'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Plus, Star } from 'lucide-react';
import { DestinationPoster } from '@/components/poster-transition';
import { Button } from '@/components/ui';
import type { Title, Provider } from '@/lib/data';
import { offerLabel } from '@/lib/discovery';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
export function TitlePreview({ title, providers }: { title: Title; providers: Provider[] }) {
  const prefs = usePrototype((s) => s.prefs); const shortlist = usePrototype((s) => s.shortlist); const [notice, setNotice] = useState('');
  const added = shortlist.includes(title.id); const label = offerLabel(title, providers, prefs);
  useEffect(() => { track('title_view', { titleId: title.id }); }, [title.id]);
  return <div className="page-content title-preview"><Link href="/" className="text-action"><ArrowLeft size={16}/> Back to tonight</Link><DestinationPoster title={title}/><p className="eyebrow">{title.originalLanguage} · {title.year} · {title.type === 'movie' ? `${title.runtimeMin} min` : `${title.seasons} seasons`}</p><h1>{title.title}</h1><p className="title-synopsis">{title.synopsis}</p><p className="rating"><Star size={14}/> {title.tmdbRating.toFixed(1)} · illustrative rating</p><span className={`offer-label ${label.included ? 'on-service' : ''}`}>{label.text}</span><Button variant={added ? 'secondary' : 'primary'} onClick={() => { if (!added && shortlist.length >= 4) { setNotice('Four is a good crowd. Remove a pick from Shortlist first.'); return; } usePrototype.getState().toggleShortlist(title.id); if (!added) track('shortlist_add', { titleId: title.id, source: 'title-preview' }); setNotice(added ? 'Removed from your shortlist.' : 'Added to your shortlist.'); }}>{added ? <Check size={18}/> : <Plus size={18}/>} {added ? 'On your shortlist' : 'Add to shortlist'}</Button><p role="status" className="prototype-note">{notice}</p><div className="title-preview-note"><h3>A little first look.</h3><p>The full title page, similar picks and watch links arrive in P4. Availability is illustrative.</p><small>Artwork, when seeded: TMDb. This product is not endorsed or certified by TMDb.</small></div></div>;
}

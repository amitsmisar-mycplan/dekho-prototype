'use client';
import { useCopy } from '@/lib/use-copy';
import { useTone } from '@/lib/use-copy';
import { searchCopy } from '@/.generated/copy/search';
import { commonCopy } from '@/.generated/copy/common';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search, UsersRound, X } from 'lucide-react';
import { dataSource, type Provider, type Title } from '@/lib/data';
import { hasFreeOffer, offerLabel, peopleMatches } from '@/lib/discovery';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
import { PosterCard } from '@/components/ui';
import { PosterLink } from '@/components/poster-transition';
export function SearchScreen({ titles, providers }: { titles: Title[]; providers: Provider[] }) {
  const formatCopy = useCopy();
  const tone = useTone();
  const prefs = usePrototype((s) => s.prefs); const recents = usePrototype((s) => s.recentSearches);
  const [query, setQuery] = useState(''); const [result, setResult] = useState<{ query: string; titles: Title[]; freeOnly: boolean } | null>(null); const [error, setError] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { input.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    let active = true; setError(false);
    const timer = setTimeout(() => {
      if (!query.trim()) return;
      dataSource.searchTitles(query).then((found) => { if (active) { const matching = found.filter((t) => !prefs.freeOnly || hasFreeOffer(t)); setResult({ query, titles: matching, freeOnly: prefs.freeOnly }); track('search', { query: query.trim(), results: matching.length, freeOnly: prefs.freeOnly }); } }).catch(() => { if (active) setError(true); });
    }, 120);
    return () => { active = false; clearTimeout(timer); };
  }, [query, prefs.freeOnly]);
  const people = peopleMatches(titles.filter((t) => !prefs.freeOnly || hasFreeOffer(t)), query);
  const ready = result?.query === query && result.freeOnly === prefs.freeOnly;
  const remember = () => usePrototype.getState().rememberSearch(query);
  function choose(value: string) { setQuery(value); usePrototype.getState().rememberSearch(value); input.current?.focus(); }
  return <div className="page-content search-page"><p className="eyebrow">{formatCopy(searchCopy['one_good_film_leads_to_another'])}</p><h1>{formatCopy(searchCopy['kya_dekhein'], {}, tone)}<span>{formatCopy(searchCopy['separator_3'])}</span></h1><p className="muted search-subtitle">{formatCopy(searchCopy['a_title_a_familiar_face_a_little_inspiration'])}</p>
    <form className="search-box" role="search" onSubmit={(event) => { event.preventDefault(); remember(); }}><Search size={18}/><label className="sr-only" htmlFor="title-search">{formatCopy(searchCopy['search_titles_or_people'])}</label><input ref={input} id="title-search" autoComplete="off" maxLength={160} placeholder={formatCopy(searchCopy['films_shows_people'])} value={query} onChange={(event) => setQuery(event.target.value)}/>{query && <button type="button" className="icon-button" aria-label={formatCopy(searchCopy['clear_search'])} onClick={() => { setQuery(''); input.current?.focus(); }}><X size={18}/></button>}</form>
    {prefs.freeOnly && <p className="prototype-note">{formatCopy(searchCopy['free_picks_only'])}<Link href="/welcome?edit=services">{formatCopy(searchCopy['edit_preferences'])}</Link></p>}
    {!query.trim() ? <><div className="search-section-heading"><h2>{formatCopy(searchCopy['recent_searches'])}</h2>{recents.length > 0 && <button className="text-action" onClick={() => usePrototype.getState().clearSearches()}>{formatCopy(searchCopy['clear_history'])}</button>}</div>{recents.length ? <div className="recent-searches">{recents.map((recent) => <button key={recent} onClick={() => choose(recent)}><span>{recent}</span><ArrowUpRight size={16}/></button>)}</div> : <p className="muted">{formatCopy(searchCopy['your_next_rabbit_hole_starts_here'])}</p>}<h2 className="try-heading">{formatCopy(searchCopy['start_with_a_favourite'])}</h2><p className="prototype-note">{formatCopy(searchCopy['try_panchayat_jailer_manjummel_boys'])}</p><div className="search-suggestions">{[formatCopy(searchCopy['panchayat']), formatCopy(searchCopy['jailer']), formatCopy(searchCopy['manjummel_boys'])].map((name) => <button key={name} onClick={() => choose(name)}>{name}<ArrowUpRight size={16}/></button>)}</div></> : error ? <div className="empty-state"><h2>{formatCopy(searchCopy['a_little_intermission'])}</h2><p>{formatCopy(searchCopy['search_didn_t_load_try_another_title'])}</p><button className="button button-secondary" onClick={() => choose(formatCopy(searchCopy['panchayat']))}>{formatCopy(searchCopy['try_panchayat'])}</button></div> : !ready ? <div className="search-skeletons" role="status" aria-label={formatCopy(searchCopy['searching'])}>{[0, 1, 2].map((n) => <div className="skeleton" key={n}/>)}</div> : <>
      <p className="search-count" role="status">{result.titles.length} {formatCopy(searchCopy['titles_2'])}{people.length} {formatCopy(searchCopy['people_2'])}</p>
      {result.titles.length > 0 && <section><h2 className="search-group-heading">{formatCopy(searchCopy['titles'])}</h2><div className="search-results">{result.titles.map((title) => { const label = offerLabel(title, providers, prefs); return <PosterLink key={title.id} title={title} className="search-result" onNavigate={remember}><PosterCard catalogTitle={title} title={title.title} palette={title.palette} posterPath={title.posterPath} eyebrow={String(title.year)}/><div><h3>{title.title}</h3><p>{title.year} {formatCopy(searchCopy['separator_2'])}{title.originalLanguage} {formatCopy(searchCopy['separator_2'])}{title.type === 'movie' ? formatCopy(searchCopy['film']) : formatCopy(searchCopy['series'])}</p><span className={`offer-label ${label.included || prefs.freeOnly ? 'on-service' : ''}`}>{label.text}</span></div><ArrowUpRight size={16}/></PosterLink>; })}</div></section>}
      {people.length > 0 && <section><h2 className="search-group-heading">{formatCopy(searchCopy['people'])}</h2>{people.map((person) => <article className="person-result" key={person.name}><button onClick={() => choose(person.name)}><UsersRound size={18}/><span><strong>{person.name}</strong><small>{person.role} {formatCopy(searchCopy['separator_2'])}{person.titles.length} {person.titles.length === 1 ? formatCopy(commonCopy['title']) : formatCopy(commonCopy['titles'])} {formatCopy(searchCopy['in_the_catalog'])}</small></span></button><div className="person-filmography">{person.titles.map((title) => <Link key={title.id} href={`/t/${title.slug}`} onClick={remember}>{title.title}<ArrowUpRight size={13}/></Link>)}</div></article>)}</section>}
      {!result.titles.length && !people.length && <div className="search-no-results"><Search size={34}/><h2>{formatCopy(searchCopy['picture_abhi_baaki_hai'])}</h2><p>{formatCopy(searchCopy['no_match_for'])}{query}{formatCopy(searchCopy['separator'])}{prefs.freeOnly ? formatCopy(searchCopy['among_our_free_picks']) : formatCopy(searchCopy['in_this_small_catalog'])}{formatCopy(searchCopy['try_a_shorter_spelling_or_a_familiar_face'])}</p><button className="button button-secondary" onClick={() => choose(prefs.freeOnly ? formatCopy(searchCopy['jersey']) : formatCopy(searchCopy['panchayat']))}>{formatCopy(searchCopy['try'])}{prefs.freeOnly ? formatCopy(searchCopy['jersey']) : formatCopy(searchCopy['panchayat'])} <ArrowUpRight size={16}/></button></div>}
    </>}
    <p className="prototype-note">{formatCopy(searchCopy['provider_availability_is_illustrative_rentals_are_never_labelled_'])}</p>
  </div>;
}

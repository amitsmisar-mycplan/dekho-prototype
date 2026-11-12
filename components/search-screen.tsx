'use client';
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
  return <div className="page-content search-page"><p className="eyebrow">ONE GOOD FILM LEADS TO ANOTHER</p><h1>Kya dekhein<span>?</span></h1><p className="muted search-subtitle">A title, a familiar face, a little inspiration.</p>
    <form className="search-box" role="search" onSubmit={(event) => { event.preventDefault(); remember(); }}><Search size={18}/><label className="sr-only" htmlFor="title-search">Search titles or people</label><input ref={input} id="title-search" autoComplete="off" maxLength={160} placeholder="Films, shows, people…" value={query} onChange={(event) => setQuery(event.target.value)}/>{query && <button type="button" className="icon-button" aria-label="Clear search" onClick={() => { setQuery(''); input.current?.focus(); }}><X size={18}/></button>}</form>
    {prefs.freeOnly && <p className="prototype-note">Free picks only · <Link href="/welcome?edit=services">Edit preferences</Link></p>}
    {!query.trim() ? <><div className="search-section-heading"><h2>Recent searches</h2>{recents.length > 0 && <button className="text-action" onClick={() => usePrototype.getState().clearSearches()}>Clear history</button>}</div>{recents.length ? <div className="recent-searches">{recents.map((recent) => <button key={recent} onClick={() => choose(recent)}><span>{recent}</span><ArrowUpRight size={16}/></button>)}</div> : <p className="muted">Your next rabbit hole starts here.</p>}<h2 className="try-heading">Start with a favourite.</h2><p className="prototype-note">Try: Panchayat, Jailer, Manjummel Boys</p><div className="search-suggestions">{['Panchayat', 'Jailer', 'Manjummel Boys'].map((name) => <button key={name} onClick={() => choose(name)}>{name}<ArrowUpRight size={16}/></button>)}</div></> : error ? <div className="empty-state"><h2>A little intermission.</h2><p>Search didn’t load. Try another title.</p><button className="button button-secondary" onClick={() => choose('Panchayat')}>Try Panchayat</button></div> : !ready ? <div className="search-skeletons" role="status" aria-label="Searching">{[0, 1, 2].map((n) => <div className="skeleton" key={n}/>)}</div> : <>
      <p className="search-count" role="status">{result.titles.length} titles · {people.length} people</p>
      {result.titles.length > 0 && <section><h2 className="search-group-heading">Titles</h2><div className="search-results">{result.titles.map((title) => { const label = offerLabel(title, providers, prefs); return <PosterLink key={title.id} title={title} className="search-result" onNavigate={remember}><PosterCard catalogTitle={title} title={title.title} palette={title.palette} posterPath={title.posterPath} eyebrow={String(title.year)}/><div><h3>{title.title}</h3><p>{title.year} · {title.originalLanguage} · {title.type === 'movie' ? 'Film' : 'Series'}</p><span className={`offer-label ${label.included || prefs.freeOnly ? 'on-service' : ''}`}>{label.text}</span></div><ArrowUpRight size={16}/></PosterLink>; })}</div></section>}
      {people.length > 0 && <section><h2 className="search-group-heading">People</h2>{people.map((person) => <article className="person-result" key={person.name}><button onClick={() => choose(person.name)}><UsersRound size={18}/><span><strong>{person.name}</strong><small>{person.role} · {person.titles.length} {person.titles.length === 1 ? 'title' : 'titles'} in the catalog</small></span></button><div className="person-filmography">{person.titles.map((title) => <Link key={title.id} href={`/t/${title.slug}`} onClick={remember}>{title.title}<ArrowUpRight size={13}/></Link>)}</div></article>)}</section>}
      {!result.titles.length && !people.length && <div className="search-no-results"><Search size={34}/><h2>Picture abhi baaki hai.</h2><p>No match for “{query}”{prefs.freeOnly ? ' among our free picks' : ' in this small catalog'}. Try a shorter spelling or a familiar face.</p><button className="button button-secondary" onClick={() => choose(prefs.freeOnly ? 'Jersey' : 'Panchayat')}>Try {prefs.freeOnly ? 'Jersey' : 'Panchayat'} <ArrowUpRight size={16}/></button></div>}
    </>}
    <p className="prototype-note">Provider availability is illustrative. Rentals are never labelled as included in your subscription.</p>
  </div>;
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PosterLink } from '@/components/poster-transition';
import { usePrototype } from '@/lib/store';
import { resolveCatalogPreferences } from '@/lib/preferences';
import { ArrowLeft, ArrowRight, Search, Star } from 'lucide-react';
import { PosterCard, ProviderChip } from '@/components/ui';
import { dataSource, getAvailabilityMessage, languages as availableLanguages } from '@/lib/data';
async function loadCatalog(query: string, slug: string, services: string[], languages: string[], freeOnly: boolean) {
  const [info, allTitles, providers, searched, selected] = await Promise.all([
    dataSource.getCatalogInfo(), dataSource.listTitles(), dataSource.listProviders(),
    query.trim() ? dataSource.searchTitles(query) : dataSource.listTitles(), dataSource.getTitle(slug),
  ]);
  const matchesLanguage = (title: { languages: string[] }) => !languages.length || title.languages.some((l) => languages.includes(l));
  const results = searched.filter(matchesLanguage).filter((t) => !freeOnly || t.providers.some((o) => o.type === 'free'));
  const [allSimilar, offers] = selected ? await Promise.all([dataSource.getSimilar(selected.id, 60), dataSource.getProviders(selected.id, services)]) : [[], []];
  const similar = allSimilar.filter((r) => matchesLanguage(r.title) && (!freeOnly || r.title.providers.some((o) => o.type === 'free'))).slice(0, 5);
  return { info, allTitles, providers, results, selected, similar, offers };
}
export default function CatalogLab({ query, slug, service, language }: { query: string; slug: string; service: string; language: string }) {
  const prefs = usePrototype((s) => s.prefs);
  const effective = resolveCatalogPreferences(prefs, service, language);
  const serviceKey = effective.services.join('|'), languageKey = effective.languages.join('|');
  const [loaded, setLoaded] = useState<{ key: string; data: Awaited<ReturnType<typeof loadCatalog>> } | null>(null);
  const [error, setError] = useState(false);
  const requestKey = JSON.stringify([query, slug, serviceKey, languageKey, prefs.freeOnly]);
  useEffect(() => {
    let active = true;
    setError(false);
    loadCatalog(query, slug, serviceKey ? serviceKey.split('|') : [], languageKey ? languageKey.split('|') : [], prefs.freeOnly)
      .then((data) => { if (active) setLoaded({ key: requestKey, data }); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [query, slug, serviceKey, languageKey, requestKey, prefs.freeOnly]);
  if (error) return <div className="page-content empty-state"><h2>A little intermission.</h2><p>The catalog couldn’t load. Your preferences are still saved.</p><button className="button button-primary" onClick={() => window.location.reload()}>Try again</button></div>;
  if (!loaded || loaded.key !== requestKey) return <div className="page-content" role="status" aria-label="Loading your catalog"><div className="skeleton" style={{ height: 420, borderRadius: 20 }}/></div>;
  const { info, allTitles, providers, results, selected, similar, offers } = loaded.data;
  const availabilityMessage = getAvailabilityMessage(offers, providers.filter((p) => effective.services.includes(p.id)));
  return <div className="page-content catalog-lab">
    <Link className="text-action" href="/kit"><ArrowLeft size={16}/> Back to design kit</Link>
    <p className="eyebrow">P1 / CATALOG LAB</p><h1>Good picks.<br/>Clear reasons<span>.</span></h1>
    <p className="muted catalog-intro">{info.titleCount} films & shows. Eight languages.<br/>A small library for your next big night.</p>
    <details className="data-disclaimer"><summary>Illustrative data · India only</summary><p>{info.disclaimer}</p></details>
    <div className="catalog-preferences"><p className="eyebrow">YOUR SAVED TASTE</p><p>{prefs.freeOnly ? 'Free picks only' : effective.savedServices ? providers.filter((p) => effective.services.includes(p.id)).map((p) => p.name).join(' · ') : 'No saved services — use the dropdown below.'}</p><p>{effective.savedLanguages ? effective.languages.join(' · ') : 'No saved languages — use the dropdown below.'}</p><Link href="/welcome?edit=services">Edit preferences <ArrowRight size={14}/></Link></div>
    <section><h2>Find something familiar.</h2><form className="catalog-form" action="/kit/catalog">
      <input type="hidden" name="service" value={service}/><input type="hidden" name="language" value={language}/><label htmlFor="catalog-query">Title, alternate spelling or actor</label>
      <div className="catalog-search"><input id="catalog-query" name="q" defaultValue={query} placeholder="Try panchayath or Fahadh Faasil" maxLength={160}/><button className="icon-button" aria-label="Search catalog" type="submit"><Search size={19}/></button></div>
    </form><p className="prototype-note">{results.length} {results.length === 1 ? 'match' : 'matches'}{query && ` for “${query}”`}. Select a title to inspect its matches.</p>
    {results.length ? <div className="catalog-results">{results.map((title) => <Link className="catalog-result" key={title.id} href={{ pathname: '/kit/catalog', query: { q: query, title: title.slug, service, language } }} scroll={false}><div><strong>{title.title}</strong><span>{title.year} · {title.originalLanguage} · {title.type === 'series' ? `${title.seasons} ${title.seasons === 1 ? 'season' : 'seasons'}` : `${title.runtimeMin} min`}</span></div><ArrowRight size={15}/></Link>)}</div> : <div className="empty-state"><h3>Kuch aur try karein?</h3><p>No match in your selected languages. Try another spelling or edit your preferences.</p></div>}</section>
    <section><h2>Why these go together.</h2><form className="catalog-form" action="/kit/catalog">
      <input type="hidden" name="q" value={query}/><label htmlFor="catalog-title">Start with a title</label><select key={selected?.slug ?? 'missing'} id="catalog-title" name="title" defaultValue={selected?.slug ?? ''}>{!selected && <option value="">Choose a title</option>}{allTitles.map((title) => <option key={title.id} value={title.slug}>{title.title}</option>)}</select>
      {prefs.freeOnly ? <p className="prototype-note">Free-only preference is active.</p> : effective.savedServices ? <p className="prototype-note">Offers are ordered using your saved services.</p> : <><label htmlFor="catalog-service">One of your services</label><select key={service} id="catalog-service" name="service" defaultValue={service}><option value="">No preference</option>{providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}</select></>}
      {effective.savedLanguages ? <p className="prototype-note">Search and similar picks are filtered to your saved languages.</p> : <><label htmlFor="catalog-language">Language</label><select key={language} id="catalog-language" name="language" defaultValue={language}><option value="">Any language</option>{availableLanguages.map((item) => <option key={item} value={item}>{item}</option>)}</select></>}
      <button className="button button-secondary" type="submit">Show matches <ArrowRight size={16}/></button>
    </form>
    {selected ? <><div className="catalog-selected"><PosterLink title={selected}><PosterCard title={selected.title} eyebrow={`${selected.year} · ${selected.originalLanguage}`} palette={selected.palette} posterPath={selected.posterPath}/></PosterLink><div><h3>{selected.title}</h3><p>{selected.synopsis}</p><span className="rating"><Star size={13}/> {selected.tmdbRating.toFixed(1)} / 10</span><p className="prototype-note">Illustrative rating, not a live TMDb score.</p></div></div>
    <div className="catalog-offers"><h3>Where to watch · sample offers</h3>{availabilityMessage && <p className="availability-message">{availabilityMessage}</p>}{offers.map((offer) => <div className="catalog-offer" key={`${offer.providerId}-${offer.type}`}><ProviderChip name={offer.provider.name} color={offer.provider.color}/><span>{offer.type}{offer.priceInr !== undefined && ` · ₹${offer.priceInr}`}</span>{offer.onYourServices && <small className="included-label">Your service{offer.type === 'rent' || offer.type === 'buy' ? ' · extra charge' : ''}</small>}</div>)}<p className="prototype-note">Availability is illustrative. Service membership does not include rentals or purchases.</p></div>
    {!similar.length && <p className="prototype-note">No similar titles in these languages yet. Try editing your preferences.</p>}<div className="catalog-similar">{similar.map((result, i) => <Link key={result.title.id} href={{ pathname: '/kit/catalog', query: { title: result.title.slug, service, language, q: query } }} scroll={false}><span className="match-rank">0{i + 1}</span><div><strong>{result.title.title}</strong><p>{result.because}</p><small>Similarity score {result.score.toFixed(3)} · not a prediction</small></div><ArrowRight size={14}/></Link>)}</div><p className="prototype-note">Genres 40% · language 25% · cast/director 25% · rating band 10%. No shared genre: capped at 0.35 and excluded from recommendations. Ties use stable title IDs.</p></> : <div className="empty-state"><h3>That title isn’t in this library.</h3><p>Choose one of the 60 seeded titles above.</p></div>}
    </section><p className="prototype-note">This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb.</p>
  </div>;
}

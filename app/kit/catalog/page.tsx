import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search, Star } from 'lucide-react';
import { PosterCard, ProviderChip } from '@/components/ui';
import { dataSource } from '@/lib/data';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Catalog lab' };
type Params = { q?: string; title?: string; service?: string };
export default async function CatalogPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.slice(0, 160) : '';
  const service = typeof params.service === 'string' ? params.service : '';
  const [info, allTitles, providers, results] = await Promise.all([
    dataSource.getCatalogInfo(), dataSource.listTitles(), dataSource.listProviders(), query.trim() ? dataSource.searchTitles(query) : dataSource.listTitles(),
  ]);
  const slug = typeof params.title === 'string' ? params.title : 'drishyam-2-malayalam';
  const selected = await dataSource.getTitle(slug);
  const [similar, offers] = selected ? await Promise.all([dataSource.getSimilar(selected.id, 5), dataSource.getProviders(selected.id, service ? [service] : [])]) : [[], []];
  return <div className="page-content catalog-lab">
    <Link className="text-action" href="/kit"><ArrowLeft size={16}/> Back to design kit</Link>
    <p className="eyebrow">P1 / CATALOG LAB</p><h1>Good picks.<br/>Clear reasons<span>.</span></h1>
    <p className="muted catalog-intro">{info.titleCount} films & shows. Eight languages.<br/>A small library for your next big night.</p>
    <details className="data-disclaimer"><summary>Illustrative data · India only</summary><p>{info.disclaimer}</p></details>
    <section><h2>Find something familiar.</h2><form className="catalog-form" action="/kit/catalog">
      <label htmlFor="catalog-query">Title, alternate spelling or actor</label>
      <div className="catalog-search"><input id="catalog-query" name="q" defaultValue={query} placeholder="Try panchayath or Fahadh Faasil" maxLength={160}/><button className="icon-button" aria-label="Search catalog" type="submit"><Search size={19}/></button></div>
    </form><p className="prototype-note">{results.length} {results.length === 1 ? 'match' : 'matches'}{query && ` for “${query}”`}. Select a title to inspect its matches.</p>
    {results.length ? <div className="catalog-results">{results.map((title) => <Link className="catalog-result" key={title.id} href={{ pathname: '/kit/catalog', query: { q: query, title: title.slug, service } }} scroll={false}><div><strong>{title.title}</strong><span>{title.year} · {title.originalLanguage} · {title.type === 'series' ? `${title.seasons} ${title.seasons === 1 ? 'season' : 'seasons'}` : `${title.runtimeMin} min`}</span></div><ArrowRight size={15}/></Link>)}</div> : <div className="empty-state"><h3>Kuch aur try karein?</h3><p>No match yet. Try a shorter title or another spelling.</p></div>}</section>
    <section><h2>Why these go together.</h2><form className="catalog-form" action="/kit/catalog">
      <input type="hidden" name="q" value={query}/><label htmlFor="catalog-title">Start with a title</label><select id="catalog-title" name="title" defaultValue={selected?.slug ?? ''}>{!selected && <option value="">Choose a title</option>}{allTitles.map((title) => <option key={title.id} value={title.slug}>{title.title}</option>)}</select>
      <label htmlFor="catalog-service">One of your services</label><select id="catalog-service" name="service" defaultValue={service}><option value="">No preference</option>{providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}</select>
      <button className="button button-secondary" type="submit">Show matches <ArrowRight size={16}/></button>
    </form>
    {selected ? <><div className="catalog-selected"><PosterCard title={selected.title} eyebrow={`${selected.year} · ${selected.originalLanguage}`} palette={selected.palette} posterPath={selected.posterPath}/><div><h3>{selected.title}</h3><p>{selected.synopsis}</p><span className="rating"><Star size={13}/> {selected.tmdbRating.toFixed(1)} / 10</span><p className="prototype-note">Illustrative rating, not a live TMDb score.</p></div></div>
    <div className="catalog-offers"><h3>Where to watch · sample offers</h3>{offers.map((offer) => <div className="catalog-offer" key={`${offer.providerId}-${offer.type}`}><ProviderChip name={offer.provider.name} color={offer.provider.color}/><span>{offer.type}{offer.priceInr !== undefined && ` · ₹${offer.priceInr}`}</span>{offer.onYourServices && <small className="included-label">Your service{offer.type === 'rent' || offer.type === 'buy' ? ' · extra charge' : ''}</small>}</div>)}<p className="prototype-note">Availability is illustrative. Service membership does not include rentals or purchases.</p></div>
    <div className="catalog-similar">{similar.map((result, i) => <Link key={result.title.id} href={{ pathname: '/kit/catalog', query: { title: result.title.slug, service, q: query } }} scroll={false}><span className="match-rank">0{i + 1}</span><div><strong>{result.title.title}</strong><p>{result.because}</p><small>Similarity score {result.score.toFixed(3)} · not a prediction</small></div><ArrowRight size={14}/></Link>)}</div><p className="prototype-note">Genres 40% · language 25% · cast/director 25% · rating band 10%. Ties use stable title IDs.</p></> : <div className="empty-state"><h3>That title isn’t in this library.</h3><p>Choose one of the 60 seeded titles above.</p></div>}
    </section><p className="prototype-note">This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb.</p>
  </div>;
}

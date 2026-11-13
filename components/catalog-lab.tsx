'use client';
import { formatCopy } from '@/lib/copy';
import { kitCopy } from '@/.generated/copy/kit';
import { commonCopy } from '@/.generated/copy/common';
import { labelsCopy } from '@/.generated/copy/labels';

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
  if (error) return <div className="page-content empty-state"><h2>{formatCopy(kitCopy['a_little_intermission'])}</h2><p>{formatCopy(kitCopy['the_catalog_couldn_t_load_your_preferences_are_still_saved'])}</p><button className="button button-primary" onClick={() => window.location.reload()}>{formatCopy(kitCopy['try_again'])}</button></div>;
  if (!loaded || loaded.key !== requestKey) return <div className="page-content" role="status" aria-label={formatCopy(kitCopy['loading_your_catalog'])}><div className="skeleton" style={{ height: 420, borderRadius: 20 }}/></div>;
  const { info, allTitles, providers, results, selected, similar, offers } = loaded.data;
  const availabilityMessage = getAvailabilityMessage(offers, providers.filter((p) => effective.services.includes(p.id)));
  return <div className="page-content catalog-lab">
    <Link className="text-action" href="/kit"><ArrowLeft size={16}/> {formatCopy(kitCopy['back_to_design_kit'])}</Link>
    <p className="eyebrow">{formatCopy(kitCopy['p1_catalog_lab'])}</p><h1>{formatCopy(kitCopy['good_picks'])}<br/>{formatCopy(kitCopy['clear_reasons'])}<span>{formatCopy(kitCopy['separator_2'])}</span></h1>
    <p className="muted catalog-intro">{info.titleCount} {formatCopy(kitCopy['films_shows_eight_languages'])}<br/>{formatCopy(kitCopy['a_small_library_for_your_next_big_night'])}</p>
    <details className="data-disclaimer"><summary>{formatCopy(kitCopy['illustrative_data_india_only'])}</summary><p>{info.disclaimer}</p></details>
    <div className="catalog-preferences"><p className="eyebrow">{formatCopy(kitCopy['your_saved_taste'])}</p><p>{prefs.freeOnly ? formatCopy(kitCopy['free_picks_only']) : effective.savedServices ? providers.filter((p) => effective.services.includes(p.id)).map((p) => p.name).join(' · ') : formatCopy(kitCopy['no_saved_services_use_the_dropdown_below'])}</p><p>{effective.savedLanguages ? effective.languages.join(' · ') : formatCopy(kitCopy['no_saved_languages_use_the_dropdown_below'])}</p><Link href="/welcome?edit=services">{formatCopy(kitCopy['edit_preferences'])}<ArrowRight size={14}/></Link></div>
    <section><h2>{formatCopy(kitCopy['find_something_familiar'])}</h2><form className="catalog-form" action="/kit/catalog">
      <input type="hidden" name="service" value={service}/><input type="hidden" name="language" value={language}/><label htmlFor="catalog-query">{formatCopy(kitCopy['title_alternate_spelling_or_actor'])}</label>
      <div className="catalog-search"><input id="catalog-query" name="q" defaultValue={query} placeholder={formatCopy(kitCopy['try_panchayath_or_fahadh_faasil'])} maxLength={160}/><button className="icon-button" aria-label={formatCopy(kitCopy['search_catalog'])} type="submit"><Search size={19}/></button></div>
    </form><p className="prototype-note">{results.length} {results.length === 1 ? 'match' : 'matches'}{query && formatCopy(kitCopy['for_value'], { p1: query })}{formatCopy(kitCopy['select_a_title_to_inspect_its_matches'])}</p>
    {results.length ? <div className="catalog-results">{results.map((title) => <Link className="catalog-result" key={title.id} href={{ pathname: '/kit/catalog', query: { q: query, title: title.slug, service, language } }} scroll={false}><div><strong>{title.title}</strong><span>{title.year} {formatCopy(kitCopy['separator'])}{title.originalLanguage} {formatCopy(kitCopy['separator'])}{title.type === 'series' ? `${title.seasons} ${title.seasons === 1 ? formatCopy(commonCopy['season']) : formatCopy(commonCopy['seasons'])}` : formatCopy(kitCopy['value_min'], { p1: title.runtimeMin })}</span></div><ArrowRight size={15}/></Link>)}</div> : <div className="empty-state"><h3>{formatCopy(kitCopy['kuch_aur_try_karein'])}</h3><p>{formatCopy(kitCopy['no_match_in_your_selected_languages_try_another_spelling_or_edit_'])}</p></div>}</section>
    <section><h2>{formatCopy(kitCopy['why_these_go_together'])}</h2><form className="catalog-form" action="/kit/catalog">
      <input type="hidden" name="q" value={query}/><label htmlFor="catalog-title">{formatCopy(kitCopy['start_with_a_title'])}</label><select key={selected?.slug ?? 'missing'} id="catalog-title" name="title" defaultValue={selected?.slug ?? ''}>{!selected && <option value="">{formatCopy(kitCopy['choose_a_title'])}</option>}{allTitles.map((title) => <option key={title.id} value={title.slug}>{title.title}</option>)}</select>
      {prefs.freeOnly ? <p className="prototype-note">{formatCopy(kitCopy['free_only_preference_is_active'])}</p> : effective.savedServices ? <p className="prototype-note">{formatCopy(kitCopy['offers_are_ordered_using_your_saved_services'])}</p> : <><label htmlFor="catalog-service">{formatCopy(kitCopy['one_of_your_services'])}</label><select key={service} id="catalog-service" name="service" defaultValue={service}><option value="">{formatCopy(kitCopy['no_preference'])}</option>{providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}</select></>}
      {effective.savedLanguages ? <p className="prototype-note">{formatCopy(kitCopy['search_and_similar_picks_are_filtered_to_your_saved_languages'])}</p> : <><label htmlFor="catalog-language">{formatCopy(kitCopy['language'])}</label><select key={language} id="catalog-language" name="language" defaultValue={language}><option value="">{formatCopy(kitCopy['any_language'])}</option>{availableLanguages.map((item) => <option key={item} value={item}>{item}</option>)}</select></>}
      <button className="button button-secondary" type="submit">{formatCopy(kitCopy['show_matches'])}<ArrowRight size={16}/></button>
    </form>
    {selected ? <><div className="catalog-selected"><PosterLink title={selected}><PosterCard catalogTitle={selected} title={selected.title} eyebrow={`${selected.year} · ${selected.originalLanguage}`} palette={selected.palette} posterPath={selected.posterPath}/></PosterLink><div><h3>{selected.title}</h3><p>{selected.synopsis}</p><span className="rating"><Star size={13}/> {selected.tmdbRating.toFixed(1)} {formatCopy(kitCopy['10'])}</span><p className="prototype-note">{formatCopy(kitCopy['illustrative_rating_not_a_live_tmdb_score'])}</p></div></div>
    <div className="catalog-offers"><h3>{formatCopy(kitCopy['where_to_watch_sample_offers'])}</h3>{availabilityMessage && <p className="availability-message">{availabilityMessage}</p>}{offers.map((offer) => <div className="catalog-offer" key={`${offer.providerId}-${formatCopy(labelsCopy[offer.type])}`}><ProviderChip name={offer.provider.name} color={offer.provider.color}/><span>{formatCopy(labelsCopy[offer.type])}{offer.priceInr !== undefined && formatCopy(commonCopy['price_suffix'], { amount: offer.priceInr })}</span>{offer.onYourServices && <small className="included-label">{formatCopy(kitCopy['your_service'])}{offer.type === 'rent' || offer.type === 'buy' ? formatCopy(kitCopy['extra_charge']) : ''}</small>}</div>)}<p className="prototype-note">{formatCopy(kitCopy['availability_is_illustrative_service_membership_does_not_include_'])}</p></div>
    {!similar.length && <p className="prototype-note">{formatCopy(kitCopy['no_similar_titles_in_these_languages_yet_try_editing_your_prefere'])}</p>}<div className="catalog-similar">{similar.map((result, i) => <Link key={result.title.id} href={{ pathname: '/kit/catalog', query: { title: result.title.slug, service, language, q: query } }} scroll={false}><span className="match-rank">{formatCopy(kitCopy['0'])}{i + 1}</span><div><strong>{result.title.title}</strong><p>{result.because}</p><small>{formatCopy(kitCopy['similarity_score'])}{result.score.toFixed(3)} {formatCopy(kitCopy['not_a_prediction'])}</small></div><ArrowRight size={14}/></Link>)}</div><p className="prototype-note">{formatCopy(kitCopy['genres_40_language_25_cast_director_25_rating_band_10_no_shared_g'])}</p></> : <div className="empty-state"><h3>{formatCopy(kitCopy['that_title_isn_t_in_this_library'])}</h3><p>{formatCopy(kitCopy['choose_one_of_the_60_seeded_titles_above'])}</p></div>}
    </section><p className="prototype-note">{formatCopy(kitCopy['this_is_the_data_preview_full_search_and_title_screens_arrive_in_'])}</p>
  </div>;
}

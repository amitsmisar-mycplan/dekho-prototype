'use client';
import { HomeCheckins } from './watch-checkin';
import { toneForLanguages, formatCopy } from '@/lib/copy';
import { homeCopy } from '@/.generated/copy/home';
import { labelsCopy } from '@/.generated/copy/labels';
import { commonCopy } from '@/.generated/copy/common';

import { LazyRail } from '@/components/lazy-rail';
import { CatalogArtwork } from '@/components/poster/CatalogArtwork';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Search, Sparkles, Laugh, Zap, Users, Heart, Brain } from 'lucide-react';
import { dataSource, type Mood, type Provider, type Title } from '@/lib/data';
import { greeting, homeSelections, offerLabel } from '@/lib/discovery';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
import { getOpenPoll, type OpenPollSummary } from '@/lib/polls';
import { Button, SectionHeader, Sheet, Toast } from '@/components/ui';
import { ShortlistButton } from '@/components/shortlist-button';
import { TitleCard } from '@/components/title-card';
import { PosterLink } from '@/components/poster-transition';
const moodItems: { name: Mood; icon: typeof Laugh; color: string }[] = [{ name: 'Laugh', icon: Laugh, color: '#FFCA66' }, { name: 'Edge-of-seat', icon: Zap, color: '#FF88A8' }, { name: 'Family', icon: Users, color: '#7DDAFF' }, { name: 'Feel-good', icon: Heart, color: '#7EE0B9' }, { name: 'Mind-bender', icon: Brain, color: '#C6AAFF' }];
export function HomeScreen({ titles, providers }: { titles: Title[]; providers: Provider[] }) {
  const prefs = usePrototype((s) => s.prefs); const reduced = useReducedMotion();
  const [hello, setHello] = useState(() => greeting(prefs.name, new Date(), toneForLanguages(prefs.languages))); const [index, setIndex] = useState(0); const [paused, setPaused] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null); const [picks, setPicks] = useState<Title[] | null>(null); const [moodError, setMoodError] = useState(false);
  const [toast, setToast] = useState(''); const [poll, setPoll] = useState<OpenPollSummary | null>(null);
  const { hero, included, eligible, trending } = homeSelections(titles, prefs);
  const selected = hero[index % Math.max(hero.length, 1)]; const heroKey = hero.map((t) => t.id).join('|');
  const swipe = useRef<{ x: number; y: number } | null>(null); const suppressClick = useRef(false);
  const closeMood = useCallback(() => setMood(null), []); const closeToast = useCallback(() => setToast(''), []);
  useEffect(() => { const update = () => setHello(greeting(prefs.name, new Date(), toneForLanguages(prefs.languages))); update(); const timer = setInterval(update, 60_000); return () => clearInterval(timer); }, [prefs.name, prefs.languages]);
  useEffect(() => { let active = true; getOpenPoll().then((p) => { if (active) setPoll(p); }); return () => { active = false; }; }, []);
  useEffect(() => {
    if (reduced || paused || mood || hero.length < 2) return;
    const timer = setInterval(() => { if (document.visibilityState === 'visible') setIndex((n) => (n + 1) % hero.length); }, 6000);
    return () => clearInterval(timer);
  }, [reduced, paused, mood, heroKey, hero.length]);
  useEffect(() => {
    if (!mood) return;
    let active = true; setPicks(null); setMoodError(false);
    dataSource.getMoodPicks(mood, prefs, 4).then((items) => { if (active) setPicks(items); }).catch(() => { if (active) setMoodError(true); });
    return () => { active = false; };
  }, [mood, prefs]);
  function advance(direction: number) { setIndex((n) => (n + direction + hero.length) % hero.length); }
  function fillShortlist() {
    if (!picks || picks.length < 2) return;
    usePrototype.getState().setShortlist(picks.map((p) => p.id));
    picks.forEach((title) => track('shortlist_add', { titleId: title.id, source: 'mood', mood }));
    setMood(null); setToast(formatCopy(homeCopy['value_picks_sorted_open_shortlist_to_see_them'], { p1: picks.length }));
  }
  const rail = (name: string, items: Title[], eyebrow?: string) => <section className="discovery-section" key={name}><SectionHeader title={name} eyebrow={eyebrow}/>{items.length ? <LazyRail><div className="movie-rail">{items.map((title) => <TitleCard key={title.id} title={title} providers={providers} prefs={prefs}/>)}</div></LazyRail> : <div className="rail-empty"><p>{formatCopy(homeCopy['no_picks_here_just_yet_try_another_language'])}</p><Link href="/welcome?edit=services">{formatCopy(homeCopy['edit_your_preferences'])}<ArrowRight size={14}/></Link></div>}</section>;
  return <div className="tonight-home"><div className="tonight-greeting"><div><p className="eyebrow">{formatCopy(homeCopy['less_scrolling_more_cinema'])}</p><h1>{hello}</h1></div><Link className="icon-button" href="/search" aria-label={formatCopy(homeCopy['search_titles'])}><Search size={21}/></Link></div>
    <HomeCheckins titles={titles}/>
    {selected ? <section className="hero-carousel" aria-roledescription="carousel" aria-label={formatCopy(homeCopy['tonight_s_picks'])} onFocusCapture={() => setPaused(true)}>
      <div className="hero-feature" style={{ '--hero-a': selected.palette[0], '--hero-b': selected.palette[1] } as CSSProperties} onPointerDown={(event) => { swipe.current = { x: event.clientX, y: event.clientY }; suppressClick.current = false; }} onPointerUp={(event) => { if (!swipe.current) return; const dx = event.clientX - swipe.current.x, dy = event.clientY - swipe.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { suppressClick.current = true; setPaused(true); advance(dx < 0 ? 1 : -1); } swipe.current = null; }} onPointerCancel={() => { swipe.current = null; }} onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <PosterLink title={selected} className="hero-poster-link"><motion.div key={selected.id} data-poster initial={{ opacity: reduced ? 1 : .6 }} animate={{ opacity: 1 }} className="hero-scene">
          <CatalogArtwork title={selected} variant="backdrop"/><div className="feature-shade"/><span className="feature-tag"><Sparkles size={12}/> {formatCopy(homeCopy['tonight_s_contender'])}</span><div className="feature-copy"><p>{selected.originalLanguage} {formatCopy(homeCopy['separator'])}{selected.year} {formatCopy(homeCopy['separator'])}{selected.type === 'series' ? formatCopy(homeCopy['series']) : formatCopy(homeCopy['value_min'], { p1: selected.runtimeMin })}</p><h2>{selected.title}</h2><p className="feature-because">{prefs.freeOnly ? formatCopy(homeCopy['no_subscription_needed']) : prefs.services.length ? offerLabel(selected, providers, prefs).text : formatCopy(homeCopy['a_little_inspiration_to_start'])} {formatCopy(homeCopy['separator'])}{selected.genres[0].toLowerCase()}</p><span className="feature-action">{formatCopy(homeCopy['take_a_closer_look'])}<ArrowRight size={16}/></span></div>
        </motion.div></PosterLink>
        <ShortlistButton title={selected} hero/>
      </div>
      {hero.length > 1 && <div className="carousel-controls"><button className="icon-button" aria-label={formatCopy(homeCopy['previous_pick'])} onClick={() => { setPaused(true); advance(-1); }}><ArrowLeft size={16}/></button><div className="carousel-dots">{hero.map((title, i) => <button key={title.id} aria-label={formatCopy(homeCopy['show_pick_value_value'], { p1: i + 1, p2: title.title })} aria-current={selected.id === title.id ? 'true' : undefined} onClick={() => { setIndex(i); setPaused(true); }}><span className={selected.id === title.id ? 'current' : ''}/></button>)}</div><button className="icon-button" aria-label={formatCopy(homeCopy['next_pick'])} onClick={() => { setPaused(true); advance(1); }}><ArrowRight size={16}/></button></div>}
    </section> : <div className="home-empty"><Sparkles size={30}/><h2>{formatCopy(homeCopy['your_next_favourite_is_out_there'])}</h2><p>{prefs.freeOnly ? formatCopy(homeCopy['no_free_picks_in_your_selected_languages_yet_our_sample_catalog_i']) : formatCopy(homeCopy['no_titles_match_this_mix_of_services_and_languages_yet'])}</p><Link className="button button-secondary" href="/welcome?edit=services">{formatCopy(homeCopy['adjust_my_preferences'])}</Link></div>}
    <section className="discovery-section mood-start"><SectionHeader eyebrow={formatCopy(homeCopy['skip_the_kuch_bhi'])} title={formatCopy(homeCopy['tonight_we_want'])}/><div className="mood-row">{moodItems.map(({ name, icon: Icon, color }) => <button className="mood-chip" key={name} style={{ '--mood-color': color } as CSSProperties} aria-pressed={mood === name} onClick={() => setMood(name)}><Icon size={17}/>{formatCopy(labelsCopy[name])}</button>)}</div></section>
    {rail(prefs.freeOnly ? formatCopy(homeCopy['free_to_watch']) : formatCopy(homeCopy['on_your_services']), included, formatCopy(homeCopy['already_in_your_corner']))}
    {prefs.languages.map((language) => rail(formatCopy(homeCopy['value_you_ll_love'], { p1: language }), eligible.filter((t) => t.languages.includes(language as Title['originalLanguage']))))}
    {rail(formatCopy(homeCopy['trending_this_week']), trending, formatCopy(homeCopy['in_the_spotlight']))}
    {poll && <Link className="open-poll-banner" href={`/p/${poll.id}`}>{poll.votes} {formatCopy(homeCopy['of'])}{poll.expectedVoters} {formatCopy(homeCopy['voted_closes'])}{new Date(poll.deadline).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}<ArrowRight size={16}/></Link>}
    <Sheet open={Boolean(mood)} onClose={closeMood} title={formatCopy(homeCopy['value_sorted'], { p1: mood ?? formatCopy(homeCopy['tonight']) })}><p className="muted">{formatCopy(homeCopy['a_few_contenders_for_the_group'])}</p>{moodError ? <p className="empty-state">{formatCopy(homeCopy['the_picks_didn_t_load_close_this_sheet_and_give_it_another_try'])}</p> : !picks ? <div className="mood-grid">{[0, 1].map((n) => <div key={n} className="poster skeleton" role="status" aria-label={formatCopy(homeCopy['loading_pick'])}/>)}</div> : picks.length ? <><div className="mood-grid">{picks.map((title) => <TitleCard key={title.id} title={title} providers={providers} prefs={prefs} onNavigate={closeMood}/>)}</div>{picks.length < 4 && <p className="prototype-note">{formatCopy(homeCopy['just'])}{picks.length} {formatCopy(homeCopy['matching'])}{picks.length === 1 ? formatCopy(commonCopy['pick']) : formatCopy(commonCopy['picks'])} {formatCopy(homeCopy['in_this_small_catalog'])}</p>}<Button disabled={picks.length < 2} onClick={fillShortlist}>{formatCopy(homeCopy['put_these_to_the_group'])}<ArrowRight size={16}/></Button><p className="prototype-note">{picks.length < 2 ? formatCopy(homeCopy['a_group_shortlist_needs_at_least_two_picks']) : formatCopy(homeCopy['replaces_your_current_shortlist_then_ask_the_group'])}</p></> : <div className="empty-state"><h3>{formatCopy(homeCopy['thoda_sa_plot_twist'])}</h3><p>{formatCopy(homeCopy['no'])}{mood?.toLowerCase()} {formatCopy(homeCopy['picks_match_these_preferences_yet'])}</p><Link href="/welcome?edit=services" className="button button-secondary" onClick={closeMood}>{formatCopy(homeCopy['try_other_languages'])}</Link></div>}</Sheet><Toast message={toast} onClose={closeToast}/>
  </div>;
}

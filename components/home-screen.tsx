'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play, Search, Sparkles } from 'lucide-react';
import { dataSource, type Mood, type Provider, type Title } from '@/lib/data';
import { greeting, homeSelections, offerLabel } from '@/lib/discovery';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
import { getOpenPoll, type OpenPollSummary } from '@/lib/polls';
import { Button, Chip, SectionHeader, Sheet, Toast } from '@/components/ui';
import { TitleCard } from '@/components/title-card';
import { PosterLink } from '@/components/poster-transition';
const moodNames: Mood[] = ['Laugh', 'Edge-of-seat', 'Family', 'Feel-good', 'Mind-bender'];
export function HomeScreen({ titles, providers }: { titles: Title[]; providers: Provider[] }) {
  const prefs = usePrototype((s) => s.prefs); const reduced = useReducedMotion();
  const [hello, setHello] = useState('Kya plan hai?'); const [index, setIndex] = useState(0); const [paused, setPaused] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null); const [picks, setPicks] = useState<Title[] | null>(null); const [moodError, setMoodError] = useState(false);
  const [toast, setToast] = useState(''); const [poll, setPoll] = useState<OpenPollSummary | null>(null); const [failedBackdrop, setFailedBackdrop] = useState('');
  const { hero, included, eligible, trending } = homeSelections(titles, prefs);
  const selected = hero[index % Math.max(hero.length, 1)]; const heroKey = hero.map((t) => t.id).join('|');
  const swipe = useRef<{ x: number; y: number } | null>(null); const suppressClick = useRef(false);
  const closeMood = useCallback(() => setMood(null), []); const closeToast = useCallback(() => setToast(''), []);
  useEffect(() => { const update = () => setHello(greeting(prefs.name, new Date())); update(); const timer = setInterval(update, 60_000); return () => clearInterval(timer); }, [prefs.name]);
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
    setMood(null); setToast(`${picks.length} picks sorted. Open Shortlist to see them.`);
  }
  const rail = (name: string, items: Title[], eyebrow?: string) => <section className="discovery-section" key={name}><SectionHeader title={name} eyebrow={eyebrow}/>{items.length ? <div className="movie-rail">{items.map((title) => <TitleCard key={title.id} title={title} providers={providers} prefs={prefs}/>)}</div> : <div className="rail-empty"><p>No seeded picks in this corner yet.</p><Link href="/welcome?edit=services">Edit your preferences <ArrowRight size={14}/></Link></div>}</section>;
  return <div className="tonight-home"><div className="tonight-greeting"><div><p className="eyebrow">LESS SCROLLING. MORE CINEMA.</p><h1>{hello}</h1></div><Link className="icon-button" href="/search" aria-label="Search titles"><Search size={21}/></Link></div>
    {selected ? <section className="hero-carousel" aria-roledescription="carousel" aria-label="Tonight’s picks" onFocusCapture={() => setPaused(true)}>
      <div className="hero-feature" style={{ '--hero-a': selected.palette[0], '--hero-b': selected.palette[1] } as CSSProperties} onPointerDown={(event) => { swipe.current = { x: event.clientX, y: event.clientY }; suppressClick.current = false; }} onPointerUp={(event) => { if (!swipe.current) return; const dx = event.clientX - swipe.current.x, dy = event.clientY - swipe.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { suppressClick.current = true; setPaused(true); advance(dx < 0 ? 1 : -1); } swipe.current = null; }} onPointerCancel={() => { swipe.current = null; }} onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <PosterLink title={selected} className="hero-poster-link"><motion.div key={selected.id} data-poster initial={{ opacity: reduced ? 1 : .6 }} animate={{ opacity: 1 }} className="hero-scene">
          {selected.backdropPath && failedBackdrop !== selected.backdropPath && <Image src={`https://image.tmdb.org/t/p/w780${selected.backdropPath}`} alt="" fill unoptimized sizes="390px" onError={() => setFailedBackdrop(selected.backdropPath!)}/>}
          <div className="feature-sun"/><div className="feature-shade"/><span className="feature-tag"><Sparkles size={12}/> TONIGHT’S CONTENDER</span><div className="feature-copy"><p>{selected.originalLanguage} · {selected.year} · {selected.type === 'series' ? 'Series' : `${selected.runtimeMin} min`}</p><h2>{selected.title}</h2><p className="feature-because">{prefs.freeOnly ? 'No subscription needed' : prefs.services.length ? offerLabel(selected, providers, prefs).text : 'A little inspiration to start'} · {selected.genres[0].toLowerCase()}</p><span className="feature-action">Take a closer look <ArrowRight size={16}/></span></div>
        </motion.div></PosterLink>
      </div>
      {hero.length > 1 && <div className="carousel-controls"><button className="icon-button" aria-label="Previous pick" onClick={() => { setPaused(true); advance(-1); }}><ArrowLeft size={16}/></button><div className="carousel-dots">{hero.map((title, i) => <button key={title.id} aria-label={`Show pick ${i + 1}: ${title.title}`} aria-current={selected.id === title.id ? 'true' : undefined} onClick={() => { setIndex(i); setPaused(true); }}><span className={selected.id === title.id ? 'current' : ''}/></button>)}</div><button className="icon-button" aria-label="Next pick" onClick={() => { setPaused(true); advance(1); }}><ArrowRight size={16}/></button>{!reduced && <button className="icon-button" aria-label={paused ? 'Play carousel' : 'Pause carousel'} onClick={() => setPaused((p) => !p)}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>}</div>}
    </section> : <div className="home-empty"><Sparkles size={30}/><h2>Your next favourite is out there.</h2><p>{prefs.freeOnly ? 'No free picks in your selected languages yet. Our sample catalog is still small.' : 'No seeded titles match your services and languages yet.'}</p><Link className="button button-secondary" href="/welcome?edit=services">Adjust my preferences</Link></div>}
    <p className="discovery-disclaimer">India · Illustrative availability. Check your provider before watching.</p>
    <section className="discovery-section mood-start"><SectionHeader eyebrow="SKIP THE “KUCH BHI”" title="Tonight we want…"/><div className="mood-row">{moodNames.map((item) => <Chip key={item} selected={mood === item} onClick={() => setMood(item)}>{item}</Chip>)}</div></section>
    {rail(prefs.freeOnly ? 'Free to watch' : 'On your services', included, 'ALREADY IN YOUR CORNER')}
    {prefs.languages.map((language) => rail(`${language} you’ll love`, eligible.filter((t) => t.languages.includes(language as Title['originalLanguage']))))}
    {rail('Trending this week', trending, 'EDITORIAL PICKS · SEEDED')}
    {poll && <Link className="open-poll-banner" href={`/p/${poll.id}`}>{poll.votes} of {poll.expectedVoters} voted · closes {new Date(poll.deadline).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}<ArrowRight size={16}/></Link>}
    <Sheet open={Boolean(mood)} onClose={closeMood} title={`${mood ?? 'Tonight'}? Sorted.`}><p className="muted">A few contenders for the group. Availability is illustrative.</p>{moodError ? <p className="empty-state">The picks didn’t load. Close this sheet and give it another try.</p> : !picks ? <div className="mood-grid">{[0, 1].map((n) => <div key={n} className="poster skeleton" role="status" aria-label="Loading pick"/>)}</div> : picks.length ? <><div className="mood-grid">{picks.map((title) => <TitleCard key={title.id} title={title} providers={providers} prefs={prefs} onNavigate={closeMood}/>)}</div>{picks.length < 4 && <p className="prototype-note">Just {picks.length} matching {picks.length === 1 ? 'pick' : 'picks'} in this small catalog.</p>}<Button disabled={picks.length < 2} onClick={fillShortlist}>Put these to the group <ArrowRight size={16}/></Button><p className="prototype-note">{picks.length < 2 ? 'A group shortlist needs at least two picks.' : 'Replaces your current shortlist. Poll sharing arrives in a later phase.'}</p></> : <div className="empty-state"><h3>Thoda sa plot twist.</h3><p>No {mood?.toLowerCase()} picks match these preferences yet.</p><Link href="/welcome?edit=services" className="button button-secondary" onClick={closeMood}>Try other languages</Link></div>}</Sheet><Toast message={toast} onClose={closeToast}/>
  </div>;
}

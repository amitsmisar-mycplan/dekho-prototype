'use client';
import { ConnectionStatus } from './connection-status';
import { useCopy } from '@/lib/use-copy';
import { commonCopy } from '@/.generated/copy/common';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Home, Search, Layers2, UserRound, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useBrand } from '@/lib/use-brand';
import { usePrototype } from '@/lib/store';
import { ShortlistContents } from '@/components/shortlist-contents';
import { PosterTransitionProvider } from '@/components/poster-transition';
import { uiSpring } from '@/lib/motion';
import { Sheet } from '@/components/ui';
export function AppShell({ children }: {
    children: ReactNode;
}) {
  const formatCopy = useCopy();
    const brand = useBrand();
    const pathname = usePathname();
    const reduced = useReducedMotion();
    const router = useRouter();
    const hydrated = usePrototype((s) => s.hydrated);
    const completed = usePrototype((s) => s.onboardingComplete);
    const [splashDone, setSplashDone] = useState(false);
    const welcome = pathname === '/welcome';
    const pollCreation = pathname === '/poll/new';
    const detail = /^\/t\/[^/]+$/.test(pathname);
    const publicPoll = pathname.startsWith('/p/');
    const [splash, setSplash] = useState(false);
    const [ready, setReady] = useState(false);
    const shortlistOpen = usePrototype((s) => s.shortlistOpen);
    const setShortlistOpen = usePrototype((s) => s.openShortlist);
    const shortlist = usePrototype((s) => s.shortlist);
    const close = useCallback(() => setShortlistOpen(false), [setShortlistOpen]);
    useEffect(() => {
        let active = true;
        Promise.resolve(usePrototype.persist.rehydrate()).finally(() => {
            if (active) { usePrototype.setState({ hydrated: true }); setReady(true); }
        });
        let show = false;
        try {
            show = !localStorage.getItem('dekho-splash-seen') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            localStorage.setItem('dekho-splash-seen', '1');
        } catch { /* Keep the local experience usable if storage is unavailable. */ }
        setSplash(show);
        const timer = setTimeout(() => { setSplash(false); setSplashDone(true); }, show ? 900 : 0);
        return () => { active = false; clearTimeout(timer); };
    }, []);
    useEffect(() => {
        if (hydrated && splashDone && !completed && !welcome && !publicPoll && !pollCreation) router.replace('/welcome');
    }, [hydrated, splashDone, completed, welcome, publicPoll, pollCreation, router]);
    useEffect(() => { const handler = () => setShortlistOpen(true); window.addEventListener('open-shortlist', handler); return () => window.removeEventListener('open-shortlist', handler); }, [setShortlistOpen]);
    useEffect(() => { document.querySelector('.app-scroll')?.scrollTo({ top: 0 }); }, [pathname]);
    const showContent = hydrated && splashDone && (completed || welcome || publicPoll || pollCreation);
    return <PosterTransitionProvider><MotionConfig reducedMotion="user" transition={uiSpring}><div className="desktop-wall" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <div className={`wall-tile wall-${i % 6}`} key={i}/>)}</div><div className="desktop-note"><span className="wordmark">{brand.name}<span>{formatCopy(commonCopy['separator'])}</span></span><p>{formatCopy(commonCopy['less_scrolling'])}<br />{formatCopy(commonCopy['more_movie_nights'])}</p><span className="desktop-caption">{formatCopy(commonCopy['made_for_your_kind_of_people'])}</span></div><div className="phone-frame"><div className="phone-status" aria-hidden="true"><span>{formatCopy(commonCopy['9_41'])}</span><span className="phone-island"/><span>{formatCopy(commonCopy['separator_2'])}</span></div><div className={`app-scroll ${welcome ? 'welcome-scroll' : ''} ${detail ? 'detail-scroll' : ''}`} inert={splash}><a className="skip-link" href="#main-content">{formatCopy(commonCopy['skip_to_content'])}</a>{!detail && <header className="app-header"><Link className="wordmark" href="/" aria-label={formatCopy(commonCopy['value_home'], { p1: brand.name })}>{brand.name}<span>{formatCopy(commonCopy['separator'])}</span></Link>{welcome ? <span/> : <span className="header-tagline">{formatCopy(commonCopy['kya_dekhein'])}</span>}</header>}<main id="main-content" tabIndex={-1}><ConnectionStatus/>{showContent ? children : <div className="page-content" role="status" aria-label={formatCopy(commonCopy['getting_ready'])}><div className="skeleton" style={{ height: 400, borderRadius: 20 }}/></div>}</main>{!welcome && showContent && <footer><p>{brand.tagline}</p><small>{formatCopy(commonCopy['india_only_built_for_movie_nights'])}</small><small>{formatCopy(commonCopy['original_generated_artwork_this_product_is_not_endorsed_or_certif'])}</small></footer>}</div>{!welcome && !detail && !publicPoll && showContent && <nav className="bottom-nav" aria-label={formatCopy(commonCopy['main_navigation'])} inert={splash}><Link href="/" className={pathname === '/' ? 'active' : ''} aria-current={pathname === '/' ? 'page' : undefined}><Home size={21}/><span>{formatCopy(commonCopy['tonight'])}</span></Link><Link href="/search" className={pathname === '/search' ? 'active' : ''} aria-current={pathname === '/search' ? 'page' : undefined}><Search size={21}/><span>{formatCopy(commonCopy['search'])}</span></Link><button data-shortlist-target onClick={() => setShortlistOpen(true)}><span className="nav-icon"><Layers2 size={21}/>{ready && shortlist.length > 0 && <b>{shortlist.length}</b>}</span><span>{formatCopy(commonCopy['shortlist'])}</span></button><Link href="/me" className={pathname === '/me' ? 'active' : ''} aria-current={pathname === '/me' ? 'page' : undefined}><UserRound size={21}/><span>{formatCopy(commonCopy['me'])}</span></Link></nav>}<Sheet open={shortlistOpen} onClose={close} title={formatCopy(commonCopy['your_tonight_shortlist'])}>{ready && shortlist.length ? <ShortlistContents ids={shortlist} onNavigate={close}/> : <div className="empty-state"><Layers2 size={36}/><h3>{formatCopy(commonCopy['the_best_nights_start_with_a_few_picks'])}</h3><p>{formatCopy(commonCopy['add_a_title_or_try_a_mood_on_tonight'])}</p><Link className="button button-primary" href="/" onClick={close}>{formatCopy(commonCopy['find_tonight_s_picks'])}<ArrowUpRight size={16}/></Link></div>}</Sheet><div id="overlays"/><AnimatePresence>{splash && <motion.div className="splash" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}><motion.div initial={{ scale: .86, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><Sparkles size={26}/><div className="wordmark">{brand.name}<span>{formatCopy(commonCopy['separator'])}</span></div><p>{brand.tagline}</p></motion.div></motion.div>}</AnimatePresence></div><div className="desktop-bottom">{formatCopy(commonCopy['a_small_screen_a_big_night'])}<span>{formatCopy(commonCopy['good_company_great_stories'])}</span></div></MotionConfig></PosterTransitionProvider>;
}

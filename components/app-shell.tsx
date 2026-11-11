'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Home, Search, Layers2, UserRound, ArrowUpRight, Film, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { brand } from '@/lib/brand';
import { usePrototype } from '@/lib/store';
import { Button, Sheet } from '@/components/ui';
export function AppShell({ children }: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const reduced = useReducedMotion();
    const [splash, setSplash] = useState(false);
    const [ready, setReady] = useState(false);
    const [shortlistOpen, setShortlistOpen] = useState(false);
    const shortlist = usePrototype((s) => s.shortlist);
    const toggle = usePrototype((s) => s.toggleShortlist);
    const close = useCallback(() => setShortlistOpen(false), []);
    useEffect(() => { setReady(true); try {
        if (localStorage.getItem('dekho-splash-seen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        localStorage.setItem('dekho-splash-seen', '1');
        setSplash(true);
        const t = setTimeout(() => setSplash(false), 900);
        return () => clearTimeout(t);
    }
    catch { /* Storage may be disabled in private browsers. */ } }, []);
    return <MotionConfig reducedMotion="user"><div className="desktop-wall" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <div className={`wall-tile wall-${i % 6}`} key={i}/>)}</div><div className="desktop-note"><span className="wordmark">{brand.name}<span>.</span></span><p>Less scrolling.<br />More movie nights.</p><span className="desktop-caption">MADE FOR YOUR KIND OF PEOPLE</span></div><div className="phone-frame"><div className="phone-status" aria-hidden="true"><span>9:41</span><span className="phone-island"/><span>▴ ▰</span></div><div className="app-scroll" inert={splash}><a className="skip-link" href="#main-content">Skip to content</a><header className="app-header"><Link className="wordmark" href="/" aria-label={`${brand.name} home`}>{brand.name}<span>.</span></Link><Link href="/kit" className="build-badge"><span />THE PREVIEW<ArrowUpRight size={12}/></Link></header><main id="main-content" tabIndex={-1}>{children}</main><footer><p>{brand.tagline}</p><small>India only · Built for movie nights</small><small>TMDb attribution: This product uses the TMDb API but is not endorsed or certified by TMDb. P0 uses original placeholder artwork, no TMDb data.</small><Link href="/kit">Explore the design kit <ArrowUpRight size={12}/></Link></footer></div><nav className="bottom-nav" aria-label="Main navigation" inert={splash}><Link href="/" className={pathname === '/' ? 'active' : ''} aria-current={pathname === '/' ? 'page' : undefined}><Home size={21}/><span>Tonight</span></Link><Link href="/search" className={pathname === '/search' ? 'active' : ''} aria-current={pathname === '/search' ? 'page' : undefined}><Search size={21}/><span>Search</span></Link><button onClick={() => setShortlistOpen(true)}><span className="nav-icon"><Layers2 size={21}/>{ready && shortlist.length > 0 && <b>{shortlist.length}</b>}</span><span>Shortlist</span></button><Link href="/me" className={pathname === '/me' ? 'active' : ''} aria-current={pathname === '/me' ? 'page' : undefined}><UserRound size={21}/><span>Me</span></Link></nav><Sheet open={shortlistOpen} onClose={close} title="Your tonight shortlist">{ready && shortlist.length ? <><p className="muted">Sample picks from the design kit. Up to four, zero endless debates.</p>{shortlist.map((id) => <div className="shortlist-row" key={id}><Film size={20}/><strong>{id}</strong><Button variant="ghost" onClick={() => toggle(id)}>Remove</Button></div>)}<p className="prototype-note">Poll creation arrives in a later build.</p></> : <div className="empty-state"><Layers2 size={36}/><h3>The best nights start with a few picks.</h3><p>Add a sample poster from the kit to try the tray.</p><Link className="button button-primary" href="/kit" onClick={close}>Explore the kit <ArrowUpRight size={16}/></Link></div>}</Sheet><div id="overlays"/><AnimatePresence>{splash && <motion.div className="splash" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}><motion.div initial={{ scale: .86, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><Sparkles size={26}/><div className="wordmark">{brand.name}<span>.</span></div><p>{brand.tagline}</p></motion.div></motion.div>}</AnimatePresence></div><div className="desktop-bottom">A SMALL SCREEN. A BIG NIGHT.<span>PROTOTYPE / 001</span></div></MotionConfig>;
}

'use client';
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import type { Title } from '@/lib/data';
import { PosterCard } from '@/components/ui';
type Rect = { left: number; top: number; width: number; height: number };
type Flight = { title: Title; from: Rect; to?: Rect };
const Context = createContext<{ begin: (title: Title, element: HTMLElement) => void; land: (id: string, element: HTMLElement) => void; flyingId?: string }>({ begin: () => {}, land: () => {} });
const bounds = (element: HTMLElement): Rect => { const { left, top, width, height } = element.getBoundingClientRect(); return { left, top, width, height }; };
export function PosterTransitionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion(); const [flight, setFlight] = useState<Flight | null>(null);
  const begin = useCallback((title: Title, element: HTMLElement) => { if (!reduced) setFlight({ title, from: bounds(element) }); }, [reduced]);
  const land = useCallback((id: string, element: HTMLElement) => { const to = bounds(element); setFlight((f) => f?.title.id === id && !f.to ? { ...f, to } : f); }, []);
  useEffect(() => { if (!flight) return; const timer = setTimeout(() => setFlight(null), 1800); return () => clearTimeout(timer); }, [flight]);
  return <Context.Provider value={{ begin, land, flyingId: flight?.title.id }}>{children}{flight && typeof document !== 'undefined' && createPortal(<motion.div aria-hidden="true" className="poster-flight" initial={flight.from} animate={flight.to ?? flight.from} transition={{ duration: .42, ease: [.22, 1, .36, 1] }} onAnimationComplete={() => { if (flight.to) setFlight(null); }}><PosterCard catalogTitle={flight.title} title={flight.title.title} palette={flight.title.palette} posterPath={flight.title.posterPath} eyebrow={String(flight.title.year)}/></motion.div>, document.body)}</Context.Provider>;
}
export function PosterLink({ title, children, className = '', onNavigate }: { title: Title; children: ReactNode; className?: string; onNavigate?: () => void }) {
  const { begin } = useContext(Context);
  return <Link href={`/t/${title.slug}`} className={className} aria-label={`View ${title.title}`} onClick={(event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const element = event.currentTarget.querySelector<HTMLElement>('[data-poster], .poster') ?? event.currentTarget;
    begin(title, element); onNavigate?.();
  }}>{children}</Link>;
}
export function DestinationPoster({ title }: { title: Title }) {
  const ref = useRef<HTMLDivElement>(null); const { land, flyingId } = useContext(Context);
  useLayoutEffect(() => { ref.current?.closest('.app-scroll')?.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); }, [title.id]);
  useEffect(() => { if (ref.current && flyingId === title.id) land(title.id, ref.current); }, [land, flyingId, title.id]);
  return <div ref={ref} className="detail-poster" style={{ opacity: flyingId === title.id ? 0 : 1 }}><PosterCard catalogTitle={title} title={title.title} palette={title.palette} posterPath={title.posterPath} eyebrow={`${title.year} · ${title.originalLanguage}`}/></div>;
}

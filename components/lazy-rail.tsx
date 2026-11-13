'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
/** Keep offscreen poster SVGs out of the first render, with a fixed-size rail placeholder. */
export function LazyRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null), [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { rootMargin: '200px' });
    observer.observe(ref.current); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="lazy-rail">{visible ? children : <div className="movie-rail" role="status" aria-label="Loading picks">{[0, 1, 2].map((n) => <div key={n} className="movie-card"><div className="poster skeleton"/><div className="rail-label-placeholder"/></div>)}</div>}</div>;
}

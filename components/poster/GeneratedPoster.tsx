'use client';
import { useId, useEffect, useRef, useState } from 'react';
import { GeneratedPosterSvg, type PosterArtProps } from './PosterArtwork';
export function GeneratedPoster(props: PosterArtProps) {
  const id = useId().replace(/:/g, ''); const ref = useRef<HTMLDivElement>(null); const [width, setWidth] = useState<number>();
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new ResizeObserver(([entry]) => { if (entry.contentRect.width > 0) setWidth(entry.contentRect.width); }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div className={`generated-art-wrap generated-art-wrap-${props.variant ?? 'poster'}`} ref={ref}><GeneratedPosterSvg {...props} renderedWidth={width} definitionId={id}/></div>;
}

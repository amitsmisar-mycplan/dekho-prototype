'use client';
import { useCopy } from '@/lib/use-copy';
import { shortlistCopy } from '@/.generated/copy/shortlist';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { usePrototype } from '@/lib/store';
import { track } from '@/lib/analytics';
import type { Title } from '@/lib/data';
import { PosterCard } from '@/components/ui';
export function ShortlistButton({ title, compact = false, hero = false }: { title: Title; compact?: boolean; hero?: boolean }) {
  const formatCopy = useCopy();
  const shortlist = usePrototype((s) => s.shortlist); const reduced = useReducedMotion();
  const [notice, setNotice] = useState('');
  const [flight, setFlight] = useState<{ x: number; y: number; toX: number; toY: number } | null>(null);
  const added = shortlist.includes(title.id);
  useEffect(() => { if (!flight) return; const timer = setTimeout(() => setFlight(null), 800); return () => clearTimeout(timer); }, [flight]);
  return <><button className={`button shortlist-action ${compact ? 'quick-add' : 'button-primary'} ${hero ? 'hero-shortlist' : ''}`} aria-label={compact ? `${added ? formatCopy(shortlistCopy['remove']) : formatCopy(shortlistCopy['shortlist'])} ${title.title}` : undefined} aria-pressed={added} onClick={(event) => {
    if (!added && usePrototype.getState().requestShortlist(title.id) === 'full') { setNotice(formatCopy(shortlistCopy['4_is_plenty_yaar'])); return; }
    if (added) usePrototype.getState().toggleShortlist(title.id); setNotice(added ? formatCopy(shortlistCopy['removed']) : formatCopy(shortlistCopy['added_to_shortlist']));
    if (!added) {
      track('shortlist_add', { titleId: title.id, source: hero ? 'hero' : 'title' });
      const destination = document.querySelector('[data-shortlist-target] .nav-icon');
      if (!reduced && destination) { const from = event.currentTarget.getBoundingClientRect(), to = destination.getBoundingClientRect(); setFlight({ x: from.left + from.width / 2 - 22, y: from.top, toX: to.left - 10, toY: to.top - 22 }); }
    }
  }}>{added ? <Check size={18}/> : <Plus size={18}/>} {!compact && (added ? formatCopy(shortlistCopy['shortlisted']) : hero ? formatCopy(shortlistCopy['shortlist']) : formatCopy(shortlistCopy['add_to_shortlist']))}</button>
    <span className={notice.includes('full') ? 'shortlist-full' : 'sr-only'} role="status">{notice}</span>
    {flight && createPortal(<motion.div className="tray-flight" aria-hidden="true" initial={{ x: flight.x, y: flight.y, scale: 1, opacity: 1 }} animate={{ x: flight.toX, y: flight.toY, scale: .25, opacity: .2 }} transition={{ duration: .65, ease: [.25, .1, .3, 1] }} onAnimationComplete={() => setFlight(null)}><PosterCard catalogTitle={title} title={title.title} palette={title.palette} posterPath={title.posterPath}/></motion.div>, document.body)}
  </>;
}

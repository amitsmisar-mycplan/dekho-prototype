'use client';
import { uiSpring } from '@/lib/motion';
import { useState } from 'react';
import { motion, useAnimationControls, useMotionValue, useTransform, useReducedMotion } from 'motion/react';
import { Bookmark, Plus, X } from 'lucide-react';
import { Button, PosterCard, Sheet } from '@/components/ui';
import type { SimilarTitle } from '@/lib/data';
import { usePrototype } from '@/lib/store';
import { deckIntent, type DeckAction } from '@/lib/shortlist';
import { track } from '@/lib/analytics';
function DeckCard({ item, onChoice }: { item: SimilarTitle; onChoice: (action: DeckAction) => void }) {
  const x = useMotionValue(0), y = useMotionValue(0), rotate = useTransform(x, [-250, 250], [-20, 20]);
  const addOpacity = useTransform(x, [0, 90], [0, 1]), skipOpacity = useTransform(x, [-90, 0], [1, 0]), saveOpacity = useTransform(y, [-90, 0], [1, 0]);
  const controls = useAnimationControls(), reduced = useReducedMotion(); const [busy, setBusy] = useState(false);
  async function choose(action: DeckAction) {
    if (busy) return; setBusy(true);
    await controls.start({ x: action === 'add' ? 450 : action === 'skip' ? -450 : 0, y: action === 'watchlist' ? -600 : 0, opacity: 0, transition: { duration: reduced ? 0 : .22 } });
    onChoice(action);
  }
  return <><div className="deck-stage"><motion.div className="deck-card" style={{ x, y, rotate: reduced ? 0 : rotate }} animate={controls} drag={!busy} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={.85} onDragEnd={(_, info) => { const action = deckIntent(info.offset.x, info.offset.y); if (action) void choose(action); }} transition={uiSpring}><PosterCard title={item.title.title} catalogTitle={item.title}/><motion.span className="deck-stamp stamp-add" style={{ opacity: addOpacity }} aria-hidden="true">SHORTLIST</motion.span><motion.span className="deck-stamp stamp-skip" style={{ opacity: skipOpacity }} aria-hidden="true">SKIP</motion.span><motion.span className="deck-stamp stamp-save" style={{ opacity: saveOpacity }} aria-hidden="true">WATCHLIST</motion.span></motion.div></div><h3 className="deck-title">{item.title.title}</h3><p className="deck-because">{item.because}</p><div className="deck-buttons"><button disabled={busy} onClick={() => void choose('skip')}><X size={22}/>Skip</button><button disabled={busy} onClick={() => void choose('watchlist')}><Bookmark size={22}/>Watchlist</button><button disabled={busy} onClick={() => void choose('add')}><Plus size={22}/>Shortlist</button></div></>;
}
export function DiscoveryDeck({ items, onClose }: { items: SimilarTitle[]; onClose: () => void }) {
  const [index, setIndex] = useState(0); const shortlist = usePrototype((s) => s.shortlist); const [message, setMessage] = useState('');
  const item = items.slice(index).find((entry) => !shortlist.includes(entry.title.id)); const full = shortlist.length >= 4;
  function choice(action: DeckAction) {
    if (!item) return;
    const state = usePrototype.getState();
    if (action === 'add' && state.requestShortlist(item.title.id) === 'added') { track('shortlist_add', { titleId: item.title.id, source: 'swipe-deck' }); setMessage('Added to tonight.'); }
    if (action === 'watchlist') { if (!state.watchlist.includes(item.title.id)) state.toggleWatchlist(item.title.id); setMessage('Saved for another night.'); }
    if (action === 'skip') setMessage('Next possibility.');
    setIndex(items.indexOf(item) + 1);
  }
  return <Sheet open onClose={onClose} title="Find your next pick" fullScreen><p className="deck-instructions">Right to shortlist · left to skip · up to save</p><p className="deck-count">{shortlist.length} / 4 shortlisted</p>{full || !item ? <div className="deck-done"><h3>{full ? 'Four picks. One great night.' : 'That’s the deck, yaar.'}</h3><p>{full ? 'Your shortlist is ready for the group.' : 'Try another title for a fresh set of matches.'}</p><Button onClick={() => { onClose(); usePrototype.getState().openShortlist(true); }}>Review shortlist</Button></div> : <DeckCard key={item.title.id} item={item} onChoice={choice}/>}<p role="status" className="sr-only">{message}</p></Sheet>;
}

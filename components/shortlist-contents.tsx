'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Reorder, motion, useDragControls, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUp, GripVertical, Trash2 } from 'lucide-react';
import { dataSource, type Title } from '@/lib/data';
import { usePrototype } from '@/lib/store';
import { Button, PosterCard, Toast } from '@/components/ui';
import { track } from '@/lib/analytics';
function TrayCard({ id, title, index, count, pending, onNavigate }: { id: string; title?: Title; index: number; count: number; pending: string | null; onNavigate: () => void }) {
  const controls = useDragControls(); const reduced = useReducedMotion();
  const remove = () => usePrototype.getState().toggleShortlist(id);
  function move(delta: number) { const ids = [...usePrototype.getState().shortlist]; [ids[index], ids[index + delta]] = [ids[index + delta], ids[index]]; usePrototype.getState().reorderShortlist(ids); }
  return <Reorder.Item value={id} dragListener={false} dragControls={controls} className="tray-item" transition={reduced ? { duration: 0 } : undefined}>
    <motion.div className="tray-swipe" drag={pending ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={.7} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90) remove(); }}>
      {title ? <Link href={`/t/${title.slug}`} onClick={onNavigate}><PosterCard title={title.title} catalogTitle={title}/></Link> : <div className="poster skeleton" aria-label="Loading title"/>}
      <div className="tray-card-copy"><h3>{title?.title ?? id}</h3><p>{title ? `${title.year} · ${title.originalLanguage}` : 'Catalog pick'}</p>
        {pending ? <Button onClick={() => { usePrototype.getState().swapShortlist(id); track('shortlist_add', { titleId: pending, source: 'swap', replacedId: id }); }}>Swap this one</Button> : <div className="tray-tools"><button className="icon-button drag-grip" aria-label={`Drag to reorder ${title?.title ?? id}`} onPointerDown={(event) => { event.stopPropagation(); controls.start(event); }}><GripVertical size={19}/></button><button className="icon-button" disabled={index === 0} aria-label={`Move ${title?.title ?? id} up`} onClick={() => move(-1)}><ArrowUp size={17}/></button><button className="icon-button" disabled={index === count - 1} aria-label={`Move ${title?.title ?? id} down`} onClick={() => move(1)}><ArrowDown size={17}/></button><button className="icon-button" aria-label={`Remove ${title?.title ?? id}`} onClick={remove}><Trash2 size={17}/></button></div>}
      </div>
    </motion.div>
  </Reorder.Item>;
}
export function ShortlistContents({ ids, onNavigate }: { ids: string[]; onNavigate: () => void }) {
  const [error, setError] = useState(false), [retry, setRetry] = useState(0);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [titles, setTitles] = useState<Title[]>([]); const pending = usePrototype((s) => s.pendingSwap);
  const dismissToast = useCallback(() => setDismissed(pending), [pending]);
  useEffect(() => { let active = true; dataSource.listTitles().then((items) => { if (active) { setTitles(items); setError(false); } }).catch(() => { if (active) setError(true); }); return () => { active = false; }; }, [retry]);
  const valid = ids.every((id) => titles.some((t) => t.id === id));
  if (error) return <div className="empty-state"><h3>Your picks need another take.</h3><p>We couldn’t load the shortlist.</p><Button onClick={() => { setError(false); setRetry((n) => n + 1); }}>Try again</Button></div>;
  return <><Toast message={pending && dismissed !== pending ? '4 is plenty, yaar' : ''} onClose={dismissToast}/>{pending ? <div className="swap-notice"><p role="status">4 is plenty, yaar</p><h3>Which pick should {titles.find((t) => t.id === pending)?.title ?? 'the new title'} replace?</h3><button className="text-action" onClick={() => usePrototype.getState().cancelSwap()}>Keep my four</button></div> : <p className="muted">Drag the grip to reorder. Swipe a card sideways to remove.</p>}
    <Reorder.Group axis="y" values={ids} onReorder={(items) => usePrototype.getState().reorderShortlist(items)} className="tray-cards">{ids.map((id, index) => <TrayCard key={id} id={id} title={titles.find((t) => t.id === id)} index={index} count={ids.length} pending={pending} onNavigate={onNavigate}/>)}</Reorder.Group>
    {!pending && <div className="tray-cta">{ids.length >= 2 && valid ? <Link className="button button-primary" href="/poll/new" onClick={onNavigate}>Ask the group</Link> : <Button disabled>Pick at least 2 titles</Button>}<p className="prototype-note">{!valid && titles.length ? 'Remove sample picks and choose catalog titles to start a poll.' : `${ids.length} of 4 picks. Everyone gets a say.`}</p></div>}
  </>;
}

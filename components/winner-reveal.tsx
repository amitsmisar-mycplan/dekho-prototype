'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, Flame, Share2 } from 'lucide-react';
import type { Poll } from '@/lib/polls';
import { yesSummary, type scorePoll } from '@/lib/polls/results';
import { resultCard, encodeResult, type ResultCard } from '@/lib/polls/result-card';
import type { PollOption } from './poll-room';
import { track } from '@/lib/analytics';
import { useBrand } from '@/lib/use-brand';
export default function WinnerReveal({ poll, options, winner, scores, streak, onClose, sharedCard }: { poll: Poll; options: PollOption[]; winner: PollOption; scores: ReturnType<typeof scorePoll>; streak: number; onClose: () => void; sharedCard?: ResultCard }) {
  const brand = useBrand();
  const [phase, setPhase] = useState<'drumroll' | 'winner'>('drumroll'), [busy, setBusy] = useState(false), [notice, setNotice] = useState(''), [downloads, setDownloads] = useState<{ wide: string; story: string } | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const files = useRef<File[]>([]), urls = useRef<string[]>([]), closeButton = useRef<HTMLButtonElement>(null), overlay = useRef<HTMLDialogElement>(null);
  const card = sharedCard ?? resultCard(poll), payload = encodeResult(card), winnerScore = scores.find((s) => s.id === winner.id)!;
  useEffect(() => {
    track('result_view', { pollId: poll.id, screen: 'winner' });
    const createdUrls = urls.current; let active = true; let stopConfetti: (() => void) | undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    overlay.current?.showModal(); closeButton.current?.focus();
    if (reduced) setPhase('winner');
    const timer = setTimeout(() => { setPhase('winner'); if (!reduced) void import('canvas-confetti').then(({ default: confetti }) => { if (active && canvas.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const burst = confetti.create(canvas.current, { resize: true }); stopConfetti = burst.reset; void burst({ particleCount: 90, spread: 75, origin: { y: .65 }, colors: [brand.colors.marigold, brand.colors.pink, brand.colors.teal], disableForReducedMotion: true }); } }); }, reduced ? 0 : 1100);
    return () => { active = false; clearTimeout(timer); stopConfetti?.(); createdUrls.forEach((url) => URL.revokeObjectURL(url)); };
  }, [poll.id, brand.colors.marigold, brand.colors.pink, brand.colors.teal]);
  async function share() {
    setBusy(true); setNotice('');
    try {
      if (!files.current.length) {
        const blobs = await Promise.all(['wide', 'story'].map(async (format) => { const response = await fetch(`/p/${poll.id}/result-image?format=${format}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(card) }); if (!response.ok) throw new Error('Could not render the cards. Please try again.'); return response.blob(); }));
        files.current = blobs.map((blob, i) => new File([blob], i ? 'movie-night-story.png' : 'movie-night-result.png', { type: 'image/png' }));
        urls.current.push(...blobs.map((blob) => URL.createObjectURL(blob))); setDownloads({ wide: urls.current[0], story: urls.current[1] });
      }
      if (navigator.canShare?.({ files: files.current })) { await navigator.share({ title: `Tonight: ${winner.title}`, text: `${poll.name} — the group has decided.`, files: files.current }); track('poll_share', { pollId: poll.id, method: 'result-files' }); }
      else setNotice('Cards ready. Download a size, or share the result link on WhatsApp.');
    } catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) setNotice(e instanceof Error ? e.message : 'Cards ready below. Tap Share result again to open your share sheet.'); }
    finally { setBusy(false); }
  }
  const link = typeof window === 'undefined' ? '' : `${window.location.origin}/p/${poll.id}/result?result=${payload}`;
  return <dialog ref={overlay} className={`winner-reveal ${phase}`} onCancel={(e) => { e.preventDefault(); onClose(); }} aria-label={`Tonight: ${winner.title}`}><canvas ref={canvas} className="winner-confetti" aria-hidden="true"/><div className="winner-inner"><button ref={closeButton} className="winner-close" aria-label="Close winner reveal" onClick={onClose}><X size={22}/></button>
    {phase === 'drumroll' ? <div className="drumroll"><div/><p>And tonight goes to…</p></div> : <>
      <p className="eyebrow">THE GROUP HAS SPOKEN</p><div className="winner-poster">{winner.poster}</div><h1>Tonight:<br/>{winner.title}</h1><p className="winner-score">{yesSummary(winnerScore.up, winnerScore.down)}</p>
      {winner.provider && <a className="winner-watch" style={{ background: winner.provider.color }} href={winner.provider.url} target="_blank" rel="noopener noreferrer" onClick={() => track('watch_click', { titleId: winner.id, provider: winner.provider!.name, pollId: poll.id })}>Watch on {winner.provider.name}<ArrowUpRight size={19}/></a>}
      <p className="vote-fineprint">Availability is illustrative.{winner.provider?.type === 'rent' || winner.provider?.type === 'buy' ? ' Separate payment may apply.' : ''}</p>
      {streak > 1 && <p className="group-streak"><Flame size={20}/>{streak} movie nights picked together</p>}
      <div className="winner-takes">{winnerScore.takes.map((take, i) => <blockquote key={i}>“{take.take}”<cite>{take.name}</cite></blockquote>)}</div>
      <button className="button button-primary" onClick={() => void share()} disabled={busy}><Share2 size={18}/>{busy ? 'Making your cards…' : 'Share result'}</button>
      {downloads && <div className="result-downloads"><a href={downloads.wide} download="movie-night-result.png">Download 1200×630</a><a href={downloads.story} download="movie-night-story.png">Download 1080×1920 story</a><a href={`https://wa.me/?text=${encodeURIComponent(`Tonight: ${winner.title}. ${poll.name} — ${link}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => track('poll_share', { pollId: poll.id, method: 'result-whatsapp' })}>Share result on WhatsApp</a><small>WhatsApp shares the link. Attach a downloaded image if you want the card too.</small></div>}
      <p className="vote-notice" role="status">{notice}</p><div className="winner-others"><h2>The other contenders</h2>{scores.filter((s) => s.id !== winner.id).map((s) => <p key={s.id}>{options.find((o) => o.id === s.id)?.title}<span>{s.up} up · {s.down} down</span></p>)}</div>
    </>}
  </div></dialog>;
}

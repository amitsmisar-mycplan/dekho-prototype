'use client';
import { formatCopy } from '@/lib/copy';
import { resultsCopy } from '@/.generated/copy/results';

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
        const blobs = await Promise.all(['wide', 'story'].map(async (format) => { const response = await fetch(`/p/${poll.id}/result-image?format=${format}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(card) }); if (!response.ok) throw new Error(formatCopy(resultsCopy['could_not_render_the_cards_please_try_again'])); return response.blob(); }));
        files.current = blobs.map((blob, i) => new File([blob], i ? 'movie-night-story.png' : 'movie-night-result.png', { type: 'image/png' }));
        urls.current.push(...blobs.map((blob) => URL.createObjectURL(blob))); setDownloads({ wide: urls.current[0], story: urls.current[1] });
      }
      if (navigator.canShare?.({ files: files.current })) { await navigator.share({ title: formatCopy(resultsCopy['tonight_value'], { p1: winner.title }), text: formatCopy(resultsCopy['value_the_group_has_decided'], { p1: poll.name }), files: files.current }); track('poll_share', { pollId: poll.id, method: 'result-files' }); }
      else setNotice(formatCopy(resultsCopy['cards_ready_download_a_size_or_share_the_result_link_on_whatsapp']));
    } catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) setNotice(e instanceof Error ? e.message : formatCopy(resultsCopy['cards_ready_below_tap_share_result_again_to_open_your_share_sheet'])); }
    finally { setBusy(false); }
  }
  const link = typeof window === 'undefined' ? '' : `${window.location.origin}/p/${poll.id}/result?result=${payload}`;
  return <dialog ref={overlay} className={`winner-reveal ${phase}`} onCancel={(e) => { e.preventDefault(); onClose(); }} aria-label={formatCopy(resultsCopy['tonight_value'], { p1: winner.title })}><canvas ref={canvas} className="winner-confetti" aria-hidden="true"/><div className="winner-inner"><button ref={closeButton} className="winner-close" aria-label={formatCopy(resultsCopy['close_winner_reveal'])} onClick={onClose}><X size={22}/></button>
    {phase === 'drumroll' ? <div className="drumroll"><div/><p>{formatCopy(resultsCopy['and_tonight_goes_to'])}</p></div> : <>
      <p className="eyebrow">{formatCopy(resultsCopy['the_group_has_spoken'])}</p><div className="winner-poster">{winner.poster}</div><h1>{formatCopy(resultsCopy['tonight_2'])}<br/>{winner.title}</h1><p className="winner-score">{yesSummary(winnerScore.up, winnerScore.down)}</p>
      {winner.provider && <a className="winner-watch" style={{ background: winner.provider.color }} href={winner.provider.url} target="_blank" rel="noopener noreferrer" onClick={() => track('watch_click', { titleId: winner.id, provider: winner.provider!.name, pollId: poll.id })}>{formatCopy(resultsCopy['watch_on'])}{winner.provider.name}<ArrowUpRight size={19}/></a>}
      <p className="vote-fineprint">{formatCopy(resultsCopy['availability_is_illustrative'])}{winner.provider?.type === 'rent' || winner.provider?.type === 'buy' ? formatCopy(resultsCopy['separate_payment_may_apply']) : ''}</p>
      {streak > 1 && <p className="group-streak"><Flame size={20}/>{formatCopy(resultsCopy['group_streak'], { group: poll.groupName || formatCopy(resultsCopy['your_group']), count: streak })}</p>}
      <div className="winner-takes">{winnerScore.takes.map((take, i) => <blockquote key={i}>{formatCopy(resultsCopy['separator_3'])}{take.take}{formatCopy(resultsCopy['separator_2'])}<cite>{take.name}</cite></blockquote>)}</div>
      <button className="button button-primary" onClick={() => void share()} disabled={busy}><Share2 size={18}/>{busy ? formatCopy(resultsCopy['making_your_cards']) : formatCopy(resultsCopy['share_result'])}</button>
      {downloads && <div className="result-downloads"><a href={downloads.wide} download="movie-night-result.png">{formatCopy(resultsCopy['download_1200_630'])}</a><a href={downloads.story} download="movie-night-story.png">{formatCopy(resultsCopy['download_1080_1920_story'])}</a><a href={`https://wa.me/?text=${encodeURIComponent(`Tonight: ${winner.title}. ${poll.name} — ${link}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => track('poll_share', { pollId: poll.id, method: 'result-whatsapp' })}>{formatCopy(resultsCopy['share_result_on_whatsapp'])}</a><small>{formatCopy(resultsCopy['whatsapp_shares_the_link_attach_a_downloaded_image_if_you_want_th'])}</small></div>}
      <p className="vote-notice" role="status">{notice}</p><div className="winner-others"><h2>{formatCopy(resultsCopy['the_other_contenders'])}</h2>{scores.filter((s) => s.id !== winner.id).map((s) => <p key={s.id}>{options.find((o) => o.id === s.id)?.title}<span>{s.up} {formatCopy(resultsCopy['up'])}{s.down} {formatCopy(resultsCopy['down'])}</span></p>)}</div>
    </>}
  </div></dialog>;
}

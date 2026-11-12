'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown, Flame, ArrowUpRight, Copy } from 'lucide-react';
import { pollStore, pollPath, type PollSnapshot, type Poll } from '@/lib/polls';
import { voterIdentity, saveVoterName } from '@/lib/polls/identity';
import { countdown, scorePoll, voterCount, type Rating } from '@/lib/polls/results';
import { track } from '@/lib/analytics';
import { brand } from '@/lib/brand';
const WinnerReveal = dynamic(() => import('./winner-reveal'), { ssr: false });
export interface PollOption { id: string; title: string; language: string; runtime: string; rating: number; provider: { name: string; color: string; url: string; type: string } | null; poster: ReactNode }
export function PollRoom({ id, snapshot, options, result = false, demo = false }: { id: string; snapshot: PollSnapshot | null; options: PollOption[]; result?: boolean; demo?: boolean }) {
  const [poll, setPoll] = useState<Poll | null>(snapshot ? { ...snapshot, votes: {}, expectedVoters: 0 } : null);
  const [ready, setReady] = useState(false), [notice, setNotice] = useState(''), [now, setNow] = useState(0), [identity, setIdentity] = useState({ id: '', name: '' });
  const [pending, setPending] = useState<{ titleId: string; rating: Rating } | null>(null), [name, setName] = useState(''), [takes, setTakes] = useState<Record<string, string>>({});
  const [streak, setStreak] = useState(0), [simulating, setSimulating] = useState(false), [dismissed, setDismissed] = useState(false), [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), timers = useRef<ReturnType<typeof setTimeout>[]>([]), busyRef = useRef(false);
  useEffect(() => {
    const pendingTimers = timers.current; let active = true; setNow(Date.now());
    try { const who = voterIdentity(); setIdentity(who); setName(who.name); } catch { setNotice('Allow browser storage to vote in this prototype.'); }
    const refresh = async () => {
      try { const value = await pollStore.getPoll(id) ?? (snapshot ? await pollStore.importPoll(snapshot, options.map((o) => o.id)) : null); if (active) { setPoll(value); setStreak(await pollStore.getStreak(id)); } }
      catch { if (active) setNotice('This poll could not be saved. Check browser storage.'); }
      finally { if (active) setReady(true); }
    };
    void refresh(); const off = pollStore.subscribe(() => { void refresh(); }); const timer = setInterval(() => setNow(Date.now()), 1000);
    if (result) track('result_view', { pollId: id });
    return () => { active = false; off(); clearInterval(timer); pendingTimers.forEach(clearTimeout); };
  }, [id, snapshot, options, result]);
  useEffect(() => { if (pending) dialog.current?.showModal(); else dialog.current?.close(); }, [pending]);
  const closed = Boolean(poll && (poll.closedAt || (now && now >= Date.parse(poll.deadline))));
  useEffect(() => { if (closed) void pollStore.getStreak(id).then(setStreak); }, [closed, id]);
  if (!poll) return <div className="vote-page"><h1>{ready ? 'This link needs its picks.' : 'Getting the picks…'}</h1><p>{notice || 'Open the complete link your friend shared.'}</p><Link prefetch={false} href="/">Back to tonight</Link></div>;
  const picks = poll.titleIds.flatMap((id) => options.find((o) => o.id === id) ?? []), scores = scorePoll(poll, Object.fromEntries(picks.map((p) => [p.id, p.rating])));
  const count = voterCount(poll), own = poll.ballots?.[identity.id], voted = Boolean(own), creator = poll.creator?.id === identity.id;
  const winner = count ? picks.find((p) => p.id === scores[0]?.id) : undefined;
  async function submit(titleId: string, rating: Rating, voterName = identity.name) {
    if (!voterName.trim()) { setPending({ titleId, rating }); return; }
    if (busyRef.current) return; busyRef.current = true; setBusy(true);
    try { const who = saveVoterName(voterName); setIdentity(who); await pollStore.rateTitle(id, who.id, who.name, titleId, rating); track('vote_cast', { pollId: id, titleId, score: rating.score }); setNotice('Vote saved. You can rate the other picks too.'); setPending(null); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'Could not save. Try again.'); }
    finally { busyRef.current = false; setBusy(false); }
  }
  async function callIt() { try { await pollStore.closePoll(id, identity.id); setDismissed(false); } catch (e) { setNotice(e instanceof Error ? e.message : 'Could not close this poll.'); } }
  function simulate() {
    if (!demo || simulating || closed) return; setSimulating(true);
    const friends = [{ name: 'Riya', take: 'Seen it, total paisa vasool' }, { name: 'Kabir', take: 'Perfect for tonight. Snacks on me.' }, { name: 'Meera', take: 'This gets my double yes.' }, { name: 'Arjun', take: 'Great cast. Let’s watch together.' }];
    const runId = crypto.randomUUID();
    friends.forEach((friend, i) => { timers.current.push(setTimeout(() => { void (async () => {
      try { for (const [j, pick] of picks.entries()) { const score = j === 0 || (i + j) % 3 ? 1 : -1; await pollStore.rateTitle(id, `demo-${runId}-${i}`, friend.name, pick.id, { score, take: j === 0 ? friend.take : j === 1 ? 'Maybe another night?' : '' }); track('vote_cast', { pollId: id, titleId: pick.id, score, demo: true }); } }
      catch { setNotice('Voting closed before the demo finished.'); }
      finally { if (i === friends.length - 1) setSimulating(false); }
    })(); }, (i + 1) * 1500)); });
  }
  const voteLink = pollPath(poll), resultsLink = pollPath(poll, true);
  return <div className="vote-page">
    <header className="vote-header"><Link prefetch={false} href="/" className="wordmark" aria-label={`${brand.name} home`}>{brand.name}<span>.</span></Link><span className="vote-countdown" role="timer">{closed ? 'Voting closed' : now ? countdown(poll.deadline, now) : 'Vote before the deadline'}</span></header>
    <p className="vote-invite">{result || closed ? `${poll.creator?.name ?? 'Your friend'}’s group movie night` : `${poll.creator?.name ?? 'Your friend'} wants to watch something. Vote!`}</p><h1>{poll.name}</h1>{poll.note && <p className="muted">{poll.note}</p>}
    {!result && !closed && <p className="vote-instruction">Thumbs up for yes. Down for not tonight.</p>}
    {(result || voted || closed) && <section className="vote-race" aria-label="Live tally"><div className="vote-race-heading"><h2>{closed ? 'The group has spoken' : count ? 'The race is on' : 'Waiting for votes…'}</h2><span>{count} {count === 1 ? 'friend' : 'friends'}</span></div>
      {scores.map((s, i) => { const title = picks.find((p) => p.id === s.id); return <div className="race-row" key={s.id}><div><span>{title?.title}</span><strong>{s.up} up · {s.down} down</strong></div><div className="race-track"><div className={`race-fill race-${i}`} style={{ width: `${count ? s.up / count * 100 : 0}%` }}/></div><small>Net {s.score > 0 ? '+' : ''}{s.score}</small></div>; })}
      <div className="voter-avatars" aria-label="Who voted">{Object.entries(poll.ballots ?? {}).map(([key, b], i) => <span key={key} className={`voter-avatar avatar-${i % 4}`} title={b.name} aria-label={b.name}>{b.name.slice(0, 2).toUpperCase()}</span>)}</div><p className="vote-fineprint">Most up minus down wins. Ties go to the higher TMDb rating.</p>
    </section>}
    {result && !closed && <div className="result-controls"><a className="button button-primary" href={voteLink}>Open voter view</a><button className="button button-secondary" onClick={() => { void navigator.clipboard.writeText(`${location.origin}${voteLink}`).then(() => setNotice('Voting link copied.')).catch(() => setNotice('Open voter view and copy the address.')); }}><Copy size={17}/>Copy voting link</button>{creator && <button className="button button-primary call-it" disabled={!count} onClick={() => void callIt()}>Call it</button>}</div>}
    {!result && !closed && <div className="vote-options">{picks.map((pick) => { const selected = own?.ratings[pick.id], take = takes[pick.id] ?? selected?.take ?? ''; return <article className="vote-option" key={pick.id}>
      <div className="vote-option-top"><div className="vote-poster">{pick.poster}</div><div className="vote-option-copy"><h2>{pick.title}</h2><p>{pick.language} · {pick.runtime}</p><span className="vote-provider">{pick.provider ? `on ${pick.provider.name}` : 'Provider unlisted'}</span><strong className="vote-rating">{pick.rating.toFixed(1)} <small>TMDb</small></strong></div></div>
      <div className="vote-thumb-buttons"><button aria-label={`Thumbs up ${pick.title}`} aria-pressed={selected?.score === 1} disabled={!ready || busy} onClick={() => void submit(pick.id, { score: 1, take })}><ThumbsUp size={20}/>Yes, this!</button><button aria-label={`Thumbs down ${pick.title}`} aria-pressed={selected?.score === -1} disabled={!ready || busy} onClick={() => void submit(pick.id, { score: -1, take })}><ThumbsDown size={20}/>Not tonight</button></div>
      <label className="sr-only" htmlFor={`take-${pick.id}`}>Your take on {pick.title}, optional</label><input id={`take-${pick.id}`} className="vote-take" value={take} maxLength={80} placeholder="Seen it, total paisa vasool" onChange={(e) => setTakes((old) => ({ ...old, [pick.id]: e.target.value }))} onBlur={(e) => { if (e.relatedTarget instanceof HTMLElement && e.relatedTarget.closest('.vote-thumb-buttons')) return; if (selected && selected.take !== take) void submit(pick.id, { score: selected.score, take }); }}/><small className="take-hint">Optional take · {take.length}/80</small>
    </article>; })}</div>}
    {closed && !winner && <section className="vote-empty"><h2>No votes this time.</h2><p>No winner to call. Start a fresh night?</p><Link prefetch={false} className="button button-primary" href="/">Pick another night</Link></section>}
    {closed && winner && <section className="settled-winner"><h2>Tonight: {winner.title}</h2><div className="settled-poster">{winner.poster}</div><button className="button button-primary" onClick={() => setDismissed(false)}>Show the winner</button>{scores[0].takes.map((take, i) => <blockquote key={i}>“{take.take}”<cite>{take.name}</cite></blockquote>)}</section>}
    {streak > 1 && <p className="group-streak"><Flame size={21}/>{streak} movie nights picked together</p>}
    {demo && !closed && <button className="button button-secondary demo-friends" disabled={simulating || !ready} onClick={simulate}>{simulating ? 'Friends are voting…' : 'Simulate friends'}</button>}
    <p className="vote-notice" role="status">{notice}</p>
    {!result && <a className="text-action" href={resultsLink}>See results <ArrowUpRight size={15}/></a>}
    {voted && <Link prefetch={false} className="get-app" href="/">Get the app</Link>}
    <footer className="vote-footer">Ratings: TMDb. This product is not endorsed or certified by TMDb. Availability is illustrative.<details><summary>About this prototype</summary>Votes sync across tabs on this browser only. Cross-device totals need the future backend. Creator controls use this browser’s local identity, not account authentication.</details></footer>
    <dialog className="voter-name-dialog" ref={dialog} onCancel={() => setPending(null)}><form onSubmit={(e) => { e.preventDefault(); if (pending) void submit(pending.titleId, pending.rating, name); }}><p className="eyebrow">JUST YOUR FIRST NAME</p><h2>Who’s joining tonight?</h2><p>No signup. So friends know it’s you.</p><label htmlFor="voter-name">First name</label><input id="voter-name" value={name} maxLength={40} autoComplete="given-name" autoFocus required onChange={(e) => setName(e.target.value)}/><p className="vote-notice" role="status">{pending ? notice : ''}</p><button className="button button-primary" disabled={busy || !name.trim()}>Save my vote</button><button type="button" className="button button-secondary" onClick={() => setPending(null)}>Not now</button></form></dialog>
    {closed && winner && !dismissed && <WinnerReveal poll={poll} options={picks} winner={winner} scores={scores} streak={streak} onClose={() => setDismissed(true)}/>}
  </div>;
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Copy, MessageCircle, Check } from 'lucide-react';
import { pollStore, pollPath, type PollSnapshot, type Poll } from '@/lib/polls';
import { PosterCard } from '@/components/ui';
import type { Title } from '@/lib/data';
import { track } from '@/lib/analytics';
import { brand } from '@/lib/brand';
export function PollRoom({ id, snapshot, titles, result = false }: { id: string; snapshot: PollSnapshot | null; titles: Title[]; result?: boolean }) {
  const [poll, setPoll] = useState<Poll | null>(null), [ready, setReady] = useState(false), [notice, setNotice] = useState(''), [origin, setOrigin] = useState(''), [now, setNow] = useState(0), [voter, setVoter] = useState('');
  useEffect(() => {
    let active = true; setOrigin(window.location.origin); setNow(Date.now());
    let voterId = sessionStorage.getItem('movie-night-voter'); if (!voterId) { voterId = crypto.randomUUID(); sessionStorage.setItem('movie-night-voter', voterId); } setVoter(voterId);
    const refresh = async () => { try { const existing = await pollStore.getPoll(id); const value = existing ?? (snapshot ? await pollStore.importPoll(snapshot) : null); if (active) setPoll(value); } catch { if (active) setNotice('This poll link could not be loaded.'); } finally { if (active) setReady(true); } };
    void refresh(); const unsubscribe = pollStore.subscribe(() => { void refresh(); }); const timer = setInterval(() => setNow(Date.now()), 1000);
    if (result) track('result_view', { pollId: id });
    return () => { active = false; unsubscribe(); clearInterval(timer); };
  }, [id, snapshot, result]);
  if (!ready) return <div className="page-content"><div className="skeleton" style={{ height: 400, borderRadius: 20 }} role="status" aria-label="Loading poll"/></div>;
  if (!poll) return <div className="page-content empty-state"><h1>This link needs its picks.</h1><p>{notice || 'Ask the creator for the complete poll link, or create a new one.'}</p><Link href="/" className="button button-primary">Back to tonight</Link></div>;
  const picks = poll.titleIds.map((id) => titles.find((t) => t.id === id)).filter((t): t is Title => Boolean(t));
  const total = Object.values(poll.votes).filter((id) => poll.titleIds.includes(id)).length, closed = now >= Date.parse(poll.deadline), selected = poll.votes[voter];
  const link = `${origin}${pollPath(poll)}`; const message = `${poll.name} on ${brand.name}. Vote in 10 seconds, no app needed: ${link}`;
  async function copy() { try { await navigator.clipboard.writeText(link); track('poll_share', { pollId: poll!.id, method: 'copy' }); setNotice('Link copied. Bring the gang.'); } catch { setNotice('Select and copy the link below.'); } }
  async function vote(titleId: string) { try { await pollStore.castVote(id, voter, titleId); track('vote_cast', { pollId: id, titleId }); setNotice('Your vote is in.'); } catch (e) { setNotice(e instanceof Error ? e.message : 'Try voting again.'); } }
  return <div className="page-content poll-room"><p className="eyebrow">{brand.name} · GROUP MOVIE NIGHT</p><h1>{poll.name}</h1>{poll.note && <p className="poll-note">{poll.note}</p>}<p className="deadline-label">{closed ? 'Voting closed' : 'Closes'} · {new Date(poll.deadline).toLocaleString('en-IN', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}</p>
    {result ? <div className="waiting-panel" role="status"><span className="waiting-orbit" aria-hidden="true"/><h2>{total ? `${total} ${total === 1 ? 'vote' : 'votes'} so far` : closed ? 'No votes this time.' : 'Waiting for votes... 0 so far'}</h2><p>{closed ? 'The deadline has passed.' : 'The group’s best idea is on its way.'}</p></div> : <p className="muted">Pick one. No app. No signup.</p>}
    <div className="poll-vote-grid">{picks.map((title) => <div key={title.id}><PosterCard title={title.title} catalogTitle={title}/>{result ? <p>{Object.values(poll.votes).filter((v) => v === title.id).length} votes</p> : <button className={`button ${selected === title.id ? 'button-primary' : 'button-secondary'}`} disabled={closed || !voter} onClick={() => void vote(title.id)}>{selected === title.id && <Check size={15}/>} {selected === title.id ? 'Your pick' : `Vote ${title.title}`}</button>}</div>)}</div>
    <div className="poll-share-actions"><a className="button button-primary" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" onClick={() => track('poll_share', { pollId: id, method: 'whatsapp' })}><MessageCircle size={18}/>Send to WhatsApp</a><button className="button button-secondary" onClick={() => void copy()}><Copy size={18}/>Copy link</button></div><label className="field-label" htmlFor="poll-link">Poll link</label><input id="poll-link" value={link} readOnly onFocus={(e) => e.currentTarget.select()}/><p role="status" className="copy-notice">{notice}</p>
    <Link className="text-action" href={pollPath(poll, !result)}>{result ? 'Open voter view' : 'See local results'}</Link><a className="text-action" href={`/p/${id}/opengraph-image?${new URLSearchParams({ poll: new URL(link).searchParams.get('poll')! })}`} target="_blank" rel="noopener noreferrer">Preview share image</a>
    <p className="prototype-note">Prototype: votes sync across tabs on this device only. Share links carry the picks, but cross-device totals need the future backend. Localhost is not reachable by friends on other devices.</p>
  </div>;
}

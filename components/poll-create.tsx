'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Copy, MessageCircle, ArrowLeft } from 'lucide-react';
import { voterIdentity } from '@/lib/polls/identity';
import { usePrototype } from '@/lib/store';
import { pollStore, defaultPollName, deadlineFor, pollPath, type Poll } from '@/lib/polls';
import { track } from '@/lib/analytics';
import { brand } from '@/lib/brand';
import type { Title } from '@/lib/data';
import { PosterCard } from '@/components/ui';
export function PollCreate({ titles }: { titles: Title[] }) {
  const ids = usePrototype((s) => s.shortlist); const picks = ids.map((id) => titles.find((t) => t.id === id)).filter((t): t is Title => Boolean(t));
  const [name, setName] = useState(() => defaultPollName()); const [choice, setChoice] = useState('30'); const [custom, setCustom] = useState(''); const [note, setNote] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const router = useRouter(), created = useRef<Poll | null>(null), creating = useRef(false);
  const deadline = deadlineFor(choice, new Date(), custom); const validDate = Number.isFinite(deadline.getTime()) && deadline.getTime() > Date.now();
  async function create(action: 'copy' | 'whatsapp') {
    if (creating.current) return; creating.current = true; setBusy(true); setError('');
    try {
      const cutoff = deadlineFor(choice, new Date(), custom);
      if (!name.trim() || !Number.isFinite(cutoff.getTime()) || cutoff.getTime() <= Date.now()) throw new Error('Give the poll a name and a future deadline.');
      const poll = created.current ?? await pollStore.createPoll({ titleIds: picks.map((p) => p.id), creator: { id: voterIdentity().id, name: usePrototype.getState().prefs.name?.trim() || 'A friend' }, name, note, deadline: cutoff.toISOString(), expectedVoters: 0 });
      if (!created.current) track('poll_create', { pollId: poll.id, titleIds: poll.titleIds });
      created.current = poll;
      const link = `${window.location.origin}${pollPath(poll)}`;
      if (action === 'copy') {
        try { await navigator.clipboard.writeText(link); track('poll_share', { pollId: poll.id, method: 'copy' }); } catch { /* Waiting screen provides a selectable link if clipboard access is unavailable. */ }
      } else {
        const message = `${poll.name} on ${brand.name}. Pick tonight’s film — vote in 10 seconds: ${link}`;
        const opened = window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        if (opened) { opened.opener = null; track('poll_share', { pollId: poll.id, method: 'whatsapp' }); }
      }
      router.push(pollPath(poll, true));
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not create this poll. Try again.'); }
    finally { creating.current = false; setBusy(false); }
  }
  return <div className="page-content poll-create"><Link href="/" className="text-action"><ArrowLeft size={16}/> Tonight</Link><p className="eyebrow">LESS DEBATE. MORE MOVIE.</p><h1>Ask the group.</h1><p className="muted">Your picks. Their vote. Sorted.</p>
    {picks.length < 2 || picks.length !== ids.length ? <div className="empty-state"><h2>Start with two good options.</h2><p>Add 2–4 catalog titles to your shortlist.</p><Link className="button button-primary" href="/">Find tonight’s picks</Link></div> : <>
      <label className="field-label" htmlFor="poll-name">Poll name</label><input id="poll-name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} required/>
      <fieldset><legend>When do we decide?</legend><div className="deadline-chips">{[['30', '30 min'], ['60', '1 hr'], ['tonight', 'Tonight 9 pm'], ['custom', 'Custom']].map(([value, label]) => <button key={value} type="button" aria-pressed={choice === value} onClick={() => setChoice(value)}>{label}</button>)}</div>{choice === 'custom' && <><label htmlFor="poll-deadline" className="field-label">Custom deadline</label><input id="poll-deadline" type="datetime-local" value={custom} onChange={(e) => setCustom(e.target.value)}/></>}{!validDate && <p className="field-error">Choose a time that’s still ahead of us.</p>}</fieldset>
      <label className="field-label" htmlFor="poll-note">A little note <span>(optional)</span></label><textarea id="poll-note" value={note} maxLength={240} rows={2} onChange={(e) => setNote(e.target.value)} placeholder="Snacks are sorted. You choose the film."/>
      <section className="poll-live-preview" aria-label="Live voter preview"><p className="eyebrow">YOUR FRIENDS WILL SEE</p><h2>{name.trim() || 'Movie night'}</h2>{note && <p>{note}</p>}<small>{validDate ? `Closes ${deadline.toLocaleString('en-IN', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}` : 'Choose a deadline'}</small><div className="poll-preview-grid">{picks.map((title) => <PosterCard key={title.id} title={title.title} catalogTitle={title}/>)}</div><p>Thumbs up or down. No app. No signup.</p></section>
      <p className="prototype-note">Prototype: votes sync across tabs on this device. Cross-device totals need the future backend. Localhost links work only on this computer.</p>
      {error && <p role="alert" className="field-error">{error}</p>}<div className="poll-create-actions"><button className="button button-primary" disabled={busy || !name.trim() || !validDate} onClick={() => void create('whatsapp')}><MessageCircle size={18}/>{busy ? 'Creating your poll…' : 'Send to WhatsApp'}</button><button className="button button-secondary" disabled={busy || !name.trim() || !validDate} onClick={() => void create('copy')}><Copy size={18}/>Copy link</button></div>{busy && <div className="skeleton poll-saving" role="status" aria-label="Creating poll"/>}
    </>}
  </div>;
}

'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Bookmark, Check, Clapperboard, RotateCcw, Trophy } from 'lucide-react';
import { usePrototype } from '@/lib/store';
import { avatarOptions, initials } from '@/lib/preferences';
import type { Provider, Title } from '@/lib/data';
import { brands } from '@/lib/brand';
import { useBrand, setTesterBrand } from '@/lib/use-brand';
import { clearPrototypeData } from '@/lib/prototype-reset';
import { pollStore, pollPath, type Poll } from '@/lib/polls';
import { scorePoll, voterCount } from '@/lib/polls/results';
import { usableCreatorName } from '@/lib/polls/config';
import { ProviderChip, Button, Sheet } from '@/components/ui';
import { TitleCard } from '@/components/title-card';
export function Profile({ providers, titles }: { providers: Provider[]; titles: Title[] }) {
  const prefs = usePrototype((s) => s.prefs), saved = usePrototype((s) => s.watchlist), brand = useBrand();
  const [editing, setEditing] = useState(false), [name, setName] = useState(usableCreatorName(prefs.name)), [avatarId, setAvatarId] = useState(prefs.avatarId);
  const [resetting, setResetting] = useState(false), [notice, setNotice] = useState('');
  const [polls, setPolls] = useState<Poll[] | null>(null), [error, setError] = useState(''), [reload, setReload] = useState(0), [now, setNow] = useState(Date.now);
  const closeReset = useCallback(() => setResetting(false), []);
  useEffect(() => {
    let active = true;
    const load = () => { void pollStore.getMyPolls().then((value) => { if (active) { setPolls(value); setError(''); } }).catch(() => { if (active) setError('Your movie nights couldn’t load. Check your connection and try again.'); }); };
    load(); const stop = pollStore.subscribe(load), timer = setInterval(() => setNow(Date.now()), 1000);
    return () => { active = false; stop(); clearInterval(timer); };
  }, [reload]);
  const avatar = avatarOptions.find((a) => a.id === prefs.avatarId) ?? avatarOptions[0];
  const watchlist = saved.flatMap((id) => titles.find((t) => t.id === id) ?? []);
  const finished = (p: Poll) => Boolean(p.closedAt || Date.parse(p.deadline) <= now);
  const ratings = Object.fromEntries(titles.map((t) => [t.id, t.tmdbRating]));
  function reset() { try { clearPrototypeData(localStorage, sessionStorage); window.location.assign('/welcome'); } catch { setNotice('Browser storage couldn’t be cleared. Please try again.'); } }
  function pollSection(label: string, items: Poll[]) { return <div className="profile-poll-group"><h3>{label}</h3>{items.length ? items.map((poll) => {
    const count = voterCount(poll), winner = finished(poll) && count ? titles.find((t) => t.id === scorePoll(poll, ratings)[0]?.id) : undefined;
    return <Link className="profile-poll" href={pollPath(poll, true)} key={poll.id}><span className={`poll-status-icon ${finished(poll) ? 'finished' : ''}`}>{finished(poll) ? <Trophy size={20}/> : <Clapperboard size={20}/>}</span><span><strong>{poll.name}</strong><small>{winner ? `Tonight: ${winner.title}` : finished(poll) ? 'No votes this time. Another night awaits.' : `${count} ${count === 1 ? 'friend has' : 'friends have'} voted`}</small><small>{finished(poll) ? 'Finished' : `Closes ${new Date(poll.deadline).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}`}</small></span><ArrowRight size={18}/></Link>;
  }) : <p className="muted profile-small-empty">{label === 'Open' ? 'No plans in motion. Start something good.' : 'Your first shared pick belongs here.'}</p>}</div>; }
  return <div className="page-content profile-page"><p className="eyebrow">YOUR LITTLE CINEMA CORNER</p><div className="profile-identity"><span className="profile-avatar" style={{ background: avatar.gradient }} role="img" aria-label={`${avatar.label} avatar`}>{initials(usableCreatorName(prefs.name))}</span><div><h1>{usableCreatorName(prefs.name) || 'Your movie nights'}<span>.</span></h1><p className="muted">Good company. Great taste.</p></div></div>
    <button className="text-action" onClick={() => { setEditing(!editing); setName(usableCreatorName(prefs.name)); setAvatarId(prefs.avatarId); }}>{editing ? 'Cancel editing' : 'Edit name & avatar'}</button>
    {editing && <form className="profile-editor" onSubmit={(event) => { event.preventDefault(); usePrototype.getState().updatePreferences({ ...prefs, name: usableCreatorName(name), avatarId }); setEditing(false); setNotice('Looking good. Profile saved.'); }}><label htmlFor="profile-name">What should friends call you?</label><input id="profile-name" value={name} maxLength={40} autoComplete="given-name" onChange={(e) => setName(e.target.value)}/><div className="avatar-options" role="group" aria-label="Choose your avatar">{avatarOptions.map((a) => <button type="button" key={a.id} className={`avatar-option ${avatarId === a.id ? 'is-selected' : ''}`} aria-pressed={avatarId === a.id} aria-label={`${a.label} avatar`} onClick={() => setAvatarId(a.id)}><span style={{ background: a.gradient }}>{initials(name)}</span>{avatarId === a.id && <Check size={12}/>}</button>)}</div><Button>Save profile</Button></form>}
    <section className="profile-section"><h2>My services</h2><div className="chip-wrap">{providers.filter((p) => prefs.services.includes(p.id)).map((p) => <ProviderChip key={p.id} name={p.name} color={p.color}/>)}</div>{!prefs.services.length && <p className="muted">{prefs.freeOnly ? 'Free picks only. No subscription needed.' : 'No subscriptions selected. All doors open.'}</p>}<h3>My languages</h3><p className="muted">{prefs.languages.join(' · ') || 'Any language. Let the story decide.'}</p><Link className="button button-secondary" href="/welcome?edit=services">Edit services & languages <ArrowRight size={16}/></Link></section>
    <section className="profile-section"><h2>Watchlist <span className="muted">{watchlist.length || ''}</span></h2>{watchlist.length ? <div className="profile-watchlist">{watchlist.map((title) => <div key={title.id}><TitleCard title={title} providers={providers} prefs={prefs}/><button className="text-action" aria-label={`Remove ${title.title} from watchlist`} onClick={() => usePrototype.getState().toggleWatchlist(title.id)}>Remove</button></div>)}</div> : <div className="profile-empty"><Bookmark size={28}/><h3>For another good night.</h3><p>Save a title when it catches your eye. It’ll be waiting here.</p><Link className="button button-secondary" href="/search">Find a favourite <ArrowRight size={16}/></Link></div>}</section>
    <section className="profile-section"><h2>My polls</h2>{error ? <div className="profile-empty" role="alert"><h3>A little intermission.</h3><p>{error}</p><Button variant="secondary" onClick={() => { setError(''); setReload((n) => n + 1); }}>Try again</Button></div> : polls === null ? <div className="profile-poll-skeletons" role="status" aria-label="Loading your polls">{[0, 1].map((n) => <div className="skeleton" key={n}/>)}</div> : polls.length ? <>{pollSection('Open', polls.filter((p) => !finished(p)))}{pollSection('Finished', polls.filter(finished))}</> : <div className="profile-empty"><Clapperboard size={28}/><h3>Your people. One great pick.</h3><p>Shortlist a couple of titles, then ask the group. Your movie nights will live here.</p><Link className="button button-primary" href="/">Plan a movie night <ArrowRight size={16}/></Link></div>}</section>
    <section className="profile-section"><h2>Try a different name</h2><p className="muted">Same movie nights. A different brand for this tester tab.</p><div className="brand-options" role="group" aria-label="Tester session brand">{Object.values(brands).map((option) => <button key={option.name} className="chip" aria-pressed={brand.name === option.name} onClick={() => { try { setTesterBrand(option.name); setNotice(`Welcome to ${option.name}.`); } catch { setNotice('Allow session storage to switch brands.'); } }}>{option.name}{brand.name === option.name && <Check size={16}/>}</button>)}</div></section>
    <section className="profile-section"><h2>A fresh start?</h2><p className="muted">Clear this device’s profile, saved picks, searches and local polls.</p><Button variant="ghost" onClick={() => setResetting(true)}><RotateCcw size={16}/>Reset prototype</Button></section><p role="status" className="profile-notice">{notice}</p>
    <Sheet open={resetting} onClose={closeReset} title="Start fresh on this device?"><p className="muted">This clears your local data and device identity. Shared polls stay online, but this device will lose their creator controls and its existing votes. This can’t be undone.</p><div className="profile-reset-actions"><Button variant="secondary" onClick={closeReset}>Keep my movie nights</Button><Button onClick={reset}>Clear local data</Button></div></Sheet>
  </div>;
}

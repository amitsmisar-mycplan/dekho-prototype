'use client';
import { useTone } from '@/lib/use-copy';
import { formatCopy } from '@/lib/copy';
import { voterCopy } from '@/.generated/copy/voter';
import { commonCopy } from '@/.generated/copy/common';
import { resultsCopy } from '@/.generated/copy/results';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Clapperboard, ThumbsUp, ThumbsDown, Flame, ArrowUpRight, Copy } from 'lucide-react';
import { pollStore, pollPath, type PollSnapshot, type Poll } from '@/lib/polls';
import { voterIdentity, saveVoterName } from '@/lib/polls/identity';
import { countdown, scorePoll, voterCount, type Rating } from '@/lib/polls/results';
import { track } from '@/lib/analytics';
import { cloudPollsEnabled, usableCreatorName } from '@/lib/polls/config';
import { useBrand } from '@/lib/use-brand';
const GroupVerdict = dynamic(() => import('./watch-checkin'), { ssr: false });
const WinnerReveal = dynamic(() => import('./winner-reveal'), { ssr: false });
export interface PollOption { id: string; title: string; language: string; runtime: string; rating: number; provider: { name: string; color: string; url: string; type: string } | null; poster: ReactNode }
export function PollRoom({ id, snapshot, options, result = false, demo = false }: { id: string; snapshot: PollSnapshot | null; options: PollOption[]; result?: boolean; demo?: boolean }) {
  const tone = useTone();
  const brand = useBrand();
  const [poll, setPoll] = useState<Poll | null>(snapshot ? { ...snapshot, votes: {}, expectedVoters: 0 } : null);
  const [ready, setReady] = useState(false), [notice, setNotice] = useState(''), [now, setNow] = useState(0), [identity, setIdentity] = useState({ id: '', name: '' });
  const [pending, setPending] = useState<{ titleId: string; rating: Rating } | null>(null), [name, setName] = useState(''), [take, setTake] = useState<string | null>(null);
  const [streak, setStreak] = useState(0), [simulating, setSimulating] = useState(false), [dismissed, setDismissed] = useState(false), [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), timers = useRef<ReturnType<typeof setTimeout>[]>([]), busyRef = useRef(false);
  useEffect(() => {
    const pendingTimers = timers.current; let active = true; setNow(Date.now());
    try { const who = voterIdentity(); setIdentity(who); setName(who.name); } catch { setNotice(formatCopy(voterCopy['allow_browser_storage_to_vote_in_this_prototype'])); }
    const refresh = async () => {
      try { const value = await pollStore.getPoll(id) ?? (snapshot ? await pollStore.importPoll(snapshot, options.map((o) => o.id)) : null); if (active) { setPoll(value); setStreak(await pollStore.getStreak(id)); } }
      catch (error) { if (active) setNotice(cloudPollsEnabled && error instanceof Error ? error.message : formatCopy(voterCopy['this_poll_could_not_be_saved_check_browser_storage'])); }
      finally { if (active) setReady(true); }
    };
    void refresh(); const off = pollStore.subscribe(() => { void refresh(); }); const timer = setInterval(() => setNow(Date.now()), 1000);
    if (result) track('result_view', { pollId: id });
    return () => { active = false; off(); clearInterval(timer); pendingTimers.forEach(clearTimeout); };
  }, [id, snapshot, options, result]);
  useEffect(() => { if (pending) dialog.current?.showModal(); else dialog.current?.close(); }, [pending]);
  const closed = Boolean(poll && (poll.closedAt || (now && now >= Date.parse(poll.deadline))));
  useEffect(() => { if (closed) void pollStore.getStreak(id).then(setStreak).catch(() => {}); }, [closed, id]);
  if (!poll) return !ready ? <div className="vote-page loading-page" role="status" aria-label={formatCopy(voterCopy['loading_movie_night'])}><div className="skeleton skeleton-heading"/><div className="loading-cards">{[0, 1].map((n) => <div className="skeleton" key={n}/>)}</div></div> : <div className="vote-page poll-missing"><div className="state-symbol" aria-hidden="true"><Clapperboard size={36}/></div><h1>{notice ? formatCopy(voterCopy['a_little_intermission']) : formatCopy(voterCopy['this_night_is_off_the_reel'])}</h1><p>{notice ? formatCopy(voterCopy['we_couldn_t_load_this_poll_check_your_connection_and_try_again']) : formatCopy(voterCopy['that_poll_doesn_t_exist_here_ask_your_friend_for_the_latest_link_'])}</p>{notice && <button className="button button-primary" onClick={() => window.location.reload()}>{formatCopy(voterCopy['try_again'])}</button>}<Link prefetch={false} className="button button-secondary" href="/">{formatCopy(voterCopy['find_tonight_s_picks'])}</Link></div>;
  const picks = poll.titleIds.flatMap((id) => options.find((o) => o.id === id) ?? []), scores = scorePoll(poll, Object.fromEntries(picks.map((p) => [p.id, p.rating])));
  const count = voterCount(poll), own = poll.ballots?.[identity.id], voted = Boolean(own), creator = poll.creator?.id === identity.id;
  const answered = picks.filter((p) => own?.ratings[p.id]).length, complete = answered === picks.length && picks.length > 0;
  async function sendTake() { try { await pollStore.setTake(id, identity.id, take ?? own?.take ?? ''); setNotice(formatCopy(voterCopy['thoughts_sent'])); } catch (e) { setNotice(e instanceof Error ? e.message : formatCopy(voterCopy['could_not_send_try_again'])); } }
  const winner = count ? picks.find((p) => p.id === scores[0]?.id) : undefined;
  async function submit(titleId: string, rating: Rating, voterName = identity.name) {
    if (!voterName.trim()) { setPending({ titleId, rating }); return; }
    if (busyRef.current) return; busyRef.current = true; setBusy(true);
    try { const who = saveVoterName(voterName); setIdentity(who); await pollStore.rateTitle(id, who.id, who.name, titleId, rating); track('vote_cast', { pollId: id, titleId, score: rating.score }); setNotice(formatCopy(voterCopy['vote_saved'])); setPending(null); }
    catch (e) { setNotice(e instanceof Error ? e.message : formatCopy(voterCopy['could_not_save_try_again'])); }
    finally { busyRef.current = false; setBusy(false); }
  }
  async function callIt() { try { await pollStore.closePoll(id, identity.id); setDismissed(false); } catch (e) { setNotice(e instanceof Error ? e.message : formatCopy(voterCopy['could_not_close_this_poll'])); } }
  function simulate() {
    if (!demo || simulating || closed) return; setSimulating(true);
    const friends = [{ name: formatCopy(voterCopy['riya']), take: formatCopy(voterCopy['seen_it_total_paisa_vasool']) }, { name: formatCopy(voterCopy['kabir']), take: formatCopy(voterCopy['perfect_for_tonight_snacks_on_me']) }, { name: formatCopy(voterCopy['meera']), take: formatCopy(voterCopy['this_gets_my_double_yes']) }, { name: formatCopy(voterCopy['arjun']), take: formatCopy(voterCopy['great_cast_let_s_watch_together']) }];
    const runId = crypto.randomUUID();
    friends.forEach((friend, i) => { timers.current.push(setTimeout(() => { void (async () => {
      try { for (const [j, pick] of picks.entries()) { const score = j === 0 || (i + j) % 3 ? 1 : -1; await pollStore.rateTitle(id, `demo-${runId}-${i}`, friend.name, pick.id, { score }); track('vote_cast', { pollId: id, titleId: pick.id, score, demo: true }); } await pollStore.setTake(id, `demo-${runId}-${i}`, friend.take); }
      catch { setNotice(formatCopy(voterCopy['voting_closed_before_the_demo_finished'])); }
      finally { if (i === friends.length - 1) setSimulating(false); }
    })(); }, (i + 1) * 1500)); });
  }
  const voteLink = pollPath(poll), resultsLink = pollPath(poll, true);
  return <div className={`vote-page ${!result && !closed ? 'voting-page' : ''}`}>
    <header className="vote-header"><Link prefetch={false} href="/" className="wordmark" aria-label={formatCopy(voterCopy['value_home'], { p1: brand.name })}>{brand.name}<span>{formatCopy(voterCopy['separator_4'])}</span></Link><span className="vote-countdown" role="timer">{closed ? formatCopy(voterCopy['voting_closed']) : now ? countdown(poll.deadline, now) : formatCopy(voterCopy['checking_time'])}</span></header>
    <p className="vote-invite">{result || closed ? formatCopy(voterCopy['value_s_group_movie_night'], { p1: usableCreatorName(poll.creator?.name) || formatCopy(voterCopy['a_friend']) }) : formatCopy(voterCopy['value_wants_to_watch_something_vote'], { p1: usableCreatorName(poll.creator?.name) || formatCopy(voterCopy['a_friend']) })}</p><h1>{poll.name}</h1>{poll.groupName && <p className="poll-group-name">{poll.groupName}</p>}{poll.note && <p className="muted">{poll.note}</p>}
    {!result && !closed && <p className="vote-instruction">{formatCopy(voterCopy['thumbs_up_for_yes_down_for_not_tonight'])}</p>}
    {(result || closed) && <section className="vote-race" aria-label={formatCopy(voterCopy['live_tally'])}><div className="vote-race-heading"><h2>{closed ? formatCopy(voterCopy['the_group_has_spoken']) : count ? formatCopy(voterCopy['the_race_is_on']) : formatCopy(voterCopy['waiting_for_votes'])}</h2><span>{count} {count === 1 ? formatCopy(commonCopy['friend']) : formatCopy(commonCopy['friends'])}</span></div>
      {scores.map((s, i) => { const title = picks.find((p) => p.id === s.id); return <div className="race-row" key={s.id}><div><span>{title?.title}</span><strong>{s.up} {formatCopy(voterCopy['up'])}{s.down} {formatCopy(voterCopy['down'])}</strong></div><div className="race-track"><div className={`race-fill race-${i}`} style={{ width: `${count ? s.up / count * 100 : 0}%` }}/></div><small>{formatCopy(voterCopy['net'])}{s.score > 0 ? '+' : ''}{s.score}</small></div>; })}
      <div className="voter-avatars" aria-label={formatCopy(voterCopy['who_voted'])}>{Object.entries(poll.ballots ?? {}).map(([key, b], i) => <span key={key} className={`voter-avatar avatar-${i % 4}`} title={b.name} aria-label={b.name}>{b.name.slice(0, 2).toUpperCase()}</span>)}</div><p className="vote-fineprint">{formatCopy(voterCopy['most_up_minus_down_wins_ties_go_to_the_higher_tmdb_rating'])}</p>
    </section>}
    {result && !closed && <div className="result-controls"><a className="button button-primary" href={voteLink}>{formatCopy(voterCopy['open_voter_view'])}</a><button className="button button-secondary" onClick={() => { void navigator.clipboard.writeText(`${location.origin}${voteLink}`).then(() => setNotice(formatCopy(voterCopy['voting_link_copied']))).catch(() => setNotice(formatCopy(voterCopy['open_voter_view_and_copy_the_address']))); }}><Copy size={17}/>{formatCopy(voterCopy['copy_voting_link'])}</button>{creator && <button className="button button-primary call-it" disabled={!count} onClick={() => void callIt()}>{formatCopy(voterCopy['call_it'])}</button>}</div>}
    {!result && !closed && <><div className="vote-options">{picks.map((pick) => { const selected = own?.ratings[pick.id]; return <article className="vote-option" key={pick.id}>
      <div className="vote-poster">{pick.poster}</div><div className="vote-option-copy"><h2>{pick.title}</h2><p>{pick.language} {formatCopy(voterCopy['separator'])}{pick.runtime}</p><span className="vote-provider">{pick.provider ? formatCopy(voterCopy['on_value'], { p1: pick.provider.name }) : formatCopy(voterCopy['provider_unlisted'])}</span><strong className="vote-rating">{pick.rating.toFixed(1)} <small>{formatCopy(voterCopy['tmdb'])}</small></strong></div>
      <div className="vote-thumb-buttons"><button aria-label={formatCopy(voterCopy['thumbs_up_value'], { p1: pick.title })} aria-pressed={selected?.score === 1} disabled={!ready || busy} onClick={() => void submit(pick.id, { score: 1 })}><ThumbsUp size={20}/></button><button aria-label={formatCopy(voterCopy['thumbs_down_value'], { p1: pick.title })} aria-pressed={selected?.score === -1} disabled={!ready || busy} onClick={() => void submit(pick.id, { score: -1 })}><ThumbsDown size={20}/></button></div>
    </article>; })}</div>
    {complete && <form className="poll-thoughts" onSubmit={(e) => { e.preventDefault(); void sendTake(); }}><label htmlFor="poll-thoughts">{formatCopy(voterCopy['any_thoughts'])}<span>{formatCopy(voterCopy['optional'])}</span></label><div><input id="poll-thoughts" value={take ?? own?.take ?? ''} maxLength={80} placeholder={formatCopy(voterCopy['seen_it_total_paisa_vasool'], {}, tone)} onChange={(e) => setTake(e.target.value)}/><button className="button button-secondary" type="submit">{formatCopy(voterCopy['send'])}</button></div><small>{(take ?? own?.take ?? '').length}{formatCopy(voterCopy['80'])}</small></form>}
    <div className="vote-bottom-bar"><span aria-live="polite">{answered} {formatCopy(voterCopy['of'])}{picks.length} {formatCopy(voterCopy['voted'])}</span><button className="button button-primary" disabled={!complete || busy} onClick={() => { window.location.assign(resultsLink); }}>{formatCopy(voterCopy['done'])}</button></div></>}
    {closed && !winner && <section className="vote-empty"><h2>{formatCopy(voterCopy['no_votes_this_time'])}</h2><p>{formatCopy(voterCopy['no_winner_to_call_start_a_fresh_night'])}</p><Link prefetch={false} className="button button-primary" href="/">{formatCopy(voterCopy['pick_another_night'])}</Link></section>}
    {closed && winner && <section className="settled-winner"><h2>{formatCopy(voterCopy['tonight'])}{winner.title}</h2><div className="settled-poster">{winner.poster}</div><button className="button button-primary" onClick={() => setDismissed(false)}>{formatCopy(voterCopy['show_the_winner'])}</button>{scores[0].takes.map((take, i) => <blockquote key={i}>{formatCopy(voterCopy['separator_3'])}{take.take}{formatCopy(voterCopy['separator_2'])}<cite>{take.name}</cite></blockquote>)}</section>}
    {streak > 1 && <p className="group-streak"><Flame size={21}/>{formatCopy(resultsCopy['group_streak'], { group: poll.groupName || formatCopy(voterCopy['your_group']), count: streak })}</p>}
    {result && closed && winner && <GroupVerdict poll={poll} demo={demo}/>}
    {demo && !cloudPollsEnabled && !closed && <button className="button button-secondary demo-friends" disabled={simulating || !ready} onClick={simulate}>{simulating ? formatCopy(voterCopy['friends_are_voting']) : formatCopy(voterCopy['simulate_friends'])}</button>}
    <p className="vote-notice" role="status">{notice}</p>
    {!result && <a className="text-action" href={resultsLink}>{formatCopy(voterCopy['see_results'])}<ArrowUpRight size={15}/></a>}
    {voted && result && <Link prefetch={false} className="get-app" href="/">{formatCopy(voterCopy['get_the_app'])}</Link>}
    <footer className="vote-footer">{formatCopy(voterCopy['ratings_tmdb_this_product_is_not_endorsed_or_certified_by_tmdb_av'])}<details><summary>{formatCopy(voterCopy['about_this_prototype'])}</summary>{cloudPollsEnabled ? formatCopy(voterCopy['votes_sync_across_devices_keep_this_browser_s_storage_to_retain_y']) : formatCopy(voterCopy['local_demo_mode_votes_sync_across_tabs_on_this_browser_only_creat'])}</details></footer>
    <dialog className="voter-name-dialog" ref={dialog} onCancel={() => setPending(null)}><form onSubmit={(e) => { e.preventDefault(); if (pending) void submit(pending.titleId, pending.rating, name); }}><p className="eyebrow">{formatCopy(voterCopy['just_your_first_name'])}</p><h2>{formatCopy(voterCopy['who_s_joining_tonight'])}</h2><p>{formatCopy(voterCopy['no_signup_so_friends_know_it_s_you'])}</p><label htmlFor="voter-name">{formatCopy(voterCopy['first_name'])}</label><input id="voter-name" value={name} maxLength={40} autoComplete="given-name" autoFocus required onChange={(e) => setName(e.target.value)}/><p className="vote-notice" role="status">{pending ? notice : ''}</p><button className="button button-primary" disabled={busy || !name.trim()}>{formatCopy(voterCopy['save_my_vote'])}</button><button type="button" className="button button-secondary" onClick={() => setPending(null)}>{formatCopy(voterCopy['not_now'])}</button></form></dialog>
    {closed && winner && !dismissed && <WinnerReveal poll={poll} options={picks} winner={winner} scores={scores} streak={streak} onClose={() => setDismissed(true)}/>}
  </div>;
}

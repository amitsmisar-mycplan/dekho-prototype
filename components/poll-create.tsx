'use client';
import { useTone } from '@/lib/use-copy';
import { formatCopy } from '@/lib/copy';
import { pollCreateCopy } from '@/.generated/copy/pollCreate';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Copy, MessageCircle, ArrowLeft } from 'lucide-react';
import { cloudPollsEnabled, usableCreatorName } from '@/lib/polls/config';
import { voterIdentity } from '@/lib/polls/identity';
import { usePrototype } from '@/lib/store';
import { pollStore, defaultPollName, deadlineFor, pollPath, type Poll } from '@/lib/polls';
import { track } from '@/lib/analytics';
import { normalizeGroupName, recentGroups } from '@/lib/polls/groups';
import type { Title } from '@/lib/data';
import { PosterCard } from '@/components/ui';
export function PollCreate({ titles }: { titles: Title[] }) {
  const tone = useTone();
  const savedGroups = usePrototype((s) => s.groupNames);
  const [groupName, setGroupName] = useState(''), [remoteGroups, setRemoteGroups] = useState<string[]>([]);
  const groups = recentGroups([...savedGroups, ...remoteGroups]);
  useEffect(() => { let active = true; void pollStore.getMyPolls().then((polls) => { if (active) setRemoteGroups(polls.map((p) => p.groupName ?? '')); }).catch(() => {}); return () => { active = false; }; }, []);
  const savedCreator = usePrototype((s) => usableCreatorName(s.prefs.name));
  const [creatorName, setCreatorName] = useState('');
  const actualCreator = savedCreator || usableCreatorName(creatorName);
  const ids = usePrototype((s) => s.shortlist); const picks = ids.map((id) => titles.find((t) => t.id === id)).filter((t): t is Title => Boolean(t));
  const [name, setName] = useState(() => defaultPollName()); const [choice, setChoice] = useState('30'); const [custom, setCustom] = useState(''); const [note, setNote] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const router = useRouter(), created = useRef<Poll | null>(null), creating = useRef(false);
  const deadline = deadlineFor(choice, new Date(), custom); const validDate = Number.isFinite(deadline.getTime()) && deadline.getTime() > Date.now();
  async function create(action: 'copy' | 'whatsapp') {
    if (creating.current) return; creating.current = true; setBusy(true); setError('');
    try {
      const cutoff = deadlineFor(choice, new Date(), custom);
      if (!normalizeGroupName(groupName)) throw new Error(formatCopy(pollCreateCopy['enter_a_group_name_before_creating_the_poll']));
      if (!actualCreator) throw new Error(formatCopy(pollCreateCopy['your_name_helps_friends_know_who_s_asking']));
      if (!name.trim() || !Number.isFinite(cutoff.getTime()) || cutoff.getTime() <= Date.now()) throw new Error(formatCopy(pollCreateCopy['give_the_poll_a_name_and_a_future_deadline']));
      const poll = created.current ?? await pollStore.createPoll({ titleIds: picks.map((p) => p.id), groupName: normalizeGroupName(groupName), creator: { id: voterIdentity().id, name: actualCreator }, name, note, deadline: cutoff.toISOString(), expectedVoters: 0 });
      if (!created.current) track('poll_create', { pollId: poll.id, titleIds: poll.titleIds });
      created.current = poll;
      usePrototype.getState().rememberGroup(poll.groupName ?? groupName);
      if (!savedCreator) { const state = usePrototype.getState(); state.updatePreferences({ ...state.prefs, name: actualCreator }); }
      const link = `${window.location.origin}${pollPath(poll)}`;
      if (action === 'copy') {
        try { await navigator.clipboard.writeText(link); track('poll_share', { pollId: poll.id, method: 'copy' }); } catch { /* Waiting screen provides a selectable link if clipboard access is unavailable. */ }
      } else {
        const message = formatCopy(pollCreateCopy['value_vote_for_tonight_s_picture_value'], { p1: poll.groupName, p2: link });
        const opened = window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        if (opened) { opened.opener = null; track('poll_share', { pollId: poll.id, method: 'whatsapp' }); }
      }
      router.push(pollPath(poll, true));
    } catch (e) { setError(e instanceof Error ? e.message : formatCopy(pollCreateCopy['could_not_create_this_poll_try_again'])); }
    finally { creating.current = false; setBusy(false); }
  }
  return <div className="page-content poll-create"><Link href="/" className="text-action"><ArrowLeft size={16}/> {formatCopy(pollCreateCopy['tonight'])}</Link><p className="eyebrow">{formatCopy(pollCreateCopy['less_debate_more_movie'])}</p><h1>{formatCopy(pollCreateCopy['ask_the_group'])}</h1><p className="muted">{formatCopy(pollCreateCopy['your_picks_their_vote_sorted'], {}, tone)}</p>
    {picks.length < 2 || picks.length !== ids.length ? <div className="empty-state"><h2>{formatCopy(pollCreateCopy['start_with_two_good_options'])}</h2><p>{formatCopy(pollCreateCopy['add_2_4_catalog_titles_to_your_shortlist'])}</p><Link className="button button-primary" href="/">{formatCopy(pollCreateCopy['find_tonight_s_picks'])}</Link></div> : <>
      <label className="field-label" htmlFor="poll-group">{formatCopy(pollCreateCopy['which_group_is_this_for'])}</label><input id="poll-group" maxLength={60} value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder={formatCopy(pollCreateCopy['flatmates_college_gang'])} required/><div className="deadline-chips group-chips">{groups.map((group) => <button type="button" key={group.toLowerCase()} aria-pressed={groupName === group} onClick={() => setGroupName(group)}>{group}</button>)}</div><>{!savedCreator && <><label className="field-label" htmlFor="creator-name">{formatCopy(pollCreateCopy['your_name_so_friends_know_who_s_asking'])}</label><input id="creator-name" autoComplete="given-name" maxLength={40} value={creatorName} onChange={(e) => setCreatorName(e.target.value)} required/></>}</><label className="field-label" htmlFor="poll-name">{formatCopy(pollCreateCopy['poll_name'])}</label><input id="poll-name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} required/>
      <fieldset><legend>{formatCopy(pollCreateCopy['when_do_we_decide'])}</legend><div className="deadline-chips">{[['30', formatCopy(pollCreateCopy['30_min'])], ['60', formatCopy(pollCreateCopy['1_hr'])], ['tonight', formatCopy(pollCreateCopy['tonight_9_pm'])], ['custom', formatCopy(pollCreateCopy['custom'])]].map(([value, label]) => <button key={value} type="button" aria-pressed={choice === value} onClick={() => setChoice(value)}>{label}</button>)}</div>{choice === 'custom' && <><label htmlFor="poll-deadline" className="field-label">{formatCopy(pollCreateCopy['custom_deadline'])}</label><input id="poll-deadline" type="datetime-local" value={custom} onChange={(e) => setCustom(e.target.value)}/></>}{!validDate && <p className="field-error">{formatCopy(pollCreateCopy['choose_a_time_that_s_still_ahead_of_us'])}</p>}</fieldset>
      <label className="field-label" htmlFor="poll-note">{formatCopy(pollCreateCopy['a_little_note'])}<span>{formatCopy(pollCreateCopy['optional'])}</span></label><textarea id="poll-note" value={note} maxLength={240} rows={2} onChange={(e) => setNote(e.target.value)} placeholder={formatCopy(pollCreateCopy['snacks_are_sorted_you_choose_the_film'])}/>
      <section className="poll-live-preview" aria-label={formatCopy(pollCreateCopy['live_voter_preview'])}><p className="eyebrow">{formatCopy(pollCreateCopy['your_friends_will_see'])}</p><p className="preview-group">{normalizeGroupName(groupName) || formatCopy(pollCreateCopy['your_group'])}</p><h2>{name.trim() || formatCopy(pollCreateCopy['movie_night'])}</h2>{note && <p>{note}</p>}<small>{validDate ? formatCopy(pollCreateCopy['closes_value'], { p1: deadline.toLocaleString('en-IN', { weekday: 'short', hour: 'numeric', minute: '2-digit' }) }) : formatCopy(pollCreateCopy['choose_a_deadline'])}</small><div className="poll-preview-grid">{picks.map((title) => <PosterCard key={title.id} title={title.title} catalogTitle={title}/>)}</div><p>{formatCopy(pollCreateCopy['thumbs_up_or_down_no_app_no_signup'])}</p></section>
      <p className="prototype-note">{cloudPollsEnabled ? formatCopy(pollCreateCopy['friends_can_vote_from_any_phone_using_the_shared_link_use_a_publi']) : formatCopy(pollCreateCopy['local_demo_mode_votes_sync_across_tabs_on_this_device_only'])}</p>
      {error && <p role="alert" className="field-error">{error}</p>}<div className="poll-create-actions"><button className="button button-primary" disabled={busy || !normalizeGroupName(groupName) || !actualCreator || !name.trim() || !validDate} onClick={() => void create('whatsapp')}><MessageCircle size={18}/>{busy ? formatCopy(pollCreateCopy['creating_your_poll']) : formatCopy(pollCreateCopy['send_to_whatsapp'])}</button><button className="button button-secondary" disabled={busy || !normalizeGroupName(groupName) || !actualCreator || !name.trim() || !validDate} onClick={() => void create('copy')}><Copy size={18}/>{formatCopy(pollCreateCopy['copy_link'])}</button></div>{busy && <div className="skeleton poll-saving" role="status" aria-label={formatCopy(pollCreateCopy['creating_poll'])}/>}
    </>}
  </div>;
}

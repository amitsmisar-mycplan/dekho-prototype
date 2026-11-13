'use client';
import { toneForLanguages, formatCopy } from '@/lib/copy';
import { welcomeCopy } from '@/.generated/copy/welcome';

import { uiSpring } from '@/lib/motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button, Chip } from '@/components/ui';
import type { Provider } from '@/lib/data';
import { usePrototype } from '@/lib/store';
import { avatarOptions, initials, type Preferences } from '@/lib/preferences';
import { track } from '@/lib/analytics';
export function Onboarding({ providers, languages, edit }: { providers: Provider[]; languages: string[]; edit: boolean }) {
  const router = useRouter(); const reduced = useReducedMotion();
  const saved = usePrototype((s) => s.prefs); const completed = usePrototype((s) => s.onboardingComplete);
  const editing = edit && completed;
  const [draft, setDraft] = useState<Preferences>(() => ({ ...saved, services: [...saved.services], languages: [...saved.languages] }));
  const tone = toneForLanguages(draft.languages);
  const [step, setStep] = useState(0); const [celebrating, setCelebrating] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null); const lastTracked = useRef('');
  const count = editing ? 2 : 3;
  const providerOrder = ['jiohotstar', 'prime-video', 'netflix', 'sonyliv', 'zee5', 'aha', 'sun-nxt', 'mx-player', 'apple-tv', 'lionsgate-play'];
  const orderedProviders = [...providers].sort((a, b) => providerOrder.indexOf(a.id) - providerOrder.indexOf(b.id));
  const titles = [formatCopy(welcomeCopy['which_apps_do_you_pay_for']), formatCopy(welcomeCopy['what_do_you_watch_in']), formatCopy(welcomeCopy['what_should_friends_call_you'])];
  useEffect(() => { if (completed && !edit && !celebrating) router.replace('/'); }, [completed, edit, celebrating, router]);
  useEffect(() => {
    if (completed && !edit) return;
    const key = `${editing}-${step}`;
    if (lastTracked.current !== key) { track('onboarding_step', { step: step + 1, mode: editing ? 'edit' : 'setup' }); lastTracked.current = key; }
    heading.current?.focus({ preventScroll: true });
  }, [step, editing, completed, edit]);
  useEffect(() => {
    if (!celebrating) return;
    const timer = setTimeout(() => {
      usePrototype.getState().completeOnboarding(draft);
      track('onboarding_complete', { services: draft.services, languages: draft.languages, freeOnly: draft.freeOnly, nameSkipped: !draft.name.trim(), avatarId: draft.avatarId });
      router.replace('/');
    }, 1000);
    return () => clearTimeout(timer);
  }, [celebrating, draft, router]);
  function toggle(field: 'services' | 'languages', value: string) { setDraft((d) => ({ ...d, ...(field === 'services' ? { freeOnly: false } : {}), [field]: d[field].includes(value) ? d[field].filter((s) => s !== value) : [...d[field], value] })); }
  function next() {
    if (editing && step === 1) { usePrototype.getState().updatePreferences(draft); track('preferences_edit', { services: draft.services, languages: draft.languages }); router.replace('/me'); return; }
    if (step < 2) setStep(step + 1); else setCelebrating(true);
  }
  if (completed && !edit && !celebrating) return <div className="page-content skeleton" style={{ height: 400 }} aria-label={formatCopy(welcomeCopy['opening_tonight'])} role="status"/>;
  return <div className="onboarding">
    {celebrating ? <motion.div className="welcome-celebration" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="celebration-orbit" aria-hidden="true"/>
      <motion.div className="celebration-star" initial={{ scale: reduced ? 1 : .6 }} animate={{ scale: 1 }}><Sparkles size={42}/></motion.div>
      <p className="eyebrow">{formatCopy(welcomeCopy['the_good_part_starts_now'])}</p><h1>{formatCopy(welcomeCopy['ready_title'], {}, tone)}</h1><p>{formatCopy(welcomeCopy['your_people_your_picks_your_night'])}</p>
    </motion.div> : <>
      <div className="onboarding-meta">{step > 0 ? <button className="icon-button" aria-label={formatCopy(welcomeCopy['previous_step'])} onClick={() => setStep(step - 1)}><ArrowLeft size={20}/></button> : editing ? <button className="text-action" onClick={() => router.replace('/me')}>{formatCopy(welcomeCopy['cancel'])}</button> : <span aria-hidden="true"/>}<strong>{formatCopy(welcomeCopy['0_2'])}{step + 1}<span> {formatCopy(welcomeCopy['0'])}{count}</span></strong></div>
      <div className="welcome-progress" role="progressbar" aria-label={formatCopy(welcomeCopy['setup_progress'])} aria-valuemin={0} aria-valuemax={count} aria-valuenow={step + 1}>{Array.from({ length: count }, (_, i) => <span key={i} className={i <= step ? 'filled' : ''}/>)}</div>
      <AnimatePresence mode="wait" initial={false}><motion.section key={step} className="welcome-card" initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -15 }} transition={reduced ? { duration: 0 } : uiSpring} onAnimationComplete={() => { heading.current?.focus({ preventScroll: true }); heading.current?.closest('.app-scroll')?.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); }}>
        <p className="eyebrow">{[formatCopy(welcomeCopy['your_sofa_your_subscriptions']), formatCopy(welcomeCopy['great_stories_speak_your_language']), formatCopy(welcomeCopy['every_group_has_a_main_character'])][step]}</p>
        <h1 ref={heading} tabIndex={-1}>{titles[step]}</h1>
        <p className="welcome-description">{[formatCopy(welcomeCopy['we_ll_bring_the_picks_you_bring_the_subscriptions_choose_as_many_']), formatCopy(welcomeCopy['one_language_or_a_whole_mix_there_s_room_for_every_kind_of_movie_']), formatCopy(welcomeCopy['a_first_name_a_nickname_your_group_chat_alias_keep_it_you'])][step]}</p>
        {step === 0 && <><div className="provider-grid">{orderedProviders.map((provider) => { const selected = draft.services.includes(provider.id); return <button key={provider.id} type="button" aria-pressed={selected} className={`provider-tile ${selected ? 'is-selected' : ''}`} style={{ '--provider-color': provider.color } as CSSProperties} onClick={() => toggle('services', provider.id)}><span>{provider.name}</span><motion.span className="provider-check" initial={false} animate={{ scale: selected ? 1 : .8, opacity: selected ? 1 : .3 }} transition={reduced ? { duration: 0 } : uiSpring}>{selected && <Check size={13}/>}</motion.span></button>; })}</div><p className="family-login-note">{formatCopy(welcomeCopy['phone_plan_and_family_logins_count_too'])}</p><button className={`provider-tile free-option ${draft.freeOnly ? 'is-selected' : ''}`} aria-pressed={draft.freeOnly} onClick={() => setDraft((d) => ({ ...d, services: [], freeOnly: !d.freeOnly }))}><span>{formatCopy(welcomeCopy['none_yet_show_me_free_stuff'])}</span>{draft.freeOnly && <Check size={18}/>}</button></>}
        {step === 1 && <><div className="language-cloud">{languages.map((language) => <Chip key={language} selected={draft.languages.includes(language)} onClick={() => toggle('languages', language)}>{language}</Chip>)}</div><div className="language-note"><span lang="en">{formatCopy(welcomeCopy['separator'])}</span><p>{formatCopy(welcomeCopy['good_stories_travel_so_can_your_taste'])}</p></div></>}
        {step === 2 && <><label className="name-label" htmlFor="welcome-name">{formatCopy(welcomeCopy['your_name'])}<span>{formatCopy(welcomeCopy['optional'])}</span></label><input className="welcome-name" id="welcome-name" autoComplete="given-name" placeholder={formatCopy(welcomeCopy['what_s_your_movie_night_name'])} maxLength={40} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}/><p className="avatar-label">{formatCopy(welcomeCopy['pick_your_little_alter_ego'])}</p><div className="avatar-options" role="group" aria-label={formatCopy(welcomeCopy['choose_your_avatar'])}>{avatarOptions.map((avatar) => <button key={avatar.id} aria-label={formatCopy(welcomeCopy['value_avatar'], { p1: avatar.label })} aria-pressed={draft.avatarId === avatar.id} className={`avatar-option ${draft.avatarId === avatar.id ? 'is-selected' : ''}`} onClick={() => setDraft({ ...draft, avatarId: avatar.id })}><span style={{ background: avatar.gradient }}>{initials(draft.name)}</span>{draft.avatarId === avatar.id && <Check size={12}/>}</button>)}</div><p className="prototype-note">{formatCopy(welcomeCopy['just_for_this_device_no_account_no_signup'])}</p></>}
      </motion.section></AnimatePresence>
      <div className="welcome-actions"><p aria-live="polite">{step === 0 ? draft.freeOnly ? formatCopy(welcomeCopy['free_picks_good_nights_zero_subscriptions']) : draft.services.length ? formatCopy(welcomeCopy['value_services_plenty_of_possibilities'], { p1: draft.services.length }) : formatCopy(welcomeCopy['no_subscriptions_you_can_still_explore']) : step === 1 ? draft.languages.length ? formatCopy(welcomeCopy['value_languages_one_great_night'], { p1: draft.languages.length }) : formatCopy(welcomeCopy['no_preference_we_ll_keep_every_language_open']) : formatCopy(welcomeCopy['your_seat_in_the_group_is_saved'])}</p><Button onClick={next}>{editing && step === 1 ? formatCopy(welcomeCopy['save_preferences']) : step === 2 ? formatCopy(welcomeCopy['let_s_make_a_night_of_it']) : formatCopy(welcomeCopy['continue'])}<ArrowRight size={18}/></Button>{step === 2 && <Button variant="ghost" onClick={() => { setDraft((d) => ({ ...d, name: '' })); setCelebrating(true); }}>{formatCopy(welcomeCopy['skip_for_now'])}</Button>}</div>
    </>}
  </div>;
}

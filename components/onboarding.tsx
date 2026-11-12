'use client';
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
  const [step, setStep] = useState(0); const [celebrating, setCelebrating] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null); const lastTracked = useRef('');
  const count = editing ? 2 : 3;
  const providerOrder = ['jiohotstar', 'prime-video', 'netflix', 'sonyliv', 'zee5', 'aha', 'sun-nxt', 'mx-player', 'apple-tv', 'lionsgate-play'];
  const orderedProviders = [...providers].sort((a, b) => providerOrder.indexOf(a.id) - providerOrder.indexOf(b.id));
  const titles = ['Which apps do you pay for?', 'What do you watch in?', 'What should friends call you?'];
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
  if (completed && !edit && !celebrating) return <div className="page-content skeleton" style={{ height: 400 }} aria-label="Opening tonight" role="status"/>;
  return <div className="onboarding">
    {celebrating ? <motion.div className="welcome-celebration" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="celebration-orbit" aria-hidden="true"/>
      <motion.div className="celebration-star" initial={{ scale: reduced ? 1 : .6 }} animate={{ scale: 1 }}><Sparkles size={42}/></motion.div>
      <p className="eyebrow">THE GOOD PART STARTS NOW</p><h1>Ready.<br/>Chalo, kya<br/>dekhein<span>?</span></h1><p>Your people. Your picks. Your night.</p>
    </motion.div> : <>
      <div className="onboarding-meta">{step > 0 ? <button className="icon-button" aria-label="Previous step" onClick={() => setStep(step - 1)}><ArrowLeft size={20}/></button> : editing ? <button className="text-action" onClick={() => router.replace('/me')}>Cancel</button> : <span aria-hidden="true"/>}<strong>0{step + 1}<span> / 0{count}</span></strong></div>
      <div className="welcome-progress" role="progressbar" aria-label="Setup progress" aria-valuemin={0} aria-valuemax={count} aria-valuenow={step + 1}>{Array.from({ length: count }, (_, i) => <span key={i} className={i <= step ? 'filled' : ''}/>)}</div>
      <AnimatePresence mode="wait" initial={false}><motion.section key={step} className="welcome-card" initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -15 }} transition={{ duration: reduced ? 0 : .18 }} onAnimationComplete={() => { heading.current?.focus({ preventScroll: true }); heading.current?.closest('.app-scroll')?.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); }}>
        <p className="eyebrow">{['YOUR SOFA. YOUR SUBSCRIPTIONS.', 'GREAT STORIES SPEAK YOUR LANGUAGE.', 'EVERY GROUP HAS A MAIN CHARACTER.'][step]}</p>
        <h1 ref={heading} tabIndex={-1}>{titles[step]}</h1>
        <p className="welcome-description">{['We’ll bring the picks. You bring the subscriptions. Choose as many as you like.', 'One language or a whole mix. There’s room for every kind of movie night.', 'A first name, a nickname, your group-chat alias. Keep it you.'][step]}</p>
        {step === 0 && <><div className="provider-grid">{orderedProviders.map((provider) => { const selected = draft.services.includes(provider.id); return <button key={provider.id} type="button" aria-pressed={selected} className={`provider-tile ${selected ? 'is-selected' : ''}`} style={{ '--provider-color': provider.color } as CSSProperties} onClick={() => toggle('services', provider.id)}><span>{provider.name}</span><motion.span className="provider-check" initial={false} animate={{ scale: selected ? 1 : .8, opacity: selected ? 1 : .3 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 450, damping: 18 }}>{selected && <Check size={13}/>}</motion.span></button>; })}</div><p className="family-login-note">Phone plan and family logins count too.</p><button className={`provider-tile free-option ${draft.freeOnly ? 'is-selected' : ''}`} aria-pressed={draft.freeOnly} onClick={() => setDraft((d) => ({ ...d, services: [], freeOnly: !d.freeOnly }))}><span>None yet, show me free stuff</span>{draft.freeOnly && <Check size={18}/>}</button></>}
        {step === 1 && <><div className="language-cloud">{languages.map((language) => <Chip key={language} selected={draft.languages.includes(language)} onClick={() => toggle('languages', language)}>{language}</Chip>)}</div><div className="language-note"><span lang="hi">कहानी अच्छी हो, बस।</span><p>Good stories travel. So can your taste.</p></div></>}
        {step === 2 && <><label className="name-label" htmlFor="welcome-name">Your name <span>optional</span></label><input className="welcome-name" id="welcome-name" autoComplete="given-name" placeholder="What’s your movie-night name?" maxLength={40} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}/><p className="avatar-label">Pick your little alter ego</p><div className="avatar-options" role="group" aria-label="Choose your avatar">{avatarOptions.map((avatar) => <button key={avatar.id} aria-label={`${avatar.label} avatar`} aria-pressed={draft.avatarId === avatar.id} className={`avatar-option ${draft.avatarId === avatar.id ? 'is-selected' : ''}`} onClick={() => setDraft({ ...draft, avatarId: avatar.id })}><span style={{ background: avatar.gradient }}>{initials(draft.name)}</span>{draft.avatarId === avatar.id && <Check size={12}/>}</button>)}</div><p className="prototype-note">Just for this device. No account, no signup.</p></>}
      </motion.section></AnimatePresence>
      <div className="welcome-actions"><p aria-live="polite">{step === 0 ? draft.freeOnly ? 'Free picks. Good nights. Zero subscriptions.' : draft.services.length ? `${draft.services.length} services. Plenty of possibilities.` : 'No subscriptions? You can still explore.' : step === 1 ? draft.languages.length ? `${draft.languages.length} languages. One great night.` : 'No preference? We’ll keep every language open.' : 'Your seat in the group is saved.'}</p><Button onClick={next}>{editing && step === 1 ? 'Save preferences' : step === 2 ? 'Let’s make a night of it' : 'Continue'}<ArrowRight size={18}/></Button>{step === 2 && <Button variant="ghost" onClick={() => { setDraft((d) => ({ ...d, name: '' })); setCelebrating(true); }}>Skip for now</Button>}</div>
    </>}
  </div>;
}

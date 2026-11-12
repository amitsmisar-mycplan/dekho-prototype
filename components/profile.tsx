'use client';
import Link from 'next/link';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { usePrototype } from '@/lib/store';
import { avatarOptions, initials } from '@/lib/preferences';
import type { Provider } from '@/lib/data';
import { ProviderChip, Button } from '@/components/ui';
export function Profile({ providers }: { providers: Provider[] }) {
  const prefs = usePrototype((s) => s.prefs);
  const avatar = avatarOptions.find((a) => a.id === prefs.avatarId) ?? avatarOptions[0];
  function reset() {
    usePrototype.getState().resetOnboarding();
    try { localStorage.removeItem('dekho-splash-seen'); } catch { /* Storage is optional. */ }
    window.location.assign('/welcome');
  }
  return <div className="page-content profile-page"><p className="eyebrow">YOUR LITTLE CINEMA CORNER</p><div className="profile-identity"><span className="profile-avatar" style={{ background: avatar.gradient }}>{initials(prefs.name)}</span><div><h1>{prefs.name || 'Movie-night friend'}<span>.</span></h1><p className="muted">Good company. Great taste.</p></div></div>
    <section className="profile-section"><h2>My services</h2><div className="chip-wrap">{providers.filter((p) => prefs.services.includes(p.id)).map((p) => <ProviderChip key={p.id} name={p.name} color={p.color}/>)}</div>{!prefs.services.length && <p className="muted">{prefs.freeOnly ? 'Free picks only. No subscription needed.' : 'No subscriptions selected. All doors open.'}</p>}<h3>My languages</h3><p className="muted">{prefs.languages.join(' · ') || 'Any language. Let the story decide.'}</p><Link className="button button-secondary" href="/welcome?edit=services">Edit services <ArrowRight size={16}/></Link></section>
    <section className="profile-section"><h2>Try your taste on for size.</h2><p className="muted">Your saved services and languages are ready in the catalog lab.</p><Link className="button button-primary" href="/kit/catalog">Explore the catalog <ArrowRight size={16}/></Link></section>
    <section className="profile-section"><h3>Testing the first hello?</h3><p className="muted">Reset your name, avatar, services and languages to replay setup. Your shortlist and watchlist stay saved.</p><Button variant="ghost" onClick={reset}><RotateCcw size={16}/> Reset onboarding</Button></section><p className="prototype-note">Preferences stay on this device. Watchlist and poll screens arrive in later phases.</p>
  </div>;
}

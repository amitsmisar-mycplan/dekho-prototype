'use client';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Check, Layers2, Plus, Sparkles } from 'lucide-react';
import { AvatarStack, Button, Chip, PosterCard, ProviderChip, SectionHeader, Sheet, Toast } from '@/components/ui';
import { brand } from '@/lib/brand';
import Link from 'next/link';
import { PosterLink } from '@/components/poster-transition';
import type { Provider, Title } from '@/lib/data';
import { usePrototype } from '@/lib/store';
const samples: {
    title: string;
    eyebrow: string;
    palette: [
        string,
        string
    ];
}[] = [{ title: 'After Hours', eyebrow: 'One more plot twist', palette: ['#674061', '#151e36'] }, { title: 'Golden Days', eyebrow: 'Dil khush, mood sorted', palette: ['#9c4b20', '#342743'] }];
export default function DesignKit({ providers, titles }: { providers: Provider[]; titles: Title[] }) {
    const [mood, setMood] = useState('Feel-good');
    const [sheet, setSheet] = useState(false);
    const [toast, setToast] = useState('');
    const [ready, setReady] = useState(false);
    const shortlist = usePrototype((s) => s.shortlist);
    const toggle = usePrototype((s) => s.toggleShortlist);
    useEffect(() => setReady(true), []);
    const closeSheet = useCallback(() => setSheet(false), []);
    const closeToast = useCallback(() => setToast(''), []);
    return <div className="kit page-content"><div className="kit-heading"><p className="eyebrow">THE LOOK. THE FEEL. THE LITTLE THINGS.</p><h1>Movie-night<br />material<span>.</span></h1><p className="muted">The {brand.name} design kit.<br />Go on, press all the buttons.</p><span className="version"><span className="live-dot"/> FOUNDATION / V0.1</span><Link className="button button-secondary catalog-kit-link" href="/kit/catalog">Explore the seeded catalog <ArrowRight size={16}/></Link></div>
  <section id="poster-atlas"><SectionHeader eyebrow="68 / ORIGINAL COMPOSITIONS" title="The whole cinema wall."/><p className="prototype-note">Every title, one deterministic design. Colour follows mood; shapes follow genre. Provider dots mark your included services.</p><div className="poster-atlas">{titles.map((title) => <div key={title.id}><PosterLink title={title}><PosterCard title={title.title} catalogTitle={title}/></PosterLink><span className="sr-only">{title.title}</span></div>)}</div></section>
  <section><SectionHeader eyebrow="01 / COLOUR" title="After dark, in colour."/><div className="swatches">{(['marigold', 'pink', 'teal', 'surface', 'text', 'muted'] as const).map((key) => <div key={key}><div style={{ background: brand.colors[key] }}/><strong>{key}</strong><small>{brand.colors[key]}</small></div>)}</div></section>
  <section><SectionHeader eyebrow="02 / TYPE" title="A little main-character energy."/><div className="type-panel"><span className="tiny-label">BRICOLAGE GROTESQUE / DISPLAY</span><h2>Kya dekhein<span>?</span></h2><span className="tiny-label">INTER / THE EVERYDAY STUFF</span><p>Good films. Great company. Plans, sorted.</p><span className="tiny-label">MUKTA / A LITTLE HINDI</span><p className="devanagari" lang="hi">आज कुछ अच्छा देखते हैं।</p></div></section>
  <section><SectionHeader eyebrow="03 / ACTIONS" title="Make the next move."/><div className="button-demo"><Button onClick={() => setToast('Good choice. Tonight is looking up.')}>Put it to the group <ArrowRight size={18}/></Button><Button variant="secondary" onClick={() => setToast('Saved a little movie-night inspiration.')}><Plus size={18}/> Save for a rainy day</Button><Button variant="ghost" onClick={() => setToast('No pressure. The popcorn can wait.')}>Maybe later <ArrowRight size={16}/></Button><Button disabled>Pick at least 2 titles</Button><Button variant="secondary" disabled>Nothing to save yet</Button><Button variant="ghost" disabled>Unavailable for now</Button></div></section>
  <section><SectionHeader eyebrow="04 / CHIPS" title="What’s the mood?"/><div className="chip-wrap">{['Laugh', 'Edge-of-seat', 'Family', 'Feel-good', 'Mind-bender'].map((item) => <Chip key={item} selected={mood === item} onClick={() => setMood(item)}>{item === 'Feel-good' && <Sparkles size={14}/>} {item}</Chip>)}<Chip disabled>More soon</Chip></div><p className="prototype-note" aria-live="polite">Selected: {mood}. Try mood quick-start on Home.</p><h3 className="small-heading">Your services, front and centre.</h3><div className="chip-wrap">{providers.map(({ id, name, color }) => <ProviderChip key={id} name={name} color={color}/>)}</div><p className="prototype-note">Text-only chips, with accessible lighter provider colours.</p></section>
  <section><SectionHeader eyebrow="05 / POSTERS" title="Every pick, a little poster."/><div className="poster-grid">{samples.map((sample) => <PosterCard key={sample.title} {...sample} selected={ready && shortlist.includes(sample.title)} onAdd={() => { toggle(sample.title); setToast(shortlist.includes(sample.title) ? 'Taken off the shortlist.' : 'On the shortlist. Good taste!'); }}/>)}</div><p className="prototype-note">Original generated key art · 2:3 · Tap + to try the shortlist</p><div className="poster-grid"><div><PosterCard title="Loading" loading/><p className="tiny-label state-caption">LOADING / SHIMMER</p></div><div><PosterCard title="Your next favourite" eyebrow="Original composition" palette={['#292731', '#171520']}/><p className="tiny-label state-caption">GENERATED / NO IMAGES</p></div></div></section>
  <section><SectionHeader eyebrow="06 / PEOPLE" title="Better with your people."/><div className="people-panel"><AvatarStack /><div><strong>The usual suspects</strong><p className="muted">Three friends. One movie night.</p></div></div><div className="people-panel"><AvatarStack names={['YOU']}/><p className="muted">Someone has to start the plan.</p></div></section>
  <section><SectionHeader eyebrow="07 / FEEDBACK" title="Small moments. Big feels."/><div className="button-demo"><Button variant="secondary" onClick={() => setSheet(true)}><Layers2 size={18}/> Open the bottom sheet</Button><Button variant="ghost" onClick={() => setToast('Added to tonight. Snacks next?')}><Check size={18}/> Try a toast</Button></div><div className="inline-notice"><Sparkles size={18}/><p>Motion should feel good.<br /><span>Reduced-motion preferences are respected.</span></p></div></section>
  <section><SectionHeader eyebrow="08 / SECTION HEADERS" title="A little more to explore." action="See all" onAction={() => setToast('You’re seeing the full P0 kit.')}/><SectionHeader title="Quietly confident."/></section>
  <Sheet open={sheet} onClose={closeSheet} title="Tonight is taking shape."><p className="muted">A little glass, a gentle spring. Drag this sheet down, press Escape, or tap outside to close.</p><div className="sheet-preview"><AvatarStack /><span>Everyone gets a say.</span></div><Button onClick={() => { setSheet(false); setToast('Sorted. Now, who’s bringing the popcorn?'); }}>Sounds like a plan <ArrowRight size={18}/></Button></Sheet><Toast message={toast} onClose={closeToast}/></div>;
}

import { normalizeSearch, type Provider, type Title } from './data';
import type { Preferences } from './preferences';
export function hasFreeOffer(title: Title) { return title.providers.some((offer) => offer.type === 'free'); }
export function onServices(title: Title, services: readonly string[]) { return title.providers.some((offer) => offer.type === 'stream' && services.includes(offer.providerId)); }
export function canDiscover(title: Title, prefs: Preferences) { return (!prefs.freeOnly || hasFreeOffer(title)) && (!prefs.languages.length || title.languages.some((l) => prefs.languages.includes(l))); }
export function offerLabel(title: Title, providers: readonly Provider[], prefs: Preferences) {
  const own = title.providers.find((o) => o.type === 'stream' && prefs.services.includes(o.providerId));
  const free = title.providers.find((o) => o.type === 'free');
  const offer = prefs.freeOnly ? free : own ?? title.providers.find((o) => o.type === 'stream') ?? free ?? title.providers[0];
  const provider = providers.find((p) => p.id === offer?.providerId);
  return { provider, included: !prefs.freeOnly && Boolean(own), text: !offer ? 'No offer listed' : prefs.freeOnly || offer.type === 'free' ? `Free on ${provider?.name ?? offer.providerId}` : own ? `On your ${provider?.name ?? offer.providerId}` : `${provider?.name ?? offer.providerId}${offer.type === 'rent' || offer.type === 'buy' ? ` · ${offer.type}` : ''}` };
}
const featuredIds = ['laapataa-ladies', 'manjummel-boys', 'vikram', 'panchayat', '12th-fail', 'aavesham', 'knives-out', 'rrr', 'jailer', 'severance'];
export function homeSelections(titles: Title[], prefs: Preferences) {
  const eligible = titles.filter((t) => canDiscover(t, prefs));
  const included = eligible.filter((t) => prefs.freeOnly ? hasFreeOffer(t) : onServices(t, prefs.services));
  const priority = (title: Title) => { const index = featuredIds.indexOf(title.id); return index === -1 ? 100 : index; };
  const pool = prefs.freeOnly || prefs.services.length ? included : eligible;
  const hero = [...pool].sort((a, b) => priority(a) - priority(b) || b.tmdbRating - a.tmdbRating || a.id.localeCompare(b.id)).slice(0, 5);
  const trending = featuredIds.map((id) => eligible.find((t) => t.id === id)).filter((t): t is Title => Boolean(t));
  return { eligible, included, hero, trending };
}
export function greeting(name: string, date: Date) {
  const hour = date.getHours();
  const time = hour < 5 ? 'late night' : hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 20 ? 'evening' : 'night';
  return `${date.toLocaleDateString('en-IN', { weekday: 'long' })} ${time}${name.trim() ? `, ${name.trim().split(/\s+/)[0]}` : ''}. Kya plan hai?`;
}
export interface PersonMatch { name: string; titles: Title[]; role: string }
export function peopleMatches(titles: Title[], query: string): PersonMatch[] {
  const tokens = normalizeSearch(query).split(' ').filter(Boolean);
  if (!tokens.length) return [];
  const found = new Map<string, PersonMatch>();
  for (const title of titles) for (const name of [...title.cast, title.director]) {
    const normalized = normalizeSearch(name);
    if (!tokens.every((token) => normalized.includes(token))) continue;
    const match = found.get(name) ?? { name, titles: [], role: name === title.director ? 'Director' : 'Cast' };
    if (!match.titles.some((t) => t.id === title.id)) match.titles.push(title);
    found.set(name, match);
  }
  return [...found.values()].sort((a, b) => b.titles.length - a.titles.length || a.name.localeCompare(b.name));
}

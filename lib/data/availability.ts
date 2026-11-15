import type { Offer, Title } from './types';
/** Explicit offer audio overrides catalogue audio; a dub is never original availability. */
export function hasOriginalAudio(title: Title, offer: Offer) { return (offer.languages ?? title.languages).includes(title.originalLanguage); }
export function canPickTonight(title: Title) { return !title.availability && title.providers.some(o => hasOriginalAudio(title, o) && (o.type === 'stream' || o.type === 'free')); }
export function hasAdsOffer(title: Title) { return canPickTonight(title) && title.providers.some(o => o.type === 'free' && o.ads === true && hasOriginalAudio(title, o)); }
export function verifiedAvailability(title: Title) { return Boolean(title.verifiedAt); }

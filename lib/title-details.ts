
import { formatCopy } from '@/lib/copy';
import { titleCopy } from '@/.generated/copy/title';
import type { ProviderOffer, SimilarTitle, Title } from './data';
import type { Preferences } from './preferences';
import { hasFreeOffer, onServices } from './discovery';
export function versionLabel(source: Title, candidate: Title): string | null {
  if (source.remakeOf === candidate.id) return formatCopy(titleCopy['original_value_version'], { p1: candidate.originalLanguage });
  if (candidate.remakeOf === source.id) return formatCopy(titleCopy['value_remake'], { p1: candidate.originalLanguage });
  return null;
}
export function titleRecommendations(source: Title, similar: SimilarTitle[], versions: Title[], prefs: Preferences, onlyServices: boolean) {
  const pinned = versions.map((title) => ({ title, score: 0, because: versionLabel(source, title)! }));
  const candidates = similar.filter((r) => !versions.some((t) => t.id === r.title.id));
  const allowed = (title: Title) => prefs.freeOnly ? hasFreeOffer(title) : !onlyServices || onServices(title, prefs.services);
  // The explicitly labelled original/remake is an editorial exception to the service filter.
  return [...pinned, ...candidates.filter((r) => allowed(r.title))].slice(0, 8);
}
export function titleAvailabilityMessage(offers: ProviderOffer[], services: readonly string[]) {
  if (!services.length || offers.some((o) => services.includes(o.providerId) && o.type === 'stream')) return null;
  const names = [...new Set(offers.filter((o) => o.type === 'stream').map((o) => o.provider.name))];
  return formatCopy(titleCopy['not_on_your_apps_value'], { p1: names.length ? formatCopy(titleCopy['streaming_on_value'], { p1: names.join(', ') }) : formatCopy(titleCopy['no_subscription_streaming_listed']) });
}
export function whatsappShareUrl(text: string, url: string) { return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`; }

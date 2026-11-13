import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';
import { dataSource } from '@/lib/data';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
import type { PollOption } from '@/components/poll-room';
export async function pollOptions(ids?: string[]): Promise<PollOption[]> {
  if (!ids?.length) return [];
  const catalog = await dataSource.listTitles();
  return Promise.all(catalog.filter((t) => !ids || ids.includes(t.id)).map(async (t) => {
    const offers = await dataSource.getProviders(t.id), offer = offers.find((o) => o.type === 'stream' || o.type === 'free') ?? offers[0];
    return { id: t.id, title: t.title, language: t.originalLanguage, runtime: t.runtimeMin ? formatCopy(commonCopy['minutes'], { count: t.runtimeMin }) : formatCopy(commonCopy['seasons_label'], { count: t.seasons ?? 1, unit: (t.seasons ?? 1) === 1 ? formatCopy(commonCopy['season']) : formatCopy(commonCopy['seasons']) }), rating: t.tmdbRating,
      provider: offer ? { name: offer.provider.name, color: offer.provider.color, url: offer.deepLink, type: offer.type } : null,
      poster: <GeneratedPosterSvg title={t} definitionId={`vote-${t.id}`}/> };
  }));
}

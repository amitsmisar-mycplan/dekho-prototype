import type { Metadata } from 'next';
import { dataSource } from '@/lib/data';
import { decodePoll } from '@/lib/polls';
import { PollRoom } from '@/components/poll-room';
import { brand } from '@/lib/brand';
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ poll?: string }> };
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params, { poll } = await searchParams, snapshot = decodePoll(poll, id);
  return { title: snapshot?.name ?? `Movie night on ${brand.name}`, description: 'Vote in 10 seconds, no app needed', openGraph: { title: snapshot?.name ?? 'Movie night', description: 'Vote in 10 seconds, no app needed', images: snapshot ? [{ url: `/p/${id}/opengraph-image?${new URLSearchParams({ poll: poll! })}`, width: 1200, height: 630 }] : [] } };
}
export default async function PollPage({ params, searchParams }: Props) { const { id } = await params; return <PollRoom id={id} snapshot={decodePoll((await searchParams).poll, id)} titles={await dataSource.listTitles()}/>; }

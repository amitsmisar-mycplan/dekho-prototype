import type { Metadata } from 'next';
import { pollOptions } from '@/lib/polls/options';
import { resolvePoll } from '@/lib/polls/server';
import { cloudPollsEnabled } from '@/lib/polls/config';
import { PollRoom } from '@/components/poll-room';
import { brand } from '@/lib/brand';
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ poll?: string; demo?: string }> };
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params, { poll } = await searchParams, snapshot = await resolvePoll(id, poll);
  return { title: snapshot?.name ?? `Movie night on ${brand.name}`, description: 'Vote in 10 seconds, no app needed', openGraph: { title: snapshot?.name ?? 'Movie night', description: 'Vote in 10 seconds, no app needed', images: snapshot ? [{ url: cloudPollsEnabled ? `/p/${id}/opengraph-image` : `/p/${id}/opengraph-image?${new URLSearchParams({ poll: poll! })}`, width: 1200, height: 630 }] : [] } };
}
export default async function PollPage({ params, searchParams }: Props) { const { id } = await params, query = await searchParams, snapshot = await resolvePoll(id, query.poll); return <PollRoom id={id} snapshot={snapshot} options={await pollOptions(snapshot?.titleIds)} demo={query.demo === '1'}/>; }

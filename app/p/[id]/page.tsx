
import { formatCopy } from '@/lib/copy';
import { voterCopy } from '@/.generated/copy/voter';
import type { Metadata } from 'next';
import { pollOptions } from '@/lib/polls/options';
import { resolvePoll } from '@/lib/polls/server';
import { cloudPollsEnabled } from '@/lib/polls/config';
import { PollRoom } from '@/components/poll-room';
import { brand } from '@/lib/brand';
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ poll?: string; demo?: string }> };
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params, { poll } = await searchParams, snapshot = await resolvePoll(id, poll);
  return { title: snapshot?.name ?? formatCopy(voterCopy['movie_night_on_value'], { p1: brand.name }), description: formatCopy(voterCopy['vote_in_10_seconds_no_app_needed']), openGraph: { title: snapshot?.name ?? formatCopy(voterCopy['movie_night']), description: formatCopy(voterCopy['vote_in_10_seconds_no_app_needed']), images: snapshot ? [{ url: cloudPollsEnabled ? `/p/${id}/opengraph-image` : `/p/${id}/opengraph-image?${new URLSearchParams({ poll: poll! })}`, width: 1200, height: 630 }] : [] } };
}
export default async function PollPage({ params, searchParams }: Props) { const { id } = await params, query = await searchParams, snapshot = await resolvePoll(id, query.poll); return <PollRoom id={id} snapshot={snapshot} options={await pollOptions(snapshot?.titleIds)} demo={query.demo === '1'}/>; }

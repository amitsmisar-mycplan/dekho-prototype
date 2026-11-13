
import { formatCopy } from '@/lib/copy';
import { voterCopy } from '@/.generated/copy/voter';
import { decodeResult } from '@/lib/polls/result-card';
import { SharedResult } from '@/components/shared-result';
import type { Metadata } from 'next';
import { pollOptions } from '@/lib/polls/options';
import { resolvePoll } from '@/lib/polls/server';
import { PollRoom } from '@/components/poll-room';
export default async function PollResult({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ poll?: string; demo?: string; result?: string }> }) { const { id } = await params, query = await searchParams, card = decodeResult(query.result); if (card?.poll.id === id) return <SharedResult card={card} options={await pollOptions(card.poll.titleIds)}/>; const snapshot = await resolvePoll(id, query.poll); return <PollRoom id={id} snapshot={snapshot} options={await pollOptions(snapshot?.titleIds)} result demo={query.demo === '1'}/>; }

export async function generateMetadata({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ result?: string }> }): Promise<Metadata> { const { id } = await params, { result } = await searchParams, card = decodeResult(result); return card?.poll.id === id ? { title: card.poll.name, openGraph: { images: [{ url: `/p/${id}/result-image?${new URLSearchParams({ result: result! })}`, width: 1200, height: 630 }] } } : { title: formatCopy(voterCopy['movie_night_results']) }; }

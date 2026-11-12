import { dataSource } from '@/lib/data';
import { decodePoll } from '@/lib/polls';
import { PollRoom } from '@/components/poll-room';
export default async function PollResult({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ poll?: string }> }) { const { id } = await params; return <PollRoom id={id} snapshot={decodePoll((await searchParams).poll, id)} titles={await dataSource.listTitles()} result/>; }

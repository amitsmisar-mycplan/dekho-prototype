import { dataSource } from '@/lib/data';
import { PollCreate } from '@/components/poll-create';
export default async function NewPollPage() { return <PollCreate titles={await dataSource.listTitles()}/>; }

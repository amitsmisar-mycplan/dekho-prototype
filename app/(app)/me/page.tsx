import { dataSource } from '@/lib/data';
import { Profile } from '@/components/profile';
export default async function MePage() { return <Profile providers={await dataSource.listProviders()}/>; }

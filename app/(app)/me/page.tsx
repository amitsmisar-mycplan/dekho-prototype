import { cloudPollsEnabled } from '@/lib/polls/config';
import { dataSource } from '@/lib/data';
import { Profile } from '@/components/profile';
export default async function MePage() { return <>{!cloudPollsEnabled && <p className="page-content"><span className="chip">local demo mode</span></p>}<Profile providers={await dataSource.listProviders()} titles={await dataSource.listTitles()}/></>; }

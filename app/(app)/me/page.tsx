
import { formatCopy } from '@/lib/copy';
import { profileCopy } from '@/.generated/copy/profile';
import { cloudPollsEnabled } from '@/lib/polls/config';
import { dataSource } from '@/lib/data';
import { Profile } from '@/components/profile';
export default async function MePage() { return <>{!cloudPollsEnabled && <p className="page-content"><span className="chip">{formatCopy(profileCopy['local_demo_mode'])}</span></p>}<Profile providers={await dataSource.listProviders()} titles={await dataSource.listTitles()}/></>; }

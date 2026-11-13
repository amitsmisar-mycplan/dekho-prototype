import { dataSource, languages } from '@/lib/data';
import { Onboarding } from '@/components/onboarding';
export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  return <Onboarding providers={await dataSource.listProviders()} languages={[...languages]} edit={params.edit === 'services'}/>;
}

import { dataSource, selectableLanguages } from '@/lib/data';
import { Onboarding } from '@/components/onboarding';
export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  return <Onboarding providers={await dataSource.listProviders()} languages={selectableLanguages(await dataSource.listTitles())} edit={params.edit === 'services'}/>;
}

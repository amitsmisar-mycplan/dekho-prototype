import DesignKit from '@/components/design-kit';
import { dataSource } from '@/lib/data';
export default async function KitPage() { return <DesignKit providers={await dataSource.listProviders()}/>; }

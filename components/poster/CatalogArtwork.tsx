'use client';
import { useEffect, useState } from 'react';
import { dataSource, type Provider, type Title } from '@/lib/data';
import { usePrototype } from '@/lib/store';
import { GeneratedPoster } from './GeneratedPoster';
let directory: Promise<Provider[]> | undefined;
export function CatalogArtwork({ title, variant = 'poster' }: { title: Title; variant?: 'poster' | 'backdrop' }) {
  const services = usePrototype((s) => s.prefs.services); const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => { let active = true; directory ??= dataSource.listProviders(); directory.then((items) => { if (active) setProviders(items); }); return () => { active = false; }; }, []);
  const offer = title.providers.find((o) => o.type === 'stream' && services.includes(o.providerId));
  const provider = providers.find((p) => p.id === offer?.providerId);
  return <GeneratedPoster title={title} variant={variant} serviceColor={provider?.color} serviceName={provider?.name}/>;
}

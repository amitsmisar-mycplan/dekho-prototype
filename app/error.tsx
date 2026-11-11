'use client';
import { Button } from '@/components/ui';
export default function ErrorPage({ reset }: {
    reset: () => void;
}) { return <div className="page-content empty-state"><h1>A little<br />intermission.</h1><p style={{ marginTop: 20 }}>Something didn’t load. Let’s give it another take.</p><Button onClick={reset}>Try again</Button></div>; }

'use client';
import Link from 'next/link';
export default function PollError({ reset }: { reset: () => void }) { return <div className="vote-page poll-missing" role="alert"><div className="state-symbol" aria-hidden="true">↻</div><h1>A little intermission.</h1><p>The movie night couldn’t load. Check your connection and give it another take.</p><button className="button button-primary" onClick={reset}>Try again</button><Link className="text-action" href="/">Back to tonight</Link></div>; }

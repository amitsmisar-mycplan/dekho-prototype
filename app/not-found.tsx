import Link from 'next/link';
export default function NotFound() { return <div className="page-content empty-state"><h1>Wrong screen,<br />right company.</h1><p style={{ marginTop: 20 }}>That page isn’t in tonight’s lineup.</p><Link href="/" className="button button-primary">Back to tonight</Link></div>; }

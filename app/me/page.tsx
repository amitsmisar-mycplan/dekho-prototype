import Link from 'next/link';
import { UserRound, ArrowRight } from 'lucide-react';
import { brand } from '@/lib/brand';
export default function MePage() { return <div className="page-content"><p className="eyebrow">YOUR LITTLE CINEMA CORNER</p><h1>Make yourself<br />at home.</h1><div className="empty-state bordered"><UserRound size={38}/><h2>Same you. Better movie nights.</h2><p>Your services, languages and saved picks will live here. This is the foundation preview of {brand.name}.</p><Link className="button button-primary" href="/kit">See what’s taking shape <ArrowRight size={18}/></Link></div><div className="prototype-note">Local prototype · No account needed · Nothing sent to a server</div></div>; }

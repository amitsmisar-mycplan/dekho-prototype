import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
export default function SearchPage() { return <div className="page-content"><p className="eyebrow">FIND YOUR NEXT FAVOURITE</p><h1>A good night<br />starts here.</h1><div className="empty-state bordered"><Search size={38}/><h2>The search party is on its way.</h2><p>Title search and Hinglish aliases arrive with the catalog. For now, explore how the app will feel.</p><Link className="button button-primary" href="/kit">Explore the design kit <ArrowRight size={18}/></Link></div></div>; }

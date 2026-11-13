
import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';
import Link from 'next/link';
export default function NotFound() { return <div className="page-content empty-state"><h1>{formatCopy(commonCopy['wrong_screen'])}<br />{formatCopy(commonCopy['right_company'])}</h1><p style={{ marginTop: 20 }}>{formatCopy(commonCopy['that_page_isn_t_in_tonight_s_lineup'])}</p><Link href="/" className="button button-primary">{formatCopy(commonCopy['back_to_tonight'])}</Link></div>; }

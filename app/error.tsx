'use client';
import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';

import { Button } from '@/components/ui';
export default function ErrorPage({ reset }: {
    reset: () => void;
}) { return <div className="page-content empty-state"><h1>{formatCopy(commonCopy['a_little'])}<br />{formatCopy(commonCopy['intermission'])}</h1><p style={{ marginTop: 20 }}>{formatCopy(commonCopy['something_didn_t_load_let_s_give_it_another_take'])}</p><Button onClick={reset}>{formatCopy(commonCopy['try_again'])}</Button></div>; }

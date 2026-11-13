'use client';
import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';

import { uiSpring } from '@/lib/motion';
import { AnimatePresence, motion, useReducedMotion, useDragControls } from 'motion/react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { GeneratedPoster } from '@/components/poster/GeneratedPoster';
import { CatalogArtwork } from '@/components/poster/CatalogArtwork';
import type { Title } from '@/lib/data';
import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
}) {
    return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
export function Chip({ selected = false, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
}) { return <button className={`chip ${selected ? 'selected' : ''}`} aria-pressed={selected} {...props}>{children}{selected && <Check size={14}/>}</button>; }
export function ProviderChip({ name, color = 'var(--text)' }: { name: string; color?: string }) {
    return <span className="provider" style={{ color }}>{name}</span>;
}
export function PosterCard({ title, palette = ['#733842', '#202337'], catalogTitle, selected, onAdd, loading = false }: {
    title: string; catalogTitle?: Title; posterPath?: string | null; eyebrow?: string; palette?: [string, string]; selected?: boolean; onAdd?: () => void; loading?: boolean;
}) {
    if (loading) return <div className="poster skeleton" role="status" aria-label={formatCopy(commonCopy['loading_poster'])}/>;
    return <div className="poster generated-poster-shell">
      {catalogTitle ? <CatalogArtwork title={catalogTitle}/> : <GeneratedPoster title={{ id: title.toLowerCase().replace(/\s+/g, '-'), title, palette, type: 'movie', genres: ['Drama'], moods: ['Feel-good'], originalLanguage: 'Hindi', year: 0 }}/>}
      {onAdd && <button className={`poster-add ${selected ? 'added' : ''}`} aria-label={formatCopy(commonCopy['value_value_value_shortlist'], { p1: selected ? formatCopy(commonCopy['remove']) : formatCopy(commonCopy['add']), p2: title, p3: selected ? formatCopy(commonCopy['from']) : formatCopy(commonCopy['to']) })} aria-pressed={selected} onClick={onAdd}>{selected ? <Check size={18}/> : <Plus size={18}/>}</button>}
    </div>;
}
export function SectionHeader({ eyebrow, title, action, onAction }: {
    eyebrow?: string;
    title: string;
    action?: string;
    onAction?: () => void;
}) { return <div className="section-header"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <button className="text-action" onClick={onAction}>{action}<ArrowRight size={16}/></button>}</div>; }
export function AvatarStack({ names = [formatCopy(commonCopy['am']), formatCopy(commonCopy['nk']), formatCopy(commonCopy['sr'])] }: {
    names?: string[];
}) { return <div className="avatars" role="img" aria-label={names.join(formatCopy(commonCopy['separator_3']))}>{names.map((name, i) => <span key={`${name}-${i}`} style={{ '--avatar-index': i } as CSSProperties}>{name}</span>)}</div>; }
let activeSheetCount = 0;
export function Sheet({ open, onClose, title, children, fullScreen = false }: {
    open: boolean;
    fullScreen?: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}) {
    const reduced = useReducedMotion();
    const dragControls = useDragControls();
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    useEffect(() => setPortal(document.getElementById('overlays')), []);
    useEffect(() => {
        if (!open || !portal)
            return;
        const backgrounds = Array.from(document.querySelectorAll<HTMLElement>('.app-scroll, .bottom-nav'));
        activeSheetCount++;
        backgrounds.forEach((element) => { element.inert = true; });
        const previous = document.activeElement as HTMLElement | null;
        const timer = setTimeout(() => ref.current?.focus(), 0);
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                onClose();
            if (event.key === 'Tab') {
                const nodes = ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, textarea, select, [tabindex="0"]');
                if (!nodes?.length) {
                    event.preventDefault();
                    return;
                }
                const first = nodes[0], last = nodes[nodes.length - 1];
                if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
                    event.preventDefault();
                    last.focus();
                }
                else if (!event.shiftKey && (document.activeElement === last || document.activeElement === ref.current)) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handler);
        return () => { clearTimeout(timer); document.removeEventListener('keydown', handler); activeSheetCount--; backgrounds.forEach((element) => { element.inert = activeSheetCount > 0; }); if (!activeSheetCount) previous?.focus(); };
    }, [open, onClose, portal]);
    if (!portal)
        return null;
    return createPortal(<AnimatePresence>{open && <div className="sheet-layer"><motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/><motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={id} className={`sheet ${fullScreen ? 'sheet-fullscreen' : ''}`} initial={{ y: reduced ? 0 : '100%' }} animate={{ y: 0 }} exit={{ y: reduced ? 0 : '100%', opacity: 0 }} transition={reduced ? { duration: 0 } : uiSpring} drag="y" dragListener={false} dragControls={dragControls} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: .5 }} onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 500)
        onClose(); }}><div className="sheet-handle" onPointerDown={(event) => dragControls.start(event)}/><div className="sheet-heading"><h2 id={id}>{title}</h2><button className="icon-button" onClick={onClose} aria-label={formatCopy(commonCopy['close_sheet'])}><X size={20}/></button></div>{children}</motion.div></div>}</AnimatePresence>, portal);
}
export function Toast({ message, onClose }: {
    message: string;
    onClose: () => void;
}) {
    useEffect(() => { if (!message)
        return; const timeout = setTimeout(onClose, 3200); return () => clearTimeout(timeout); }, [message, onClose]);
    return <AnimatePresence>{message && <motion.div className="toast" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Check size={18}/>{message}<button className="icon-button" aria-label={formatCopy(commonCopy['dismiss_notification'])} onClick={onClose}><X size={16}/></button></motion.div>}</AnimatePresence>;
}

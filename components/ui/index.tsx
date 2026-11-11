'use client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
}) {
    return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
export function Chip({ selected = false, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
}) { return <button className={`chip ${selected ? 'selected' : ''}`} aria-pressed={selected} {...props}>{children}{selected && <Check size={14}/>}</button>; }
export const providers = [['Netflix', '#FF7384'], ['Prime Video', '#65CFFF'], ['JioHotstar', '#C5A1FF'], ['SonyLIV', '#EDC66C'], ['ZEE5', '#E6B4F7'], ['Aha', '#FFA878'], ['Sun NXT', '#FF87A4'], ['MX Player', '#71C6FF'], ['Apple TV+', '#F5F3FA'], ['Lionsgate Play', '#9FE7C6']] as const;
export function ProviderChip({ name }: {
    name: string;
}) { return <span className="provider" style={{ color: providers.find((p) => p[0] === name)?.[1] }}>{name}</span>; }
export function PosterCard({ title, eyebrow = 'A little movie magic', palette = ['#733842', '#202337'], selected, onAdd, loading = false }: {
    title: string;
    eyebrow?: string;
    palette?: [
        string,
        string
    ];
    selected?: boolean;
    onAdd?: () => void;
    loading?: boolean;
}) {
    if (loading)
        return <div className="poster skeleton" role="status" aria-label="Loading poster"/>;
    return <div className="poster" style={{ '--poster-a': palette[0], '--poster-b': palette[1] } as CSSProperties}>
    <div className="poster-orbit" aria-hidden="true"/><span className="poster-eyebrow">{eyebrow}</span><strong>{title}</strong><span className="poster-caption">A CINEMA NIGHT ORIGINAL</span>
    {onAdd && <button className={`poster-add ${selected ? 'added' : ''}`} aria-label={`${selected ? 'Remove' : 'Add'} ${title} ${selected ? 'from' : 'to'} shortlist`} aria-pressed={selected} onClick={onAdd}>{selected ? <Check size={18}/> : <Plus size={18}/>}</button>}
  </div>;
}
export function SectionHeader({ eyebrow, title, action, onAction }: {
    eyebrow?: string;
    title: string;
    action?: string;
    onAction?: () => void;
}) { return <div className="section-header"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <button className="text-action" onClick={onAction}>{action}<ArrowRight size={16}/></button>}</div>; }
export function AvatarStack({ names = ['AM', 'NK', 'SR'] }: {
    names?: string[];
}) { return <div className="avatars" role="img" aria-label={names.join(', ')}>{names.map((name, i) => <span key={`${name}-${i}`} style={{ '--avatar-index': i } as CSSProperties}>{name}</span>)}</div>; }
export function Sheet({ open, onClose, title, children }: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}) {
    const reduced = useReducedMotion();
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    useEffect(() => setPortal(document.getElementById('overlays')), []);
    useEffect(() => {
        if (!open || !portal)
            return;
        const backgrounds = Array.from(document.querySelectorAll<HTMLElement>('.app-scroll, .bottom-nav'));
        backgrounds.forEach((element) => { element.inert = true; });
        const previous = document.activeElement as HTMLElement | null;
        const timer = setTimeout(() => ref.current?.focus(), 0);
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                onClose();
            if (event.key === 'Tab') {
                const nodes = ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, [tabindex="0"]');
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
        return () => { clearTimeout(timer); document.removeEventListener('keydown', handler); backgrounds.forEach((element) => { element.inert = false; }); previous?.focus(); };
    }, [open, onClose, portal]);
    if (!portal)
        return null;
    return createPortal(<AnimatePresence>{open && <div className="sheet-layer"><motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/><motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={id} className="sheet" initial={{ y: reduced ? 0 : '100%' }} animate={{ y: 0 }} exit={{ y: reduced ? 0 : '100%', opacity: 0 }} transition={reduced ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: .5 }} onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 500)
        onClose(); }}><div className="sheet-handle"/><div className="sheet-heading"><h2 id={id}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close sheet"><X size={20}/></button></div>{children}</motion.div></div>}</AnimatePresence>, portal);
}
export function Toast({ message, onClose }: {
    message: string;
    onClose: () => void;
}) {
    useEffect(() => { if (!message)
        return; const timeout = setTimeout(onClose, 3200); return () => clearTimeout(timeout); }, [message, onClose]);
    return <AnimatePresence>{message && <motion.div className="toast" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Check size={18}/>{message}<button className="icon-button" aria-label="Dismiss notification" onClick={onClose}><X size={16}/></button></motion.div>}</AnimatePresence>;
}

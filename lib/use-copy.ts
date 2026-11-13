'use client';
import { useCallback, useSyncExternalStore } from 'react';
import { formatCopy, toneForLanguages, type Tone, type CopyLine } from './copy';
function current(): Tone {
  try { const prefs = JSON.parse(localStorage.getItem('dekho-prototype-v0') ?? 'null')?.state?.prefs; return toneForLanguages(Array.isArray(prefs?.languages) ? prefs.languages : []); } catch { return 'indianEnglish'; }
}
function subscribe(listener: () => void) { window.addEventListener('dekho-preferences-changed', listener); window.addEventListener('storage', listener); return () => { window.removeEventListener('dekho-preferences-changed', listener); window.removeEventListener('storage', listener); }; }
/** Unknown visitors get Indian English. Hindi is opt-in through saved languages. */
export function useTone() { return useSyncExternalStore(subscribe, current, () => 'indianEnglish' as const); }

export function useCopy(override?: Tone) { const saved=useTone(), tone=override??saved; return useCallback((line:CopyLine, params:Record<string,unknown>={}, selected:Tone=tone)=>formatCopy(line,params,selected),[tone]); }

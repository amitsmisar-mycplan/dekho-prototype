'use client';
import { useCallback, useRef, useState } from 'react';
import { Sheet } from './ui';
import { formatCopy } from '@/lib/copy';
import { titleCopy } from '@/.generated/copy/title';
import type { Provider, Title } from '@/lib/data';
import { reportReasons, submitAvailabilityReport, type ReportReason } from '@/lib/availability-reports';
import { cloudPollsEnabled } from '@/lib/polls/config';
export function AvailabilityReport({ title, providers }: { title: Title; providers: Provider[] }) {
  const t = formatCopy;
  const [open, setOpen] = useState(false), [reason, setReason] = useState<ReportReason | ''>(''), [providerId, setProviderId] = useState('');
  const [note, setNote] = useState(''), [tag, setTag] = useState(''), [busy, setBusy] = useState(false), [saved, setSaved] = useState(false), [error, setError] = useState(false);
  const sending = useRef(false);
  const close = useCallback(() => { if (!sending.current) setOpen(false); }, []);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (!reason || sending.current || saved) return;
    sending.current = true; setBusy(true); setError(false);
    try { await submitAvailabilityReport({ titleId: title.id, providerId: providerId || null, reason, note, testerTag: tag }); setSaved(true); }
    catch { setError(true); }
    finally { sending.current = false; setBusy(false); }
  }
  return <><button className="text-action availability-report-link" onClick={() => { setOpen(true); setSaved(false); setError(false); setReason(''); setNote(''); setProviderId(title.providers.length && new Set(title.providers.map(o => o.providerId)).size === 1 ? title.providers[0].providerId : ''); }}>{t(titleCopy.report_link)}</button>
    <Sheet open={open} onClose={close} title={t(titleCopy.report_title)}>
      {saved ? <div className="availability-report-form" role="status"><p>{t(titleCopy.report_sent)}</p><button className="button button-primary" onClick={close}>{t(titleCopy.report_done)}</button></div> : <form className="availability-report-form" onSubmit={submit}>
        <p>{title.title}</p><label htmlFor="report-provider">{t(titleCopy.report_provider)}</label><select id="report-provider" value={providerId} onChange={e => setProviderId(e.target.value)} disabled={busy}><option value="">{t(titleCopy.report_unspecified)}</option>{providers.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
        <fieldset disabled={busy}><legend>{t(titleCopy.report_reason)}</legend>{reportReasons.map(value => <label className="report-reason" key={value}><input type="radio" name="report-reason" value={value} checked={reason === value} onChange={() => setReason(value)} required/>{t(titleCopy[value])}</label>)}</fieldset>
        <label htmlFor="report-note">{t(titleCopy.report_note)}</label><textarea id="report-note" rows={3} maxLength={500} value={note} onChange={e => setNote(e.target.value)} disabled={busy}/>
        <label htmlFor="report-tag">{t(titleCopy.report_tag)}</label><input id="report-tag" maxLength={40} value={tag} onChange={e => setTag(e.target.value)} disabled={busy}/>
        {!cloudPollsEnabled && <p role="status">{t(titleCopy.report_unavailable)}</p>}{error && <p role="alert">{t(titleCopy.report_error)}</p>}
        <button className="button button-primary" type="submit" disabled={busy || !reason || !cloudPollsEnabled}>{t(busy ? titleCopy.report_sending : titleCopy.report_send)}</button>{busy && <div className="skeleton" style={{ height: 6 }} aria-hidden="true"/>}
      </form>}
    </Sheet></>;
}

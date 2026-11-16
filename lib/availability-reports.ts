import { cloudPollsEnabled } from './polls/config';
import { dataSource } from './data';
export const reportReasons = ['could_not_play', 'wrong_app', 'wrong_language', 'free_elsewhere'] as const;
export type ReportReason = typeof reportReasons[number];
export interface AvailabilityReport { titleId: string; providerId: string | null; reason: ReportReason; note: string; testerTag: string }
export function validAvailabilityReport(input: AvailabilityReport) {
  return /^[a-z0-9-]{1,100}$/.test(input.titleId) && (input.providerId === null || /^[a-z0-9-]{1,100}$/.test(input.providerId)) && reportReasons.includes(input.reason) && typeof input.note === 'string' && input.note.length <= 500 && typeof input.testerTag === 'string' && input.testerTag.length <= 40;
}
/** Device capability comes from the shared Supabase transport, never an RPC argument. */
export async function submitAvailabilityReport(input: AvailabilityReport) {
  if (!cloudPollsEnabled || !validAvailabilityReport(input)) throw new Error('Report unavailable');
  const [title, providers] = await Promise.all([dataSource.getTitle(input.titleId), dataSource.listProviders()]);
  if (!title || (input.providerId && !providers.some(p => p.id === input.providerId))) throw new Error('Invalid report');
  const { getSupabaseClient } = await import('./polls/supabase');
  const { error } = await getSupabaseClient().rpc('report_availability', { p_title_id: title.id, p_provider_id: input.providerId, p_reason: input.reason, p_note: input.note.trim(), p_tester_tag: input.testerTag.trim() });
  if (error) throw new Error('Report could not be saved');
}

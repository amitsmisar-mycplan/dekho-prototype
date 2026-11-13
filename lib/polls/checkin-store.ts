import { cloudPollsEnabled } from './config';
import { voterIdentity } from './identity';
import { closedTime, validCheckin, winnerId, type Checkin, type CheckinInput } from './checkins';
import { formatCopy } from '@/lib/copy';
import { checkinCopy } from '@/.generated/copy/checkin';
const key = 'dekho-checkins-v1';
function localRows(): Record<string, Checkin[]> { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; } }
async function rpc(name: string, args: Record<string,unknown>) { const {getSupabaseClient,cloudError} = await import('./supabase'); const {data,error}=await getSupabaseClient().rpc(name,args); if(error)throw cloudError(error); return data; }
export async function getCheckinPolls() {
  if(cloudPollsEnabled) { const {getCloudStore}=await import('./supabase'); return getCloudStore().getVotedPolls(); }
  const {localPollStore}=await import('./local'); return localPollStore.getVotedPolls();
}
export async function getCheckins(id: string): Promise<Checkin[]> { return cloudPollsEnabled ? await rpc('read_checkins',{p_id:id}) : localRows()[id] ?? []; }
export async function saveCheckin(id: string, input: CheckinInput) {
  if(!validCheckin(input)) throw new Error(formatCopy(checkinCopy.error));
  if(cloudPollsEnabled) { await rpc('checkin_on_poll',{p_id:id,p_watched:input.watched,p_rating:input.rating,p_take:input.take}); return; }
  const {localPollStore}=await import('./local'); const poll=await localPollStore.getPoll(id); const me=voterIdentity().id;
  if(!poll || closedTime(poll)>Date.now() || (!poll.ballots?.[me]&&!poll.votes[me]))throw new Error(formatCopy(checkinCopy.error));
  const titles=await (await import('../data')).dataSource.listTitles(); const titleId=winnerId(poll,Object.fromEntries(titles.map(t=>[t.id,t.tmdbRating])))!;
  const all=localRows();all[id]=[...(all[id]??[]).filter(r=>r.device!==me),{...input,take:input.take.trim(),device:me,titleId,name:poll.ballots?.[me]?.name??voterIdentity().name,createdAt:new Date().toISOString()}];localStorage.setItem(key,JSON.stringify(all));window.dispatchEvent(new Event('dekho-polls-v0')); const channel=typeof BroadcastChannel!=='undefined'?new BroadcastChannel('dekho-polls-v0'):null;channel?.postMessage('changed');channel?.close();
}
export function localCheckinRating(titleId: string, pollIds: string[]) { const saved=localRows(); const rows=pollIds.flatMap(id=>saved[id]??[]).filter(r=>r.titleId===titleId&&r.watched===true&&r.rating!==null);return rows.length?{votes:rows.length,percent:Math.round(rows.filter(r=>r.rating!>0).length/rows.length*100)}:null; }

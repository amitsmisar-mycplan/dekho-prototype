export interface VerdictCard { pollId: string; titleId: string; group: string; total: number; watched: number; loved: number; liked: number; takes: { name: string; take: string }[] }
export type VerdictMood = 'loved' | 'liked' | 'split';
/** A strict majority of watched ratings determines the headline. Loved is also positive. */
export function verdictMood(card: Pick<VerdictCard,'watched'|'loved'|'liked'>): VerdictMood {
 if(card.loved > card.watched / 2)return 'loved';
 if(card.loved + card.liked > card.watched / 2)return 'liked';
 return 'split';
}
export function parseVerdict(value: unknown): VerdictCard | null {
 if(!value||typeof value!=='object')return null;
 const v=value as VerdictCard;
 if(typeof v.pollId!=='string'||!/^[A-Za-z0-9_-]{8}$/.test(v.pollId)||typeof v.titleId!=='string'||!/^[a-z0-9-]{1,100}$/.test(v.titleId)||typeof v.group!=='string'||!v.group.trim()||v.group.length>80)return null;
 if(![v.total,v.watched,v.loved,v.liked].every(n=>Number.isInteger(n)&&n>=0&&n<=10000)||!v.total||v.loved+v.liked>v.watched||v.watched>v.total)return null;
 if(!Array.isArray(v.takes)||v.takes.length>2||v.takes.some(t=>!t||typeof t.name!=='string'||!t.name.trim()||t.name.length>40||typeof t.take!=='string'||!t.take.trim()||t.take.length>80))return null;
 return {pollId:v.pollId,titleId:v.titleId,group:v.group,total:v.total,watched:v.watched,loved:v.loved,liked:v.liked,takes:v.takes};
}
export function verdictPreview(mood: VerdictMood): VerdictCard {
 return {pollId:'verdict1',titleId:'vikram',group:'College gang',total:2,watched:2,loved:mood==='loved'?2:0,liked:mood==='liked'?2:mood==='split'?1:0,takes:[{name:'Amit',take:'A brilliant film for our group.'},{name:'Riya',take:'The performances stayed with me.'}]};
}

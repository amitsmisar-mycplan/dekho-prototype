export interface VerdictCard { pollId: string; titleId: string; group: string; total: number; watched: number; loved: number; take: string }
export function parseVerdict(value: unknown): VerdictCard | null {
 if(!value||typeof value!=='object')return null;
 const v=value as VerdictCard;
 if(typeof v.pollId!=='string'||!/^[A-Za-z0-9_-]{8}$/.test(v.pollId)||typeof v.titleId!=='string'||!/^[a-z0-9-]{1,100}$/.test(v.titleId)||typeof v.group!=='string'||!v.group.trim()||v.group.length>80||typeof v.take!=='string'||v.take.length>80)return null;
 if(![v.total,v.watched,v.loved].every(n=>Number.isInteger(n)&&n>=0&&n<=10000)||!v.total||v.loved>v.watched||v.watched>v.total)return null;
 return {pollId:v.pollId,titleId:v.titleId,group:v.group,total:v.total,watched:v.watched,loved:v.loved,take:v.take};
}

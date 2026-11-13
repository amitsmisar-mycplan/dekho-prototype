import env from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID, randomBytes } from 'node:crypto';
env.loadEnvConfig(process.cwd(),false,{info(){},error(){}});
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if(!url||!key)throw Error('Supabase configuration missing');
let role='';try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url')).role;}catch{}
if(role==='service_role'||key.startsWith('sb_secret_'))throw Error('Use only the public anon key');
const client=()=>createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-dekho-device':randomUUID()}}});
const host=client(),friend=client();const id=randomBytes(6).toString('base64url');
async function rpc(c,name,args){const {data,error}=await c.rpc(name,args);if(error)throw Error(`${name} failed (${error.code})`);return data;}
const assert=(v,m)=>{if(!v)throw Error(m);};
await rpc(host,'create_poll',{p_id:id,p_name:'Toss verification — safe to delete',p_note:'Automated toss and check-in verification.',p_creator_name:'Verification host',p_title_ids:['vikram','kaithi'],p_deadline:new Date(Date.now()+600000).toISOString(),p_group_name:'Verification'});
try{
 assert((await host.rpc('toss_poll',{p_id:id})).error,'Empty poll allowed a toss');
 for(const title of ['vikram','kaithi'])await rpc(friend,'vote_on_poll',{p_id:id,p_title_id:title,p_voter_name:'Verification friend',p_value:1});
 assert((await friend.rpc('toss_poll',{p_id:id})).error,'Non-creator allowed to toss');
 const [a,b]=await Promise.all([rpc(host,'toss_poll',{p_id:id}),rpc(host,'toss_poll',{p_id:id})]);
 assert(a.toss&&a.closedAt&&a.winnerId===b.winnerId,'Concurrent tosses disagreed');
 const other=await rpc(friend,'read_poll',{p_id:id});assert(other.winnerId===a.winnerId&&other.toss,'Remote reader disagreed');
 assert((await friend.rpc('vote_on_poll',{p_id:id,p_title_id:'vikram',p_voter_name:'Verification friend',p_value:-1})).error,'Closed poll accepted vote');
 await rpc(friend,'checkin_on_poll',{p_id:id,p_watched:true,p_rating:2,p_take:'Verification take'});
 const rows=await rpc(friend,'read_checkins',{p_id:id});assert(rows[0].titleId===a.winnerId,'Check-in used a different winner');
 console.log(`PASS: creator-only toss, concurrent idempotence, remote reads, closed voting and check-in winner. Verification poll ${id} can be deleted.`);
}finally{await rpc(host,'close_poll',{p_id:id});await host.removeAllChannels();await friend.removeAllChannels();}

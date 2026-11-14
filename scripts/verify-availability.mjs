import env from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID, randomBytes } from 'node:crypto';
env.loadEnvConfig(process.cwd(),false,{info(){},error(){}});
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if(!url||!key)throw Error('Supabase configuration missing');
let role='';try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url')).role;}catch{}
if(role==='service_role'||key.startsWith('sb_secret_'))throw Error('Use only the public anon key');
const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-dekho-device':randomUUID()}}});
const input=title=>({p_id:randomBytes(6).toString('base64url'),p_name:'Availability verification — safe to delete',p_note:'Automated availability guard check',p_creator_name:'Verification host',p_title_ids:[title,'panchayat'],p_deadline:new Date(Date.now()+600000).toISOString(),p_group_name:'Verification'});
for(const title of ['article-15','praktan','super-deluxe','ramprasad-ki-tehrvi']){
 const args=input(title),{data,error}=await client.rpc('create_poll',args);
 if(!error){await client.rpc('close_poll',{p_id:data?.id??args.p_id});throw Error('Migration guard missing: blocked title was accepted');}
 if(!error.message.includes('not streaming in India'))throw Error(`Unexpected guard response (${error.code}); check migration setup`);
 const read=await client.rpc('read_poll',{p_id:args.p_id});if(read.error||read.data!==null)throw Error('Rejected poll was persisted');
 console.log(`PASS: server rejected ${title} and persisted no poll.`);
}
const {data,error}=await client.rpc('create_poll',input('vinci-da'));if(error)throw Error(`Eligible poll rejected (${error.code})`);
const closed=await client.rpc('close_poll',{p_id:data.id});if(closed.error)throw Error('Could not close verification poll');
console.log(`PASS: eligible Hoichoi poll accepted and closed. Verification poll ${data.id} can be deleted.`);
await client.removeAllChannels();

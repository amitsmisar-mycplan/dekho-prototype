import env from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID, randomBytes } from 'node:crypto';
env.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(), key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
if (!url || !key) { console.log('LOCAL DEMO MODE: one or both Supabase values are missing.'); process.exit(2); }
let role = '';
try { role = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role ?? ''; } catch { /* New publishable keys are not JWTs. */ }
if (key.startsWith('sb_secret_') || role === 'service_role') { console.error('Refusing a secret/service-role key in a NEXT_PUBLIC variable. Use the anon/publishable key.'); process.exit(1); }
function client(device) { return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }, global: { headers: device ? { 'x-dekho-device': device } : {} } }); }
const hostId = randomUUID(), friendId = randomUUID();
const host = client(hostId), friend = client(friendId), guest = client();
const assert = (ok, message) => { if (!ok) throw new Error(message); };
async function rpc(c, name, args) { const result = await c.rpc(name, args); if (result.error) throw new Error(`${name} failed (${result.error.code ?? 'network'}). Check the migration/settings.`); return result.data; }
const pollId = randomBytes(6).toString('base64url');
let created = false;
try {
  await rpc(guest, 'read_poll', { p_id: 'p8probe0' });
  console.log('PASS: Supabase configuration and read RPC are reachable.');
  if (process.argv.includes('--probe')) process.exit(0);
  await rpc(host, 'create_poll', { p_id: pollId, p_name: 'P8 verification — safe to delete', p_note: 'Automated two-device adapter check.', p_creator_name: 'Verification host', p_title_ids: ['aavesham', 'drishyam-2'], p_deadline: new Date(Date.now() + 600000).toISOString() }); created = true;
  console.log(`Verification poll: ${pollId}`);
  const mine = await rpc(host, 'my_polls', {}), theirs = await rpc(friend, 'my_polls', {}), publicList = await rpc(guest, 'my_polls', {});
  assert(mine.some((p) => p.id === pollId) && !theirs.some((p) => p.id === pollId) && publicList.length === 0, 'My polls did not enforce private device ownership.');
  assert(!JSON.stringify(mine).includes(hostId), 'My polls exposed a private identity.');
  console.log('PASS: My polls returns only the requesting device’s polls, with safe aliases.');
  const own = await rpc(host, 'read_poll', { p_id: pollId }), other = await rpc(friend, 'read_poll', { p_id: pollId });
  assert(own.creator.id === 'this-device' && other.creator.id !== 'this-device', 'Creator ownership aliases failed.');
  assert(!JSON.stringify([own, other]).includes(hostId), 'A private device ID was exposed.');
  const table = await guest.from('polls').select('creator_device_id').eq('id', pollId);
  assert(Boolean(table.error), 'Direct private-column access was not blocked.');
  assert(Boolean((await friend.rpc('close_poll', { p_id: pollId })).error), 'A non-creator could close the poll.');
  console.log('PASS: public reads work; private device IDs and creator-only closure are protected.');
  const events = [];
  const channel = friend.channel(`poll:${pollId}`, { config: { private: false } }).on('broadcast', { event: '*' }, (event) => events.push(event));
  await new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('Realtime subscription timed out. Enable public channels.')), 15000); channel.subscribe((status) => { if (status === 'SUBSCRIBED') { clearTimeout(timer); resolve(); } }); });
  const vote = (c, title, value, name) => rpc(c, 'vote_on_poll', { p_id: pollId, p_title_id: title, p_value: value, p_voter_name: name });
  await vote(friend, 'aavesham', 1, 'Verification friend');
  assert(Boolean((await friend.rpc('take_on_poll', { p_id: pollId, p_text: 'Too early' })).error), 'An incomplete ballot accepted a take.');
  await vote(friend, 'drishyam-2', -1, 'Verification friend');
  await vote(friend, 'aavesham', -1, 'Verification friend');
  await vote(friend, 'aavesham', 1, 'Verification friend');
  await vote(host, 'aavesham', -1, 'Verification host');
  await vote(host, 'drishyam-2', 1, 'Verification host');
  await rpc(friend, 'take_on_poll', { p_id: pollId, p_text: 'First take' });
  await rpc(friend, 'take_on_poll', { p_id: pollId, p_text: 'One updated take across phones.' });
  assert(Boolean((await friend.rpc('take_on_poll', { p_id: pollId, p_text: 'x'.repeat(81) })).error), 'Oversized take was accepted.');
  const poll = await rpc(host, 'read_poll', { p_id: pollId });
  assert(Object.keys(poll.ballots).length === 2, 'Votes did not remain isolated by device.');
  const remote = Object.values(poll.ballots).find((b) => b.name === 'Verification friend');
  assert(remote.ratings.aavesham.score === 1 && remote.ratings['drishyam-2'].score === -1 && remote.take === 'One updated take across phones.', 'Vote/take upsert was not visible on the other device.');
  assert(poll.ballots['this-device'].ratings.aavesham.score === -1, 'One device overwrote another device’s vote.');
  assert(!JSON.stringify(poll).includes(friendId), 'A private voter ID was exposed.');
  const forged = client(other.creator.id);
  assert(Boolean((await forged.rpc('close_poll', { p_id: pollId })).error), 'A public alias authorized a creator action.');
  await forged.removeAllChannels();
  console.log('PASS: independent devices, vote/take upserts, completion and length guards.');
  await rpc(host, 'close_poll', { p_id: pollId });
  assert(Boolean((await friend.rpc('vote_on_poll', { p_id: pollId, p_title_id: 'aavesham', p_value: -1, p_voter_name: 'Verification friend' })).error), 'Closed poll accepted a vote.');
  assert(Boolean((await friend.rpc('take_on_poll', { p_id: pollId, p_text: 'Late' })).error), 'Closed poll accepted a take.');
  const until = Date.now() + 10000;
  while (Date.now() < until && !['votes', 'takes', 'polls'].every((name) => events.some((e) => e.event === name))) await new Promise((resolve) => setTimeout(resolve, 100));
  assert(['votes', 'takes', 'polls'].every((name) => events.some((e) => e.event === name)), 'Realtime did not deliver every change type. Check public-channel settings.');
  assert(!JSON.stringify(events).includes(hostId) && !JSON.stringify(events).includes(friendId), 'Realtime exposed a private identity.');
  await friend.removeChannel(channel);
  console.log('PASS: Realtime vote/take/closure events and closed-poll write protection.');
  if (process.argv.includes('--quota')) {
    // One creation above plus nineteen more = the same private device's UTC-day quota.
    for (let i = 1; i < 20; i++) {
      const id = randomBytes(6).toString('base64url');
      await rpc(host, 'create_poll', { p_id: id, p_name: 'P8 quota verification — safe to delete', p_note: '', p_creator_name: 'Verification host', p_title_ids: ['aavesham', 'drishyam-2'], p_deadline: new Date(Date.now() + 600000).toISOString() });
      await rpc(host, 'close_poll', { p_id: id });
    }
    const limit = await host.rpc('create_poll', { p_id: randomBytes(6).toString('base64url'), p_name: 'Must not be created', p_note: '', p_creator_name: 'Verification host', p_title_ids: ['aavesham', 'drishyam-2'], p_deadline: new Date(Date.now() + 600000).toISOString() });
    assert(limit.error?.message?.includes('20 polls'), 'The twenty-first poll was not rate-limited.');
    console.log('PASS: the twenty-first creation is rejected by the database. Twenty labelled, closed verification polls may be deleted in Table Editor.');
  }
  console.log('ALL SUPABASE CHECKS PASSED.');
} catch (error) {
  // Our errors are fixed diagnostic strings, never credentials or raw request dumps.
  console.error(error instanceof Error ? error.message : 'Verification failed.');
  if (created) { await host.rpc('close_poll', { p_id: pollId }); console.log(`Verification poll ${pollId} may be removed in Table Editor.`); }
  process.exitCode = 1;
} finally { await Promise.all([host.removeAllChannels(), friend.removeAllChannels(), guest.removeAllChannels()]); }

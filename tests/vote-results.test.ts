import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pollStore, decodePoll, encodePoll, getGroupRating } from '../lib/polls';
import { scorePoll, voterCount, countdown, yesSummary, normalizeBallot } from '../lib/polls/results';
import { resultCard, encodeResult, decodeResult, parseResult } from '../lib/polls/result-card';
import { voterIdentity, saveVoterName } from '../lib/polls/identity';
function storage() { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } }; }
beforeEach(() => { vi.stubGlobal('localStorage', storage()); vi.stubGlobal('window', new EventTarget()); vi.stubGlobal('BroadcastChannel', undefined); });
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
const create = (creator = 'creator01') => pollStore.createPoll({ titleIds: ['vikram', 'kaithi'], name: 'Friday movie night', note: '', creator: { id: creator, name: 'Amit' }, deadline: new Date(Date.now() + 3600000).toISOString(), expectedVoters: 0 });
describe('per-title voting and results', () => {
  it('stores multiple opinions per voter and replaces an edited vote without double counting', async () => {
    const p = await create();
    await pollStore.rateTitle(p.id, 'riya', 'Riya', 'vikram', { score: 1 });
    await pollStore.rateTitle(p.id, 'riya', 'Riya', 'kaithi', { score: -1, take: '' });
    await pollStore.rateTitle(p.id, 'riya', 'Riya', 'vikram', { score: -1 });
    await pollStore.setTake(p.id, 'riya', 'Another night');
    const saved = (await pollStore.getPoll(p.id))!; expect(voterCount(saved)).toBe(1);
    expect(saved.ballots?.riya.ratings.vikram).toEqual({ score: -1 });
    expect(saved.ballots?.riya.take).toBe('Another night');
    expect(await pollStore.getResults(p.id)).toEqual({ vikram: -1, kaithi: -1 });
    expect(scorePoll(saved)[0].takes).toEqual([{ name: 'Riya', score: -1, take: 'Another night' }]);
    expect(await getGroupRating('vikram')).toEqual({ percent: 0, votes: 1 });
  });
  it('uses net thumbs then TMDb, with stable option order for equal ratings', async () => {
    const p = await create();
    await pollStore.rateTitle(p.id, 'a', 'A', 'vikram', { score: 1, take: '' });
    await pollStore.rateTitle(p.id, 'b', 'B', 'vikram', { score: -1, take: '' });
    await pollStore.rateTitle(p.id, 'a', 'A', 'kaithi', { score: 1, take: '' });
    let saved = (await pollStore.getPoll(p.id))!; expect(scorePoll(saved, { vikram: 9, kaithi: 8 })[0].id).toBe('kaithi');
    await pollStore.rateTitle(p.id, 'b', 'B', 'kaithi', { score: -1, take: '' });
    saved = (await pollStore.getPoll(p.id))!;
    expect(scorePoll(saved, { vikram: 8, kaithi: 9 })[0].id).toBe('kaithi');
    expect(scorePoll(saved, { vikram: 8, kaithi: 8 })[0].id).toBe('vikram');
  });
  it('checks ownership and freezes ballots on call-it or deadline, including legacy votes', async () => {
    const p = await create(); await expect(pollStore.closePoll(p.id, 'someone-else')).rejects.toThrow();
    await pollStore.closePoll(p.id, 'creator01');
    await expect(pollStore.rateTitle(p.id, 'a', 'A', 'vikram', { score: 1, take: '' })).rejects.toThrow('closed');
    await expect(pollStore.castVote(p.id, 'a', 'vikram')).rejects.toThrow();
    const next = await create(); vi.useFakeTimers(); vi.setSystemTime(Date.parse(next.deadline));
    await expect(pollStore.rateTitle(next.id, 'a', 'A', 'vikram', { score: 1, take: '' })).rejects.toThrow('closed');
  });
  it('rejects missing names, unknown picks, oversize takes and unsafe voter keys', async () => {
    const p = await create();
    for (const [voter, name, title, take] of [['a', '', 'vikram', ''], ['a', 'Riya', 'unknown', ''], ['a', 'Riya', 'vikram', 'x'.repeat(81)], ['__proto__', 'Riya', 'vikram', '']]) await expect(pollStore.rateTitle(p.id, voter, name, title, { score: 1, take })).rejects.toThrow();
    expect(voterCount((await pollStore.getPoll(p.id))!)).toBe(0);
  });
  it('remembers a first name across polls without putting voter identity in vote links', async () => {
    const before = voterIdentity(); expect(before.name).toBe(''); saveVoterName('  Riya  '); expect(voterIdentity()).toEqual({ id: before.id, name: 'Riya' });
    const p = await create(); const decoded = decodePoll(encodePoll(p), p.id)!; expect(decoded.creator?.name).toBe('Amit'); expect(decoded).not.toHaveProperty('ballots');
  });
  it('counts completed shared nights only for the same creator and overlapping names', async () => {
    const a = await create(), b = await create(), c = await create('other001'), d = await create();
    for (const p of [a, b, c]) { await pollStore.rateTitle(p.id, `v-${p.id}`, p === b ? ' riya ' : 'Riya', 'vikram', { score: 1, take: '' }); await pollStore.closePoll(p.id, p.creator!.id); }
    await pollStore.rateTitle(d.id, 'other', 'Meera', 'vikram', { score: 1, take: '' }); await pollStore.closePoll(d.id, d.creator!.id);
    expect(await pollStore.getStreak(b.id)).toBe(2);
  });
  it('round-trips result counts and takes and rejects malformed result payloads', async () => {
    const p = await create(); await pollStore.rateTitle(p.id, 'a', 'Riya', 'vikram', { score: 1, take: 'पैसा वसूल' });
    const card = resultCard((await pollStore.getPoll(p.id))!); expect(decodeResult(encodeResult(card))).toEqual(card);
    expect(parseResult({ ...card, rows: [{ ...card.rows[0], up: -1 }, card.rows[1]] })).toBeNull();
    expect(parseResult({ ...card, rows: [card.rows[0], card.rows[0]] })).toBeNull(); expect(decodeResult('not-json')).toBeNull();
  });
  it('allows one editable poll take only after every card is rated, and locks it on close', async () => {
    const p = await create();
    await pollStore.rateTitle(p.id, 'riya', 'Riya', 'vikram', { score: 1 });
    await expect(pollStore.setTake(p.id, 'riya', 'Too soon')).rejects.toThrow();
    await pollStore.rateTitle(p.id, 'riya', 'Riya', 'kaithi', { score: 1 });
    await expect(pollStore.setTake(p.id, 'riya', 'x'.repeat(81))).rejects.toThrow();
    await pollStore.setTake(p.id, 'riya', 'First'); await pollStore.setTake(p.id, 'riya', 'Updated');
    const ballot = (await pollStore.getPoll(p.id))!.ballots!.riya;
    expect(ballot.take).toBe('Updated'); expect(Object.values(ballot.ratings).every((r) => !('take' in r))).toBe(true);
    await pollStore.closePoll(p.id, 'creator01'); await expect(pollStore.setTake(p.id, 'riya', 'Late')).rejects.toThrow();
  });
  it('migrates a legacy card take and uses plain-language winner counts', () => {
    expect(normalizeBallot({ name: 'Riya', ratings: { vikram: { score: 1, take: 'Loved it' }, kaithi: { score: -1, take: 'Later' } } })).toEqual({ name: 'Riya', take: 'Loved it', ratings: { vikram: { score: 1 }, kaithi: { score: -1 } } });
    expect(yesSummary(5, 0)).toBe('5 of 5 said yes'); expect(yesSummary(4, 1)).toBe('4 of 5 said yes · 1 said not tonight');
  });
  it('has a precise countdown and stops at zero', () => {
    expect(countdown('2030-01-01T01:01:01Z', Date.parse('2030-01-01T00:00:00Z'))).toBe('1h 1m 01s left');
    expect(countdown('2030-01-01', Date.parse('2030-01-02'))).toBe('Voting closed');
  });
});

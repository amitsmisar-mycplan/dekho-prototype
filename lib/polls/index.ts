/** P3 read-only seam: no polls exist yet. The full PollStore arrives with poll creation. */
export interface OpenPollSummary { id: string; votes: number; expectedVoters: number; deadline: string }
export async function getOpenPoll(): Promise<OpenPollSummary | null> { return null; }

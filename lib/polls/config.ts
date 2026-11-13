/** NEXT_PUBLIC values are injected by Next at build time; never log the key. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';
export const cloudPollsEnabled = Boolean(supabaseUrl && supabaseAnonKey);
export const pollMode = cloudPollsEnabled ? 'supabase' : 'local';
export const selfDeviceAlias = 'this-device';
export function usableCreatorName(value: string | undefined) {
  const name = value?.trim() ?? '';
  return name && !['watchtogether', 'a friend', 'your friend'].includes(name.toLowerCase()) ? name.slice(0, 40) : '';
}

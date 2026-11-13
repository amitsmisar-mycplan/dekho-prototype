import { formatCopy } from './copy';
import { profileCopy } from '@/.generated/copy/profile';
import { commonCopy } from '@/.generated/copy/common';
export interface Preferences { name: string; avatarId: string; services: string[]; languages: string[]; freeOnly: boolean }
export const avatarOptions = [
  { id: 'sunset', label: formatCopy(profileCopy['avatar_sunset']), gradient: 'linear-gradient(135deg, #bc622d, #8b345c)' },
  { id: 'lagoon', label: formatCopy(profileCopy['avatar_lagoon']), gradient: 'linear-gradient(135deg, #24796e, #253d74)' },
  { id: 'berry', label: formatCopy(profileCopy['avatar_berry']), gradient: 'linear-gradient(135deg, #9e3d69, #593c88)' },
  { id: 'amber', label: formatCopy(profileCopy['avatar_amber']), gradient: 'linear-gradient(135deg, #93611e, #72432b)' },
  { id: 'midnight', label: formatCopy(profileCopy['avatar_midnight']), gradient: 'linear-gradient(135deg, #4b56a0, #3b295d)' },
  { id: 'forest', label: formatCopy(profileCopy['avatar_forest']), gradient: 'linear-gradient(135deg, #477348, #244d61)' },
  { id: 'rose', label: formatCopy(profileCopy['avatar_rose']), gradient: 'linear-gradient(135deg, #a34753, #713d6d)' },
  { id: 'violet', label: formatCopy(profileCopy['avatar_violet']), gradient: 'linear-gradient(135deg, #80559c, #364e85)' },
] as const;
export function defaultPreferences(): Preferences { return { name: '', avatarId: 'sunset', services: [], languages: ['Hindi', 'English'], freeOnly: false }; }
export function initials(name: string): string {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  return words.length ? (Array.from(words[0])[0] + (words.length > 1 ? Array.from(words[words.length - 1])[0] : '')).toLocaleUpperCase() : formatCopy(commonCopy['initials_fallback']);
}
export function normalizePreferences(value: unknown): Preferences {
  const defaults = defaultPreferences();
  if (!value || typeof value !== 'object') return defaults;
  const prefs = value as Partial<Preferences>;
  const list = (input: unknown, fallback: string[]) => Array.isArray(input) ? [...new Set(input.filter((s): s is string => typeof s === 'string' && s.length > 0))] : fallback;
  return {
    name: typeof prefs.name === 'string' && !['watchtogether', 'a friend', 'your friend'].includes(prefs.name.trim().toLowerCase()) ? prefs.name.trim().slice(0, 40) : '',
    avatarId: avatarOptions.some((a) => a.id === prefs.avatarId) ? prefs.avatarId! : defaults.avatarId,
    freeOnly: prefs.freeOnly === true, services: prefs.freeOnly === true ? [] : list(prefs.services, []), languages: list(prefs.languages, defaults.languages),
  };
}
export function resolveCatalogPreferences(prefs: Preferences, fallbackService: string, fallbackLanguage: string) {
  return {
    services: prefs.freeOnly ? [] : prefs.services.length ? prefs.services : fallbackService ? [fallbackService] : [],
    languages: prefs.languages.length ? prefs.languages : fallbackLanguage ? [fallbackLanguage] : [],
    savedServices: prefs.services.length > 0, savedLanguages: prefs.languages.length > 0,
  };
}

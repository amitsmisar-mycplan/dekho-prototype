const key = 'dekho-voter';
export function voterIdentity(): { id: string; name: string } {
  try { const saved = JSON.parse(localStorage.getItem(key) ?? 'null'); if (saved && typeof saved.id === 'string' && typeof saved.name === 'string') return saved; } catch { /* Restore a malformed local profile. */ }
  const value = { id: crypto.randomUUID(), name: '' }; localStorage.setItem(key, JSON.stringify(value)); return value;
}
export function saveVoterName(name: string) { const value = { ...voterIdentity(), name: name.trim().slice(0, 40) }; localStorage.setItem(key, JSON.stringify(value)); return value; }

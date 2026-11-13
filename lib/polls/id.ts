/** Nano ID's URL-safe alphabet; a byte mask is uniform because the alphabet has 64 symbols. */
export function nanoid8() { const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'; return Array.from(crypto.getRandomValues(new Uint8Array(8)), (byte) => alphabet[byte & 63]).join(''); }

export type DeckAction = 'add' | 'skip' | 'watchlist';
export function deckIntent(x: number, y: number): DeckAction | null {
  if (y < -80 && Math.abs(y) > Math.abs(x)) return 'watchlist';
  return x > 80 ? 'add' : x < -80 ? 'skip' : null;
}

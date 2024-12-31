export interface Card {
  name: string;
  type_line: string;
  mana_cost: string;
}

export interface Deck {
  commanders: Record<string, { card: Card }>;
  mainboard: Record<string, { card: Card }>;
}

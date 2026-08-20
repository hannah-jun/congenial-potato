export type PriceRecord = {
  itemName: string;
  currentPrice: number;
  recentAveragePrice: number;
};

const CHEAP_THRESHOLD_RATIO = 0.9;

export function getCheapIngredients(prices: PriceRecord[]): PriceRecord[] {
  return prices.filter(
    (price) => price.currentPrice <= price.recentAveragePrice * CHEAP_THRESHOLD_RATIO
  );
}

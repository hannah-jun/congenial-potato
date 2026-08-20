import { describe, expect, test } from "vitest";

import { getCheapIngredients } from "@/lib/pricing";

describe("getCheapIngredients", () => {
  test("최근 1개월 평균보다 10% 이상 낮은 재료만 저렴한 재료로 판정한다", () => {
    const prices = [
      { itemName: "애호박", currentPrice: 900, recentAveragePrice: 1000 },
      { itemName: "양파", currentPrice: 980, recentAveragePrice: 1000 },
    ];

    const result = getCheapIngredients(prices);

    expect(result.map((item) => item.itemName)).toEqual(["애호박"]);
  });

  test("정확히 10% 낮은 가격도 저렴한 재료로 판정한다", () => {
    const prices = [
      { itemName: "닭고기", currentPrice: 900, recentAveragePrice: 1000 },
    ];

    const result = getCheapIngredients(prices);

    expect(result.map((item) => item.itemName)).toEqual(["닭고기"]);
  });
});

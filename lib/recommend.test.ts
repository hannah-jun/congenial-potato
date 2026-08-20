import { describe, expect, test } from "vitest";

import { getRecommendedRecipes } from "@/lib/recommend";
import type { Recipe } from "@/lib/recipes";

describe("getRecommendedRecipes", () => {
  test("저렴한 재료를 2개 이상 포함하는 레시피만 추천한다", () => {
    const cheapIngredientNames = ["애호박", "양파"];
    const recipes: Recipe[] = [
      {
        name: "애호박전",
        ingredients: ["애호박", "양파", "부침가루"],
        cuisine: "한식",
        estimatedCostPerServing: 2000,
        cookTimeMinutes: 15,
      },
      {
        name: "감자채볶음",
        ingredients: ["애호박", "감자"],
        cuisine: "한식",
        estimatedCostPerServing: 1500,
        cookTimeMinutes: 10,
      },
    ];

    const result = getRecommendedRecipes(cheapIngredientNames, recipes);

    expect(result.map((recipe) => recipe.name)).toEqual(["애호박전"]);
  });

  test("저렴한 재료를 더 많이 활용하는 레시피를 먼저 보여준다", () => {
    const cheapIngredientNames = ["애호박", "양파", "닭고기"];
    const recipes: Recipe[] = [
      {
        name: "애호박전",
        ingredients: ["애호박", "양파", "부침가루"],
        cuisine: "한식",
        estimatedCostPerServing: 2000,
        cookTimeMinutes: 15,
      },
      {
        name: "닭볶음탕",
        ingredients: ["애호박", "양파", "닭고기"],
        cuisine: "한식",
        estimatedCostPerServing: 6000,
        cookTimeMinutes: 40,
      },
    ];

    const result = getRecommendedRecipes(cheapIngredientNames, recipes);

    expect(result.map((recipe) => recipe.name)).toEqual(["닭볶음탕", "애호박전"]);
  });

  test("최대 5개까지만 추천한다", () => {
    const cheapIngredientNames = ["애호박", "양파"];
    const recipes: Recipe[] = Array.from({ length: 7 }, (_, index) => ({
      name: `레시피${index}`,
      ingredients: ["애호박", "양파"],
      cuisine: "한식",
      estimatedCostPerServing: 1000,
      cookTimeMinutes: 10,
    }));

    const result = getRecommendedRecipes(cheapIngredientNames, recipes);

    expect(result).toHaveLength(5);
  });
});

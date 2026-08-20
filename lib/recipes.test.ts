import { describe, expect, test } from "vitest";

import { filterRecipesByCuisine, type Recipe } from "@/lib/recipes";

describe("filterRecipesByCuisine", () => {
  test("선택한 취향과 일치하는 레시피만 남긴다", () => {
    const recipes: Recipe[] = [
      {
        name: "애호박전",
        ingredients: ["애호박"],
        cuisine: "한식",
        estimatedCostPerServing: 2000,
        cookTimeMinutes: 15,
      },
      {
        name: "마파두부",
        ingredients: ["두부"],
        cuisine: "중식",
        estimatedCostPerServing: 3000,
        cookTimeMinutes: 20,
      },
    ];

    const result = filterRecipesByCuisine(recipes, "중식");

    expect(result.map((recipe) => recipe.name)).toEqual(["마파두부"]);
  });

  test("일치하는 레시피가 없으면 빈 배열을 반환한다", () => {
    const recipes: Recipe[] = [
      {
        name: "애호박전",
        ingredients: ["애호박"],
        cuisine: "한식",
        estimatedCostPerServing: 2000,
        cookTimeMinutes: 15,
      },
    ];

    expect(filterRecipesByCuisine(recipes, "양식")).toEqual([]);
  });
});

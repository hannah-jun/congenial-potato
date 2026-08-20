import type { Recipe } from "@/lib/recipes";

export const seedRecipes: Recipe[] = [
  {
    name: "애호박전",
    ingredients: ["애호박", "양파", "부침가루"],
    cuisine: "한식",
    estimatedCostPerServing: 2000,
    cookTimeMinutes: 15,
  },
  {
    name: "닭볶음탕",
    ingredients: ["닭고기", "양파", "감자", "대파"],
    cuisine: "한식",
    estimatedCostPerServing: 6000,
    cookTimeMinutes: 40,
  },
  {
    name: "된장찌개",
    ingredients: ["애호박", "감자", "된장"],
    cuisine: "한식",
    estimatedCostPerServing: 2500,
    cookTimeMinutes: 20,
  },
  {
    name: "감자채볶음",
    ingredients: ["감자", "당근"],
    cuisine: "한식",
    estimatedCostPerServing: 1500,
    cookTimeMinutes: 10,
  },
];

export type CuisineType = "한식" | "중식" | "양식" | "일식";

export type Recipe = {
  name: string;
  ingredients: string[];
  cuisine: CuisineType;
  estimatedCostPerServing: number;
  cookTimeMinutes: number;
};

export function filterRecipesByCuisine(
  recipes: Recipe[],
  cuisine: CuisineType
): Recipe[] {
  return recipes.filter((recipe) => recipe.cuisine === cuisine);
}

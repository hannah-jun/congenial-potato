import type { Recipe } from "@/lib/recipes";

const MIN_MATCHED_CHEAP_INGREDIENTS = 2;
const MAX_RECOMMENDATIONS = 5;

export function getRecommendedRecipes(
  cheapIngredientNames: string[],
  recipes: Recipe[]
): Recipe[] {
  const cheapSet = new Set(cheapIngredientNames);

  return recipes
    .map((recipe) => ({
      recipe,
      matchedCount: recipe.ingredients.filter((ingredient) => cheapSet.has(ingredient)).length,
    }))
    .filter(({ matchedCount }) => matchedCount >= MIN_MATCHED_CHEAP_INGREDIENTS)
    .sort((a, b) => b.matchedCount - a.matchedCount)
    .slice(0, MAX_RECOMMENDATIONS)
    .map(({ recipe }) => recipe);
}

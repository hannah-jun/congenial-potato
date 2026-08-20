import type { Recipe } from "@/lib/recipes";

type WeeklyRecommendationProps = {
  cheapIngredientNames: string[];
  recommendedRecipes: Recipe[];
  householdSize: number;
};

function formatComment(recipe: Recipe, householdSize: number) {
  const totalCost = (
    recipe.estimatedCostPerServing * householdSize
  ).toLocaleString("ko-KR");
  return `${householdSize}인분 약 ${totalCost}원, ${recipe.cookTimeMinutes}분이면 완성!`;
}

export function WeeklyRecommendation({
  cheapIngredientNames,
  recommendedRecipes,
  householdSize,
}: WeeklyRecommendationProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          이번 주 저렴한 재료
        </h2>
        <ul className="flex flex-wrap gap-2">
          {cheapIngredientNames.map((itemName) => (
            <li
              key={itemName}
              className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
            >
              {itemName}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          추천 레시피
        </h2>
        {recommendedRecipes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            이번 주는 추천할 레시피가 없어요
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {recommendedRecipes.map((recipe) => (
              <li
                key={recipe.name}
                className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-base font-semibold text-card-foreground">
                  {recipe.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatComment(recipe, householdSize)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

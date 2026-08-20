import { WeeklyRecommendation } from "@/components/weekly-recommendation";
import { seedPrices } from "@/lib/data/seed-prices";
import { seedRecipes } from "@/lib/data/seed-recipes";
import { getCheapIngredients } from "@/lib/pricing";
import { getRecommendedRecipes } from "@/lib/recommend";

export default function Home() {
  const cheapIngredients = getCheapIngredients(seedPrices);
  const cheapIngredientNames = cheapIngredients.map((item) => item.itemName);
  const recommendedRecipes = getRecommendedRecipes(cheapIngredientNames, seedRecipes);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-8 py-16 px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          이번 주 뭐 해먹지?
        </h1>
        <WeeklyRecommendation
          cheapIngredientNames={cheapIngredientNames}
          recommendedRecipes={recommendedRecipes}
        />
      </main>
    </div>
  );
}

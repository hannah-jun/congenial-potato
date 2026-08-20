"use client";

import { useState } from "react";

import type { Recipe } from "@/lib/recipes";

type WeeklyRecommendationProps = {
  cheapIngredientNames: string[];
  recommendedRecipes: Recipe[];
  householdSize: number;
};

const INGREDIENT_EMOJI: Record<string, string> = {
  애호박: "🥒",
  양파: "🧅",
  닭고기: "🍗",
  대파: "🌿",
  감자: "🥔",
  당근: "🥕",
  된장: "🫙",
  부침가루: "🌾",
};

function getIngredientEmoji(name: string) {
  return INGREDIENT_EMOJI[name] ?? "🛒";
}

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
  const [cart, setCart] = useState<string[]>([]);

  function toggleCart(itemName: string) {
    setCart((current) =>
      current.includes(itemName)
        ? current.filter((name) => name !== itemName)
        : [...current, itemName]
    );
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <section className="flex flex-col gap-3" aria-label="이번 주 저렴한 재료">
        <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-300">
          이번 주 저렴한 재료
        </h2>
        <ul className="flex flex-wrap gap-2">
          {cheapIngredientNames.map((itemName) => {
            const inCart = cart.includes(itemName);
            return (
              <li key={itemName}>
                <button
                  type="button"
                  onClick={() => toggleCart(itemName)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm ${
                    inCart
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-100"
                  }`}
                >
                  <span aria-hidden="true">{getIngredientEmoji(itemName)}</span>
                  <span>
                    {itemName} {inCart ? "빼기" : "담기"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-3" aria-label="추천 레시피">
        <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-300">
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
                className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl dark:bg-orange-900/40"
                >
                  {getIngredientEmoji(recipe.ingredients[0])}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-card-foreground">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatComment(recipe, householdSize)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3" aria-label="장바구니">
        <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-300">
          장바구니
        </h2>
        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            아직 담은 재료가 없어요
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {cart.map((itemName) => (
              <li
                key={itemName}
                className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-900 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-100"
              >
                <span aria-hidden="true">{getIngredientEmoji(itemName)}</span>
                <span>{itemName}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

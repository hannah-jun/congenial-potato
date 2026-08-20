"use client";

import { useEffect, useState } from "react";

import { InitialSetupForm } from "@/components/initial-setup-form";
import { WeeklyRecommendation } from "@/components/weekly-recommendation";
import { seedPrices } from "@/lib/data/seed-prices";
import { seedRecipes } from "@/lib/data/seed-recipes";
import { getCheapIngredients } from "@/lib/pricing";
import { getRecommendedRecipes } from "@/lib/recommend";
import { filterRecipesByCuisine } from "@/lib/recipes";
import { loadSettings, saveSettings, type UserSettings } from "@/lib/settings";

export default function Home() {
  const [settings, setSettings] = useState<UserSettings | null | undefined>(
    undefined
  );
  const [isEditingSettings, setIsEditingSettings] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  function handleSetupComplete(newSettings: UserSettings) {
    saveSettings(newSettings);
    setSettings(newSettings);
    setIsEditingSettings(false);
  }

  const cheapIngredients = getCheapIngredients(seedPrices);
  const cheapIngredientNames = cheapIngredients.map((item) => item.itemName);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-8 py-16 px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          이번 주 뭐 해먹지?
        </h1>
        {settings === undefined ? null : !settings || isEditingSettings ? (
          <InitialSetupForm
            initialValues={settings ?? undefined}
            onComplete={handleSetupComplete}
          />
        ) : (
          <div className="flex w-full max-w-2xl flex-col items-end gap-4">
            <p className="text-sm text-muted-foreground">
              {settings.householdSize}인 가구 · {settings.cuisine}{" "}
              <button
                type="button"
                onClick={() => setIsEditingSettings(true)}
                className="underline"
              >
                설정 변경
              </button>
            </p>
            <WeeklyRecommendation
              cheapIngredientNames={cheapIngredientNames}
              recommendedRecipes={getRecommendedRecipes(
                cheapIngredientNames,
                filterRecipesByCuisine(seedRecipes, settings.cuisine)
              )}
              householdSize={settings.householdSize}
            />
          </div>
        )}
      </main>
    </div>
  );
}

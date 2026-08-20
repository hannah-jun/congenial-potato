import type { CuisineType } from "@/lib/recipes";

export type HouseholdSize = 2 | 3 | 4;

export type UserSettings = {
  householdSize: HouseholdSize;
  cuisine: CuisineType;
};

const STORAGE_KEY = "weekly-recipe-settings";

export function loadSettings(): UserSettings | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserSettings;
  } catch {
    return null;
  }
}

export function saveSettings(settings: UserSettings): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

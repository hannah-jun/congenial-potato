"use client";

import { useState } from "react";

import type { CuisineType } from "@/lib/recipes";
import type { HouseholdSize, UserSettings } from "@/lib/settings";

const HOUSEHOLD_SIZES: HouseholdSize[] = [2, 3, 4];
const CUISINES: CuisineType[] = ["한식", "중식", "양식", "일식"];

type InitialSetupFormProps = {
  initialValues?: UserSettings;
  onComplete: (settings: UserSettings) => void;
};

function optionButtonClassName(selected: boolean) {
  return `rounded-full border px-3 py-1 text-sm ${
    selected
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-card text-foreground"
  }`;
}

export function InitialSetupForm({
  initialValues,
  onComplete,
}: InitialSetupFormProps) {
  const [householdSize, setHouseholdSize] = useState<
    HouseholdSize | undefined
  >(initialValues?.householdSize);
  const [cuisine, setCuisine] = useState<CuisineType | undefined>(
    initialValues?.cuisine
  );

  const canComplete = householdSize !== undefined && cuisine !== undefined;

  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (householdSize !== undefined && cuisine !== undefined) {
          onComplete({ householdSize, cuisine });
        }
      }}
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium text-muted-foreground">
          가구 인원수
        </legend>
        <div className="flex flex-wrap gap-2">
          {HOUSEHOLD_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={householdSize === size}
              onClick={() => setHouseholdSize(size)}
              className={optionButtonClassName(householdSize === size)}
            >
              {size}인
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium text-muted-foreground">
          요리 취향
        </legend>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={cuisine === option}
              onClick={() => setCuisine(option)}
              className={optionButtonClassName(cuisine === option)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!canComplete}
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-40"
      >
        설정 완료
      </button>
    </form>
  );
}

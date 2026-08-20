import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { WeeklyRecommendation } from "@/components/weekly-recommendation";

test("이번 주 저렴한 재료 목록과 추천 레시피, 예상 비용/시간 코멘트를 보여준다", () => {
  render(
    <WeeklyRecommendation
      cheapIngredientNames={["애호박", "양파"]}
      recommendedRecipes={[
        {
          name: "애호박전",
          ingredients: ["애호박", "양파", "부침가루"],
          cuisine: "한식",
          estimatedCostPerServing: 2000,
          cookTimeMinutes: 15,
        },
      ]}
      householdSize={1}
    />
  );

  expect(screen.getByText("애호박")).toBeInTheDocument();
  expect(screen.getByText("양파")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "애호박전" })
  ).toBeInTheDocument();
  expect(screen.getByText(/2,000원/)).toBeInTheDocument();
  expect(screen.getByText(/15분/)).toBeInTheDocument();
});

test("가구 인원수에 비례해 예상 비용이 조정되어 표시된다", () => {
  render(
    <WeeklyRecommendation
      cheapIngredientNames={["애호박", "양파"]}
      recommendedRecipes={[
        {
          name: "애호박전",
          ingredients: ["애호박", "양파", "부침가루"],
          cuisine: "한식",
          estimatedCostPerServing: 2000,
          cookTimeMinutes: 15,
        },
      ]}
      householdSize={4}
    />
  );

  expect(screen.getByText(/4인분 약 8,000원/)).toBeInTheDocument();
});

test("추천할 레시피가 없으면 빈 상태 안내를 보여준다", () => {
  render(
    <WeeklyRecommendation
      cheapIngredientNames={["애호박"]}
      recommendedRecipes={[]}
      householdSize={2}
    />
  );

  expect(screen.getByText("이번 주는 추천할 레시피가 없어요")).toBeInTheDocument();
});

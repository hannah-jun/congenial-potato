import { expect, test } from "@playwright/test";

test("홈 화면이 열리고 이번 주 추천 제목이 보인다", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Create Next App");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "이번 주 뭐 해먹지?"
  );
});

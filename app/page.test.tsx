import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "@/app/page";

test("홈 화면은 이번 주 저렴한 재료와 추천 레시피를 보여준다", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "이번 주 뭐 해먹지?" })
  ).toBeInTheDocument();
  expect(screen.getByText("애호박")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "애호박전" })
  ).toBeInTheDocument();
});

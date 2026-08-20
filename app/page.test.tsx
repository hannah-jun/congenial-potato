import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Home from "@/app/page";

afterEach(() => {
  window.localStorage.clear();
});

test("설정을 아직 마치지 않았으면 초기 설정 화면을 먼저 보여준다", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "이번 주 뭐 해먹지?" })
  ).toBeInTheDocument();
  expect(screen.getByText("가구 인원수")).toBeInTheDocument();
  expect(screen.queryByText("애호박전")).not.toBeInTheDocument();
});

test("초기 설정을 완료하면 추천 화면으로 넘어간다", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "2인" }));
  fireEvent.click(screen.getByRole("button", { name: "한식" }));
  fireEvent.click(screen.getByRole("button", { name: "설정 완료" }));

  expect(
    screen.getByRole("button", { name: "애호박 담기" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "애호박전" })
  ).toBeInTheDocument();
});

test("이전에 마친 설정이 있으면 초기 설정 화면 없이 바로 추천 화면을 보여준다", () => {
  window.localStorage.setItem(
    "weekly-recipe-settings",
    JSON.stringify({ householdSize: 2, cuisine: "한식" })
  );

  render(<Home />);

  expect(screen.queryByText("가구 인원수")).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "애호박전" })
  ).toBeInTheDocument();
});

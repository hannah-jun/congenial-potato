import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { InitialSetupForm } from "@/components/initial-setup-form";

test("인원수와 취향을 모두 고르기 전에는 완료할 수 없다", () => {
  render(<InitialSetupForm onComplete={() => {}} />);

  expect(screen.getByRole("button", { name: "설정 완료" })).toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: "3인" }));
  expect(screen.getByRole("button", { name: "설정 완료" })).toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: "한식" }));
  expect(screen.getByRole("button", { name: "설정 완료" })).toBeEnabled();
});

test("인원수와 취향을 고르고 완료하면 선택값을 전달한다", () => {
  const onComplete = vi.fn();
  render(<InitialSetupForm onComplete={onComplete} />);

  fireEvent.click(screen.getByRole("button", { name: "4인" }));
  fireEvent.click(screen.getByRole("button", { name: "중식" }));
  fireEvent.click(screen.getByRole("button", { name: "설정 완료" }));

  expect(onComplete).toHaveBeenCalledWith({
    householdSize: 4,
    cuisine: "중식",
  });
});

test("초기값이 있으면 미리 선택된 상태로 보여준다", () => {
  render(
    <InitialSetupForm
      initialValues={{ householdSize: 2, cuisine: "일식" }}
      onComplete={() => {}}
    />
  );

  expect(screen.getByRole("button", { name: "2인" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  expect(screen.getByRole("button", { name: "일식" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  expect(screen.getByRole("button", { name: "설정 완료" })).toBeEnabled();
});

import { afterEach, describe, expect, test } from "vitest";

import { loadSettings, saveSettings } from "@/lib/settings";

afterEach(() => {
  window.localStorage.clear();
});

describe("settings", () => {
  test("저장된 설정이 없으면 null을 반환한다", () => {
    expect(loadSettings()).toBeNull();
  });

  test("저장한 설정을 그대로 불러온다", () => {
    saveSettings({ householdSize: 3, cuisine: "중식" });

    expect(loadSettings()).toEqual({ householdSize: 3, cuisine: "중식" });
  });

  test("저장된 값이 손상된 JSON이면 null을 반환한다", () => {
    window.localStorage.setItem("weekly-recipe-settings", "{잘못된 json");

    expect(loadSettings()).toBeNull();
  });
});

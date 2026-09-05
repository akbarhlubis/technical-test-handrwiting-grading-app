import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_GEMINI_MODEL, getGeminiModel } from "@/lib/gemini/server";

const originalModel = process.env.GEMINI_MODEL;

afterEach(() => {
  if (originalModel === undefined) {
    delete process.env.GEMINI_MODEL;
  } else {
    process.env.GEMINI_MODEL = originalModel;
  }
});

describe("getGeminiModel", () => {
  it("returns the configured model after trimming it", () => {
    process.env.GEMINI_MODEL = "  configured-model  ";

    expect(getGeminiModel()).toBe("configured-model");
  });

  it("returns the default when GEMINI_MODEL is missing", () => {
    delete process.env.GEMINI_MODEL;

    expect(getGeminiModel()).toBe(DEFAULT_GEMINI_MODEL);
  });

  it("returns the default when GEMINI_MODEL is blank", () => {
    process.env.GEMINI_MODEL = "   ";

    expect(getGeminiModel()).toBe(DEFAULT_GEMINI_MODEL);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  gradeHandwriting,
  GradingTemporarilyUnavailableError,
} from "@/lib/grading/grade-handwriting";

const { generateContent } = vi.hoisted(() => ({
  generateContent: vi.fn(),
}));

vi.mock("@/lib/gemini/server", () => ({
  createGeminiServerClient: () => ({
    models: { generateContent },
  }),
  getGeminiModel: () => "gemini-3.5-flash",
}));

const image = () => new File(["image"], "handwriting.png", { type: "image/png" });
const successfulResponse = {
  text: JSON.stringify({
    results: [{ characterName: "操场", recognizedText: "操场", isCorrect: true }],
  }),
};

describe("gradeHandwriting retry behavior", () => {
  beforeEach(() => {
    generateContent.mockReset();
  });

  it("uses one call when Gemini succeeds immediately", async () => {
    generateContent.mockResolvedValue(successfulResponse);

    await expect(gradeHandwriting(image(), ["操场"])).resolves.toEqual([
      { characterName: "操场", recognizedText: "操场", isCorrect: true },
    ]);
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it("retries a temporary 503 and returns the later result", async () => {
    generateContent
      .mockRejectedValueOnce({ status: 503, message: "temporarily unavailable" })
      .mockResolvedValueOnce(successfulResponse);
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(gradeHandwriting(image(), ["操场"], { sleep, random: () => 0 })).resolves.toEqual([
      { characterName: "操场", recognizedText: "操场", isCorrect: true },
    ]);
    expect(generateContent).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(1_000);
  });

  it("stops after three temporary failures", async () => {
    generateContent.mockRejectedValue({
      error: { code: 503, status: "UNAVAILABLE", message: "high demand" },
    });
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(
      gradeHandwriting(image(), ["操场"], { sleep, random: () => 0 }),
    ).rejects.toBeInstanceOf(GradingTemporarilyUnavailableError);
    expect(generateContent).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenNthCalledWith(1, 1_000);
    expect(sleep).toHaveBeenNthCalledWith(2, 2_000);
  });

  it("does not retry non-retryable errors", async () => {
    const error = new Error("invalid API key");
    generateContent.mockRejectedValue(error);

    await expect(gradeHandwriting(image(), ["操场"])).rejects.toBe(error);
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it("does not retry malformed structured output", async () => {
    generateContent.mockResolvedValue({ text: "not-json" });

    await expect(gradeHandwriting(image(), ["操场"])).rejects.toThrow(
      "Gemini returned invalid JSON",
    );
    expect(generateContent).toHaveBeenCalledTimes(1);
  });
});

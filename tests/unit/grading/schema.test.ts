import { describe, expect, it } from "vitest";
import { normalizeGradingResults } from "@/lib/grading/schema";

describe("normalizeGradingResults", () => {
  it("returns expected words in lesson order and ignores invented words", () => {
    expect(
      normalizeGradingResults(
        {
          results: [
            { characterName: "invented", recognizedText: "x", isCorrect: true },
            { characterName: "礼堂", recognizedText: "礼堂", isCorrect: true },
            { characterName: "操场", recognizedText: "操场", isCorrect: false },
          ],
        },
        ["操场", "礼堂"],
      ),
    ).toEqual([
      { characterName: "操场", recognizedText: "操场", isCorrect: false },
      { characterName: "礼堂", recognizedText: "礼堂", isCorrect: true },
    ]);
  });

  it("fails when Gemini omits an expected word", () => {
    expect(() =>
      normalizeGradingResults(
        { results: [{ characterName: "操场", isCorrect: true }] },
        ["操场", "礼堂"],
      ),
    ).toThrow("Gemini omitted an expected word");
  });
});

import { describe, expect, it } from "vitest";
import { calculateScore } from "@/lib/grading/score";
import { normalizeGradingResults } from "@/lib/grading/schema";

describe("calculateScore", () => {
  it("returns 100 when every word is correct", () => {
    expect(calculateScore([{ isCorrect: true }, { isCorrect: true }])).toBe(100);
  });

  it("returns 0 when no word is correct", () => {
    expect(calculateScore([{ isCorrect: false }, { isCorrect: false }])).toBe(0);
  });

  it("rounds the percentage", () => {
    expect(
      calculateScore([{ isCorrect: true }, { isCorrect: true }, { isCorrect: false }]),
    ).toBe(67);
  });

  it("handles an empty lesson safely", () => {
    expect(calculateScore([])).toBe(0);
  });

  it("uses synthesized omitted words in the score denominator", () => {
    const results = normalizeGradingResults(
      {
        results: [
          { characterName: "爸爸", recognizedText: "爸爸", isCorrect: true },
        ],
      },
      ["爸爸", "妈妈", "哥哥"],
    );

    expect(results).toHaveLength(3);
    expect(calculateScore(results)).toBe(33);
  });
});

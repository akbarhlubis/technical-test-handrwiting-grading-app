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

  it("synthesizes an incorrect result when Gemini omits an expected word", () => {
    expect(
      normalizeGradingResults(
        { results: [{ characterName: "操场", isCorrect: true }] },
        ["操场", "礼堂"],
      ),
    ).toEqual([
      { characterName: "操场", recognizedText: null, isCorrect: true },
      { characterName: "礼堂", recognizedText: null, isCorrect: false },
    ]);
  });

  it("synthesizes multiple omitted words and preserves expected order", () => {
    expect(
      normalizeGradingResults(
        { results: [{ characterName: "妈妈", recognizedText: "妈", isCorrect: false }] },
        ["爸爸", "妈妈", "哥哥"],
      ),
    ).toEqual([
      { characterName: "爸爸", recognizedText: null, isCorrect: false },
      { characterName: "妈妈", recognizedText: "妈", isCorrect: false },
      { characterName: "哥哥", recognizedText: null, isCorrect: false },
    ]);
  });

  it("synthesizes every expected word when Gemini returns an empty results array", () => {
    expect(normalizeGradingResults({ results: [] }, ["爸爸", "妈妈"])).toEqual([
      { characterName: "爸爸", recognizedText: null, isCorrect: false },
      { characterName: "妈妈", recognizedText: null, isCorrect: false },
    ]);
  });

  it("keeps duplicate expected results invalid", () => {
    expect(() =>
      normalizeGradingResults(
        { results: [{ characterName: "操场", isCorrect: true }, { characterName: "操场", isCorrect: false }] },
        ["操场"],
      ),
    ).toThrow("duplicate or invalid character results");
  });

  it("keeps malformed results invalid", () => {
    expect(() =>
      normalizeGradingResults(
        { results: [{ characterName: "操场", isCorrect: "true" }] },
        ["操场"],
      ),
    ).toThrow("duplicate or invalid character results");
  });

  it("rejects an invalid recognized text type", () => {
    expect(() =>
      normalizeGradingResults(
        { results: [{ characterName: "操场", recognizedText: 123, isCorrect: true }] },
        ["操场"],
      ),
    ).toThrow("invalid recognized text value");
  });
});

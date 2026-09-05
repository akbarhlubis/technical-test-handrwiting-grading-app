import { Type } from "@google/genai";

export type NormalizedGradingResult = {
  characterName: string;
  recognizedText: string | null;
  isCorrect: boolean;
};

export const gradingResponseSchema = {
  type: Type.OBJECT,
  properties: {
    results: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          characterName: { type: Type.STRING },
          recognizedText: { type: Type.STRING, nullable: true },
          isCorrect: { type: Type.BOOLEAN },
        },
        required: ["characterName", "isCorrect"],
      },
    },
  },
  required: ["results"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function normalizeGradingResults(
  value: unknown,
  expectedWords: string[],
): NormalizedGradingResult[] {
  const expected = expectedWords.map((word) => word.trim());

  if (expected.some((word) => !word)) {
    throw new Error("Lesson contains an empty expected word.");
  }

  if (new Set(expected).size !== expected.length) {
    throw new Error("Lesson contains duplicate expected words.");
  }

  if (expected.length === 0) {
    return [];
  }

  if (!isRecord(value) || !Array.isArray(value.results)) {
    throw new Error("Gemini returned an invalid grading result.");
  }

  const byWord = new Map<string, NormalizedGradingResult>();

  for (const item of value.results) {
    if (!isRecord(item) || typeof item.characterName !== "string") {
      throw new Error("Gemini returned an invalid character result.");
    }

    const characterName = item.characterName.trim();
    if (!expected.includes(characterName)) {
      continue;
    }

    if (byWord.has(characterName) || typeof item.isCorrect !== "boolean") {
      throw new Error("Gemini returned duplicate or invalid character results.");
    }

    const recognizedText = item.recognizedText;
    if (
      recognizedText !== undefined &&
      recognizedText !== null &&
      typeof recognizedText !== "string"
    ) {
      throw new Error("Gemini returned an invalid recognized text value.");
    }

    byWord.set(characterName, {
      characterName,
      recognizedText:
        typeof recognizedText === "string" && recognizedText.trim()
          ? recognizedText.trim()
          : null,
      isCorrect: item.isCorrect,
    });
  }

  return expected.map((word) =>
    byWord.get(word) ?? {
      characterName: word,
      recognizedText: null,
      isCorrect: false,
    },
  );
}

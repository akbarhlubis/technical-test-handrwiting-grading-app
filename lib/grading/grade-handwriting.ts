import { createGeminiServerClient } from "@/lib/gemini/server";
import {
  gradingResponseSchema,
  normalizeGradingResults,
  type NormalizedGradingResult,
} from "@/lib/grading/schema";

const GRADING_MODEL = "gemini-3.5-flash";

export async function gradeHandwriting(
  image: File,
  expectedWords: string[],
): Promise<NormalizedGradingResult[]> {
  if (expectedWords.length === 0) {
    return [];
  }

  const imageBase64 = Buffer.from(await image.arrayBuffer()).toString("base64");
  const ai = createGeminiServerClient();
  const response = await ai.models.generateContent({
    model: GRADING_MODEL,
    contents: [
      {
        inlineData: {
          data: imageBase64,
          mimeType: image.type,
        },
      },
      {
        text: [
          "Grade the Chinese handwriting in this image.",
          `The expected words, in order, are: ${expectedWords.join(", ")}.`,
          "Return one result for every expected word.",
          "Do not invent words. isCorrect must be true only when the handwritten word matches the expected word.",
        ].join(" "),
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: gradingResponseSchema,
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty grading result.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(response.text);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  return normalizeGradingResults(parsed, expectedWords);
}

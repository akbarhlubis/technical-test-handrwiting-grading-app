import { createGeminiServerClient } from "@/lib/gemini/server";
import {
  gradingResponseSchema,
  normalizeGradingResults,
  type NormalizedGradingResult,
} from "@/lib/grading/schema";

const GRADING_MODEL = "gemini-3.5-flash";
const MAX_ATTEMPTS = 3;
const INITIAL_BACKOFF_MS = 1_000;
const MAX_JITTER_MS = 100;

export const GRADING_TEMPORARILY_UNAVAILABLE =
  "GRADING_TEMPORARILY_UNAVAILABLE" as const;

export class GradingTemporarilyUnavailableError extends Error {
  readonly code = GRADING_TEMPORARILY_UNAVAILABLE;

  constructor(cause?: unknown) {
    super("Handwriting grading is temporarily unavailable.");
    this.name = "GradingTemporarilyUnavailableError";
    this.cause = cause;
  }
}

type GradeHandwritingOptions = {
  sleep?: (milliseconds: number) => Promise<void>;
  random?: () => number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTemporaryServiceUnavailableError(error: unknown) {
  if (!isRecord(error)) {
    return false;
  }

  const details = isRecord(error.error) ? error.error : error;
  const status = details.status;
  const code = details.code;
  const message = typeof details.message === "string" ? details.message : "";

  return (
    status === 503 ||
    code === 503 ||
    status === "UNAVAILABLE" ||
    code === "UNAVAILABLE" ||
    /\bUNAVAILABLE\b/i.test(message)
  );
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export async function gradeHandwriting(
  image: File,
  expectedWords: string[],
  options: GradeHandwritingOptions = {},
): Promise<NormalizedGradingResult[]> {
  if (expectedWords.length === 0) {
    return [];
  }

  const imageBase64 = Buffer.from(await image.arrayBuffer()).toString("base64");
  const ai = createGeminiServerClient();
  const request = {
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
  };

  let response;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      response = await ai.models.generateContent(request);
      break;
    } catch (error) {
      if (!isTemporaryServiceUnavailableError(error)) {
        throw error;
      }

      console.warn("Gemini grading temporarily unavailable.", {
        attempt,
        status: isRecord(error) ? error.status : undefined,
        code: isRecord(error) ? error.code : undefined,
      });

      if (attempt === MAX_ATTEMPTS) {
        throw new GradingTemporarilyUnavailableError(error);
      }

      const backoff = INITIAL_BACKOFF_MS * attempt;
      const jitter = (options.random ?? Math.random)() * MAX_JITTER_MS;
      await (options.sleep ?? wait)(backoff + jitter);
    }
  }

  if (!response) {
    throw new GradingTemporarilyUnavailableError();
  }

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

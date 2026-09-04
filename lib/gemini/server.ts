import { GoogleGenAI } from "@google/genai";

export function createGeminiServerClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini server configuration is missing.");
  }

  return new GoogleGenAI({ apiKey });
}

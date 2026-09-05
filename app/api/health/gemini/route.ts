import {
  createGeminiServerClient,
  getGeminiModel,
} from "@/lib/gemini/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gemini = createGeminiServerClient();

    await gemini.models.generateContent({
      model: getGeminiModel(),
      contents: "Reply with the single word OK.",
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(
      "Gemini health check failed.",
      error instanceof Error ? error.message : "Unknown error",
    );

    return Response.json({ ok: false }, { status: 500 });
  }
}

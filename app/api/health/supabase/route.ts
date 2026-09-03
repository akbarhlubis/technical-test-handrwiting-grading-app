import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const SUBMISSIONS_TABLE = "submissions" as const;

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .select("*", { head: true })
      .limit(1);

    if (error) {
      console.error("Supabase health check failed.", {
        code: error.code,
        message: error.message,
      });

      return Response.json({ ok: false }, { status: 500 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Supabase health check failed.", error);

    return Response.json({ ok: false }, { status: 500 });
  }
}

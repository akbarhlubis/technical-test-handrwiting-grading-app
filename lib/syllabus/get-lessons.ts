import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { MoeLevel } from "@/lib/syllabus/level";

type LessonRow = {
  id: string;
  title: string;
  moe_level: string;
  word_list: string[] | null;
  created_at: string;
};

export type SyllabusLesson = {
  id: string;
  title: string;
  level: string;
  vocabulary: string[];
};

export function normalizeLesson(row: LessonRow): SyllabusLesson {
  return {
    id: row.id,
    title: row.title,
    level: row.moe_level,
    vocabulary: (row.word_list ?? []).filter((word): word is string => typeof word === "string"),
  };
}

export async function getLessons(level: MoeLevel = "P2"): Promise<SyllabusLesson[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("id, title, moe_level, word_list, created_at")
    .eq("moe_level", level)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Unable to load syllabus lessons: " + error.message);

  return ((data ?? []) as LessonRow[]).map(normalizeLesson);
}

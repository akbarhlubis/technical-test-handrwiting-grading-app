import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const DEMO_STUDENT_ID = "lucas-primary-2";

export type SubmissionRow = { id: string; score: number | null; created_at: string; lesson_id: string | null };
export type CharacterResultRow = { submission_id: string | null; character_name: string; is_correct: boolean };
export type LessonRow = { id: string; title: string; word_list: string[] | null };

export type LatestResultSummary = {
  title: string;
  status: "Completed" | "Needs Review";
  score: number;
  correctCount: number;
  totalCount: number;
  gradedAt: string;
  reviewCount: number;
};

export type ResultAttempt = { date: string; results: (boolean | null)[] };
export type GradingHistory = { latest: LatestResultSummary; words: string[]; attempts: ResultAttempt[] };

function formatDateTime(value: string) {
  const date = new Date(value);
  const dateLabel = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
  return `${dateLabel} · ${timeLabel}`;
}

function uniqueWords(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function buildGradingHistory(
  recentSubmissions: SubmissionRow[],
  resultRows: CharacterResultRow[],
  lessonRows: LessonRow[],
): GradingHistory | null {
  if (recentSubmissions.length === 0) return null;

  const lessonById = new Map(lessonRows.map((lesson) => [lesson.id, lesson]));
  const resultsBySubmission = new Map<string, CharacterResultRow[]>();
  for (const result of resultRows) {
    if (!result.submission_id) continue;
    resultsBySubmission.set(result.submission_id, [...(resultsBySubmission.get(result.submission_id) ?? []), result]);
  }

  const latestSubmission = recentSubmissions[0];
  const latestResults = resultsBySubmission.get(latestSubmission.id) ?? [];
  const latestLesson = latestSubmission.lesson_id ? lessonById.get(latestSubmission.lesson_id) : undefined;
  const words = uniqueWords(latestLesson?.word_list ?? latestResults.map((result) => result.character_name));
  const correctCount = latestResults.filter((result) => result.is_correct).length;
  const score = latestSubmission.score ?? 0;

  return {
    latest: {
      title: latestLesson?.title ?? "Syllabus Test",
      status: score === 100 ? "Completed" : "Needs Review",
      score,
      correctCount,
      totalCount: latestResults.length,
      gradedAt: formatDateTime(latestSubmission.created_at),
      reviewCount: Math.max(latestResults.length - correctCount, 0),
    },
    words,
    attempts: [...recentSubmissions].reverse().map((submission) => {
      const resultByWord = new Map((resultsBySubmission.get(submission.id) ?? []).map((result) => [result.character_name, result.is_correct]));
      return { date: formatDateTime(submission.created_at), results: words.map((word) => resultByWord.get(word) ?? null) };
    }),
  };
}

export async function getGradingHistory(): Promise<GradingHistory | null> {
  const supabase = createSupabaseAdminClient();
  const { data: submissions, error: submissionsError } = await supabase
    .from("submissions")
    .select("id, score, created_at, lesson_id")
    .eq("student_id", DEMO_STUDENT_ID)
    .not("score", "is", null)
    .order("created_at", { ascending: false })
    .limit(5);

  if (submissionsError) throw new Error(`Unable to load submissions: ${submissionsError.message}`);
  const recentSubmissions = (submissions ?? []) as SubmissionRow[];
  if (recentSubmissions.length === 0) return null;

  const submissionIds = recentSubmissions.map((submission) => submission.id);
  const lessonIds = [...new Set(recentSubmissions.flatMap((submission) => submission.lesson_id ? [submission.lesson_id] : []))];
  const [{ data: characterResults, error: characterResultsError }, { data: lessons, error: lessonsError }] = await Promise.all([
    supabase.from("character_results").select("submission_id, character_name, is_correct").in("submission_id", submissionIds),
    lessonIds.length > 0 ? supabase.from("lessons").select("id, title, word_list").in("id", lessonIds) : Promise.resolve({ data: [], error: null }),
  ]);

  if (characterResultsError) throw new Error(`Unable to load character results: ${characterResultsError.message}`);
  if (lessonsError) throw new Error(`Unable to load lessons: ${lessonsError.message}`);

  return buildGradingHistory(
    recentSubmissions,
    (characterResults ?? []) as CharacterResultRow[],
    (lessons ?? []) as LessonRow[],
  );
}

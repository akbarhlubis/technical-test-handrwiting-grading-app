export const DEFAULT_DEMO_LESSON_ID = "865dc30c-a821-4589-b088-a4a96d883541";

export function resolveCameraLessonId(value: string | string[] | undefined): string {
  const lessonId = Array.isArray(value) ? value[0] : value;
  return lessonId?.trim() || DEFAULT_DEMO_LESSON_ID;
}

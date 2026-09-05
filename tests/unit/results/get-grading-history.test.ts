import { describe, expect, it } from "vitest";
import {
  buildGradingHistory,
  type CharacterResultRow,
  type LessonRow,
  type SubmissionRow,
} from "@/lib/results/get-grading-history";

const lessonA: LessonRow = { id: "lesson-a", title: "Lesson A", word_list: ["A1", "A2", "A3"] };
const lessonB: LessonRow = { id: "lesson-b", title: "Lesson B", word_list: ["B1", "B2"] };
const submissions: SubmissionRow[] = [
  { id: "a-new", score: 67, created_at: "2026-06-14T09:30:00Z", lesson_id: "lesson-a" },
  { id: "b-new", score: 50, created_at: "2026-06-13T09:30:00Z", lesson_id: "lesson-b" },
  { id: "a-old", score: 67, created_at: "2026-06-07T09:30:00Z", lesson_id: "lesson-a" },
  { id: "b-old", score: 50, created_at: "2026-06-06T09:30:00Z", lesson_id: "lesson-b" },
];
const results: CharacterResultRow[] = [
  { submission_id: "a-new", character_name: "A1", is_correct: true },
  { submission_id: "a-new", character_name: "A2", is_correct: false },
  { submission_id: "a-old", character_name: "A1", is_correct: true },
  { submission_id: "a-old", character_name: "A3", is_correct: true },
  { submission_id: "b-new", character_name: "B1", is_correct: false },
  { submission_id: "b-old", character_name: "B2", is_correct: true },
];

describe("buildGradingHistory", () => {
  it("groups same-lesson attempts and preserves oldest-to-newest order", () => {
    const history = buildGradingHistory(submissions, results, [lessonA, lessonB]);
    const lesson = history?.lessons.find((item) => item.lessonId === "lesson-a");

    expect(lesson?.attempts).toHaveLength(2);
    expect(lesson?.attempts[0].results).toEqual([true, null, true]);
    expect(lesson?.attempts[1].results).toEqual([true, false, null]);
    expect(lesson?.attempts.map((attempt) => attempt.date)).toEqual([
      expect.stringContaining("07 Jun"),
      expect.stringContaining("14 Jun"),
    ]);
  });

  it("keeps different lessons on independent vocabulary axes", () => {
    const history = buildGradingHistory(submissions, results, [lessonA, lessonB]);

    expect(history?.lessons).toHaveLength(2);
    expect(history?.lessons[0]).toMatchObject({ lessonId: "lesson-a", title: "Lesson A", words: ["A1", "A2", "A3"] });
    expect(history?.lessons[1]).toMatchObject({ lessonId: "lesson-b", title: "Lesson B", words: ["B1", "B2"] });
    expect(history?.lessons[1].attempts[0].results).toEqual([null, true]);
    expect(history?.lessons[1].attempts[1].results).toEqual([false, null]);
  });

  it("keeps the latest summary based on the globally newest submission", () => {
    const history = buildGradingHistory(submissions, results, [lessonA, lessonB]);

    expect(history?.latest).toMatchObject({
      title: "Lesson A",
      score: 67,
      correctCount: 1,
      totalCount: 3,
      reviewCount: 2,
      status: "Needs Review",
    });
  });

  it("limits each lesson to five recent attempts deterministically", () => {
    const manySubmissions = Array.from({ length: 6 }, (_, index) => ({
      id: "attempt-" + index,
      score: 100,
      created_at: "2026-06-" + String(14 - index).padStart(2, "0") + "T09:30:00Z",
      lesson_id: "lesson-a",
    }));
    const history = buildGradingHistory(manySubmissions, [], [lessonA]);

    expect(history?.lessons[0].attempts).toHaveLength(5);
    expect(history?.lessons[0].attempts[0].date).toContain("10 Jun");
    expect(history?.lessons[0].attempts[4].date).toContain("14 Jun");
  });

  it("returns null when there are no submissions", () => {
    expect(buildGradingHistory([], [], [])).toBeNull();
  });
});

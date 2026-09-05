import { describe, expect, it } from "vitest";
import {
  buildGradingHistory,
  type CharacterResultRow,
  type LessonRow,
  type SubmissionRow,
} from "@/lib/results/get-grading-history";

const lesson: LessonRow = { id: "lesson-1", title: "第十课 - 我们的校园", word_list: ["操场", "礼堂", "老师"] };
const submissions: SubmissionRow[] = [
  { id: "newest", score: 67, created_at: "2026-06-14T09:30:00Z", lesson_id: "lesson-1" },
  { id: "oldest", score: 100, created_at: "2026-06-07T09:30:00Z", lesson_id: "lesson-1" },
];
const results: CharacterResultRow[] = [
  { submission_id: "newest", character_name: "操场", is_correct: true },
  { submission_id: "newest", character_name: "礼堂", is_correct: false },
  { submission_id: "oldest", character_name: "操场", is_correct: true },
  { submission_id: "oldest", character_name: "老师", is_correct: true },
];

describe("buildGradingHistory", () => {
  it("maps the latest summary and orders attempts oldest to newest", () => {
    const history = buildGradingHistory(submissions, results, [lesson]);

    expect(history?.latest).toMatchObject({
      title: "第十课 - 我们的校园",
      score: 67,
      correctCount: 1,
      totalCount: 2,
      reviewCount: 1,
      status: "Needs Review",
    });
    expect(history?.attempts.map((attempt) => attempt.date)).toEqual([
      expect.stringContaining("07 Jun"),
      expect.stringContaining("14 Jun"),
    ]);
  });

  it("uses a neutral value for a missing character result", () => {
    expect(buildGradingHistory(submissions, results, [lesson])?.attempts[0].results).toEqual([
      true,
      null,
      true,
    ]);
  });

  it("marks a perfect latest score as completed", () => {
    const perfectLatest = [{ ...submissions[1], id: "newest", created_at: "2026-06-14T09:30:00Z" }];
    expect(buildGradingHistory(perfectLatest, results.filter((result) => result.submission_id === "oldest"), [lesson])?.latest.status).toBe("Completed");
  });

  it("returns null when there are no submissions", () => {
    expect(buildGradingHistory([], [], [])).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import {
  DEFAULT_DEMO_LESSON_ID,
  resolveCameraLessonId,
} from "@/lib/camera/lesson";

describe("resolveCameraLessonId", () => {
  it("uses the lesson ID from the URL", () => {
    expect(resolveCameraLessonId("lesson-from-syllabus")).toBe("lesson-from-syllabus");
  });

  it("uses the demo lesson when the URL has no lesson ID", () => {
    expect(resolveCameraLessonId(undefined)).toBe(DEFAULT_DEMO_LESSON_ID);
    expect(resolveCameraLessonId("  ")).toBe(DEFAULT_DEMO_LESSON_ID);
  });
});

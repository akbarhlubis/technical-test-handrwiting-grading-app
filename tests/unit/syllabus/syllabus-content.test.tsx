import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SyllabusContent from "@/components/syllabus/syllabus-content";

const lesson = {
  id: "865dc30c-a821-4589-b088-a4a96d883541",
  title: "Live lesson",
  level: "P2" as const,
  vocabulary: ["practice"],
};

describe("SyllabusContent", () => {
  afterEach(cleanup);

  it("keeps the live Practice & Grade lesson link", () => {
    render(<SyllabusContent lessons={[lesson]} selectedLevel="P2" />);

    expect(screen.getByRole("link", { name: "Practice & Grade" }).getAttribute("href")).toBe(
      "/camera?lessonId=865dc30c-a821-4589-b088-a4a96d883541",
    );
  });

  it("uses the selected level for the heading, active state, and selector links", () => {
    render(<SyllabusContent lessons={[]} selectedLevel="P4" />);

    expect(screen.getByRole("heading", { name: /MOE Primary 4Syllabus/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "P4" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "P1" }).getAttribute("href")).toBe("/syllabus?level=P1");
    expect(screen.getByRole("link", { name: "P6" }).getAttribute("href")).toBe("/syllabus?level=P6");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SyllabusContent from "@/components/syllabus/syllabus-content";

describe("SyllabusContent", () => {
  it("links an expanded live lesson to Camera with its lesson ID", () => {
    render(
      <SyllabusContent
        lessons={[
          {
            id: "865dc30c-a821-4589-b088-a4a96d883541",
            title: "Live lesson",
            level: "P2",
            vocabulary: ["操场"],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Practice & Grade" }).getAttribute("href")).toBe(
      "/camera?lessonId=865dc30c-a821-4589-b088-a4a96d883541",
    );
  });
});

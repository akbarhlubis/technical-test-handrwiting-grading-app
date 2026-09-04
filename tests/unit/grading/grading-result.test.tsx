import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GradingResult from "@/components/grading/grading-result";

describe("GradingResult", () => {
  it("renders the backend score and correct/incorrect states", () => {
    render(
      <GradingResult
        imageUrl="blob:handwriting"
        score={67}
        results={[
          { characterName: "操场", recognizedText: "操场", isCorrect: true },
          { characterName: "礼堂", recognizedText: "礼堂", isCorrect: false },
        ]}
        onRetake={vi.fn()}
      />,
    );

    expect(screen.getByText("67")).toBeTruthy();
    expect(screen.getByText("Correct")).toBeTruthy();
    expect(screen.getByText("Needs practice")).toBeTruthy();
    expect(screen.getAllByText("礼堂")).toHaveLength(2);
  });
});

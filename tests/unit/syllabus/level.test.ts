import { describe, expect, it } from "vitest";
import { resolveSyllabusLevel } from "@/lib/syllabus/level";

describe("resolveSyllabusLevel", () => {
  it("defaults missing, invalid, and malformed values to P2", () => {
    expect(resolveSyllabusLevel(undefined)).toBe("P2");
    expect(resolveSyllabusLevel("INVALID")).toBe("P2");
    expect(resolveSyllabusLevel(["P1"])).toBe("P2");
  });

  it("accepts supported P1-P6 values", () => {
    expect(resolveSyllabusLevel("P1")).toBe("P1");
    expect(resolveSyllabusLevel("P6")).toBe("P6");
  });
});

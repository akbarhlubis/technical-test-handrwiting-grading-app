export const SYLLABUS_LEVELS = ["P1", "P2", "P3", "P4", "P5", "P6"] as const;

export type MoeLevel = (typeof SYLLABUS_LEVELS)[number];

export function resolveSyllabusLevel(value: string | string[] | undefined): MoeLevel {
  if (typeof value === "string" && SYLLABUS_LEVELS.includes(value as MoeLevel)) {
    return value as MoeLevel;
  }

  return "P2";
}

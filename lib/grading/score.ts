export type ScoreableResult = {
  isCorrect: boolean;
};

export function calculateScore(results: ScoreableResult[]): number {
  if (results.length === 0) {
    return 0;
  }

  const correctCount = results.filter((result) => result.isCorrect).length;
  return Math.round((correctCount / results.length) * 100);
}

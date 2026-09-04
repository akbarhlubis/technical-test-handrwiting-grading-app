import type { CharacterResult } from "@/components/grading/types";

type GradingResultProps = {
  imageUrl: string;
  score: number;
  results: CharacterResult[];
  onRetake: () => void;
};

export default function GradingResult({
  imageUrl,
  score,
  results,
  onRetake,
}: GradingResultProps) {
  const incorrectResults = results.filter((result) => !result.isCorrect);

  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-8 text-[#1f2925] sm:px-10">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#b5573d]">
          Grading complete
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-serif text-4xl leading-tight sm:text-6xl">Your result</h1>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#53605a]">Score</p>
            <p className="font-serif text-5xl text-[#b5573d] sm:text-6xl">{score}</p>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] border-8 border-white bg-[#d8d1c5] shadow-[0_24px_70px_rgba(49,42,31,0.18)]">
          <img src={imageUrl} alt="Submitted handwriting" className="h-auto w-full" />
          {incorrectResults.map((result, index) => (
            <div
              key={`${result.characterName}-${index}`}
              className="absolute rounded-lg border-2 border-[#b33a32] bg-[#fff7f1]/95 px-3 py-2 font-serif text-2xl text-[#b33a32] shadow-lg"
              style={{
                left: `${12 + ((index * 29) % 63)}%`,
                top: `${15 + ((index * 23) % 65)}%`,
                transform: "rotate(-4deg)",
              }}
            >
              {result.characterName}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white/70 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Word by word</h2>
          <ul className="mt-4 divide-y divide-[#d8d1c5]">
            {results.map((result, index) => (
              <li
                key={`${result.characterName}-${index}`}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className={result.isCorrect ? "text-[#2d7658]" : "text-[#b33a32]"}>
                  {result.characterName}
                </span>
                <span
                  className={`text-sm font-semibold ${result.isCorrect ? "text-[#2d7658]" : "text-[#b33a32]"}`}
                >
                  {result.isCorrect ? "Correct" : "Needs practice"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onRetake}
          className="mt-7 w-full rounded-full bg-[#1f2925] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#35443d]"
        >
          Try another page
        </button>
      </section>
    </main>
  );
}

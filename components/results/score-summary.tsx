type ScoreSummaryProps = {
  score: number;
  correctCount: number;
  totalCount: number;
  gradedAt: string;
  reviewCount: number;
};

export default function ScoreSummary({
  score,
  correctCount,
  totalCount,
  gradedAt,
  reviewCount,
}: ScoreSummaryProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-[#29483c] p-6 text-white shadow-[0_18px_45px_rgba(41,72,60,0.18)] sm:p-8" aria-label="Test score summary">
      <div className="flex items-center gap-6 sm:gap-10">
        <div className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full sm:h-40 sm:w-40" style={{ background: `conic-gradient(#e3b56f ${score}%, #587666 0)` }}>
          <div className="grid h-[calc(100%-12px)] w-[calc(100%-12px)] place-items-center rounded-full bg-[#29483c] text-center sm:h-[calc(100%-16px)] sm:w-[calc(100%-16px)]">
            <div><p className="font-serif text-4xl leading-none sm:text-5xl">{score}%</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#b9d1bd]">Score</p></div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b9d1bd]">Test result</p>
          <p className="mt-3 font-serif text-2xl sm:text-3xl">{correctCount}/{totalCount} correct</p>
          <p className="mt-4 text-sm text-[#d0ddd1]">Graded {gradedAt}</p>
          <p className="mt-1 text-sm text-[#d0ddd1]">{reviewCount} characters need review</p>
        </div>
      </div>
    </section>
  );
}

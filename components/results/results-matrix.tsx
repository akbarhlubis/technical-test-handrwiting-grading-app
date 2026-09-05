export type HistoryAttempt = {
  date: string;
  results: (boolean | null)[];
};

type ResultsMatrixProps = {
  words: string[];
  attempts: HistoryAttempt[];
};

export default function ResultsMatrix({ words, attempts }: ResultsMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-[1.7rem] border border-[#dce3dc] bg-white shadow-sm">
      <table className="w-full min-w-[430px] border-collapse text-left">
        <caption className="sr-only">Historical handwriting results by character and test date</caption>
        <thead>
          <tr className="border-b border-[#edf0eb] text-[10px] font-bold uppercase tracking-[0.15em] text-[#83948b]">
            <th scope="col" className="sticky left-0 bg-white px-5 py-4 sm:px-6">Character</th>
            {attempts.map((attempt) => <th scope="col" key={attempt.date} className="whitespace-nowrap px-4 py-4 text-center">{attempt.date}</th>)}
          </tr>
        </thead>
        <tbody>
          {words.map((word, wordIndex) => <tr key={word} className="border-b border-[#edf0eb] last:border-0">
            <th scope="row" className="sticky left-0 bg-white px-5 py-5 font-serif text-2xl font-normal text-[#29483c] sm:px-6">{word}</th>
            {attempts.map((attempt) => {
              const correct = attempt.results[wordIndex];
              const missing = correct === null || correct === undefined;
              const label = missing ? `${word} not recorded on ${attempt.date}` : correct ? `${word} correct on ${attempt.date}` : `${word} incorrect on ${attempt.date}`;
              return <td key={attempt.date} className="px-4 py-5 text-center"><span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold ${missing ? "bg-[#f1f3ef] text-[#9aa8a0]" : correct ? "bg-[#e2eee3] text-[#347052]" : "bg-[#f7e2d9] text-[#a84d39]"}`} aria-label={label}>{missing ? "—" : correct ? "✓" : "×"}</span></td>;
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

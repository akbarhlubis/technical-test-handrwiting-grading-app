import Link from "next/link";
import AppHeader from "@/components/layout/app-header";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import ResultsMatrix, { type HistoryAttempt } from "@/components/results/results-matrix";
import ScoreSummary from "@/components/results/score-summary";

const resultSummary = {
  title: "Week 4 Syllabus Test",
  status: "Needs Review",
  score: 80,
  correctCount: 8,
  totalCount: 10,
  gradedAt: "14 Jun 2026 at 09:30",
  reviewCount: 2,
};

const words = ["操场", "礼堂", "老师"];
const historyAttempts: HistoryAttempt[] = [
  { date: "07 Jun", results: [true, true, false] },
  { date: "10 Jun", results: [true, false, true] },
  { date: "14 Jun", results: [false, true, true] },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ed] pb-32 text-[#1b3028]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <AppHeader name="Akbar" />
        <div className="max-w-3xl">
          <header className="pb-7 pt-8 sm:pb-9 sm:pt-10">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b5573d]">Test feedback</p><h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{resultSummary.title}</h1></div>
              <span className="mt-1 shrink-0 rounded-full bg-[#f7e2d9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#a84d39]">{resultSummary.status}</span>
            </div>
          </header>

          <ScoreSummary {...resultSummary} />

          <section className="mt-9">
            <div className="flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#83948b]">History</p><h2 className="mt-1 font-serif text-3xl">Results over time</h2></div><span className="text-xs font-semibold text-[#83948b]">3 tests</span></div>
            <div className="mt-5"><ResultsMatrix words={words} attempts={historyAttempts} /></div>
            <div className="mt-4 flex items-center justify-end gap-4 text-xs text-[#71847a]"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#75a47e]" />Correct</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#c76b55]" />Needs practice</span></div>
          </section>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button type="button" disabled aria-label="Share report is not available yet" className="rounded-full border border-[#29483c] px-4 py-3.5 text-sm font-bold text-[#29483c] opacity-60">Share Report</button>
            <Link href="/camera" className="rounded-full bg-[#b5573d] px-4 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#984633]">Retest Missed</Link>
          </div>
        </div>
      </div>
      <BottomNavigation activeItem="history" />
    </main>
  );
}

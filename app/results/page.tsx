import Link from "next/link";
import AppHeader from "@/components/layout/app-header";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import ResultsMatrix from "@/components/results/results-matrix";
import ScoreSummary from "@/components/results/score-summary";
import { getGradingHistory, type GradingHistory } from "@/lib/results/get-grading-history";

function EmptyState() {
  return <section className="rounded-[2rem] border border-[#dce3dc] bg-white p-8 text-center shadow-sm"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e2eee3] text-2xl text-[#347052]">+</div><h1 className="mt-5 font-serif text-3xl text-[#29483c]">No grading history yet.</h1><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#71847a]">Scan and grade your first worksheet to see results here.</p><Link href="/camera" className="mt-6 inline-flex rounded-full bg-[#b5573d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#984633]">Scan Worksheet</Link></section>;
}

function ErrorState() {
  return <section className="rounded-[2rem] border border-[#ead1c8] bg-[#fff7f1] p-8 text-center"><h1 className="font-serif text-3xl text-[#8f382f]">History unavailable</h1><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8f6258]">We couldn&apos;t load your grading history right now.</p><div className="mt-6 flex justify-center gap-3"><Link href="/" className="rounded-full border border-[#29483c] px-5 py-3 text-sm font-bold text-[#29483c]">Dashboard</Link><Link href="/camera" className="rounded-full bg-[#b5573d] px-5 py-3 text-sm font-bold text-white">Scan Worksheet</Link></div></section>;
}

function ResultsContent({ history }: { history: GradingHistory }) {
  return <>
    <header className="pb-7 pt-8 sm:pb-9 sm:pt-10"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b5573d]">Test feedback</p><h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{history.latest.title}</h1></div><span className={`mt-1 shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${history.latest.status === "Completed" ? "bg-[#e2eee3] text-[#347052]" : "bg-[#f7e2d9] text-[#a84d39]"}`}>{history.latest.status}</span></div></header>
    <ScoreSummary {...history.latest} />
    <section className="mt-9"><div className="flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#83948b]">History</p><h2 className="mt-1 font-serif text-3xl">Results over time</h2></div><span className="text-xs font-semibold text-[#83948b]">{history.attempts.length} {history.attempts.length === 1 ? "test" : "tests"}</span></div><div className="mt-5"><ResultsMatrix words={history.words} attempts={history.attempts} /></div><div className="mt-4 flex items-center justify-end gap-4 text-xs text-[#71847a]"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#75a47e]" />Correct</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#c76b55]" />Needs practice</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#9aa8a0]" />Not recorded</span></div></section>
    <div className="mt-8 grid grid-cols-2 gap-3"><button type="button" disabled aria-label="Share report is not available yet" className="rounded-full border border-[#29483c] px-4 py-3.5 text-sm font-bold text-[#29483c] opacity-60">Share Report</button><Link href="/camera" className="rounded-full bg-[#b5573d] px-4 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#984633]">Retest Missed</Link></div>
  </>;
}

export default async function ResultsPage() {
  let history: GradingHistory | null = null;
  let hasError = false;
  try { history = await getGradingHistory(); } catch (error) { hasError = true; console.error("Results history loading failed.", error instanceof Error ? error.message : "Unknown error"); }

  return <main className="min-h-screen bg-[#f5f3ed] pb-32 text-[#1b3028]"><div className="mx-auto max-w-5xl px-5 sm:px-8"><AppHeader name="Akbar" /><div className="max-w-3xl">{hasError ? <ErrorState /> : history ? <ResultsContent history={history} /> : <EmptyState />}</div></div><BottomNavigation activeItem="history" /></main>;
}

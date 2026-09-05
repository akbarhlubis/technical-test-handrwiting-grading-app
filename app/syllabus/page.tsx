"use client";

import { useState } from "react";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import AppHeader from "@/components/layout/app-header";

type Lesson = {
  week: string;
  title: string;
  status: "Pending Practice" | "Completed" | "Needs Revision";
  score?: string;
  vocabulary?: string[];
};

const levels = ["P1", "P2", "P3", "P4", "P5", "P6"];
const lessons: Lesson[] = [
  { week: "Week 4", title: "《第十课 - 我们的校园》", status: "Pending Practice", vocabulary: ["操场", "礼堂", "老师"] },
  { week: "Week 3", title: "《第九课 - 我的家》", status: "Completed", score: "80%" },
  { week: "Week 5", title: "《第十一课 - 快乐的一天》", status: "Needs Revision" },
];

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 fill-none stroke-current stroke-[1.8] transition-transform ${expanded ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>;
}

function FileIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h4" /></svg>;
}

function StatusPill({ lesson }: { lesson: Lesson }) {
  const styles = lesson.status === "Completed" ? "bg-[#e2eee3] text-[#347052]" : lesson.status === "Needs Revision" ? "bg-[#f7e2d9] text-[#a84d39]" : "bg-[#f3e8d5] text-[#9b6a37]";
  return <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${styles}`}>{lesson.status}{lesson.score ? ` (${lesson.score})` : ""}</span>;
}

export default function SyllabusPage() {
  const [expandedWeek, setExpandedWeek] = useState("Week 4");

  return (
    <main className="min-h-screen bg-[#f5f3ed] pb-32 text-[#1b3028]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <AppHeader name="Akbar" />
        <div className="max-w-3xl">
        <header className="py-8 sm:py-10">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b5573d]">Learning plan</p><h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">MOE Primary 2<br />Syllabus</h1><p className="mt-3 text-sm text-[#809087]">24 Lessons Total</p></div>
        </header>

        <section aria-label="Primary level selector" className="grid grid-cols-6 gap-2 rounded-2xl border border-[#dce3dc] bg-white p-2 shadow-sm">
          {levels.map((level) => <button key={level} type="button" aria-pressed={level === "P2"} className={`rounded-xl py-2.5 text-xs font-bold transition ${level === "P2" ? "bg-[#29483c] text-white shadow-sm" : "text-[#8b9b92] hover:bg-[#edf2ed]"}`}>{level}</button>)}
        </section>

        <section className="mt-9">
          <div className="flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#83948b]">Course outline</p><h2 className="mt-1 font-serif text-3xl">Your lessons</h2></div><span className="text-xs font-semibold text-[#83948b]">2026</span></div>
          <div className="mt-5 space-y-4">
            {lessons.map((lesson) => {
              const expanded = expandedWeek === lesson.week;
              return <article key={lesson.week} className={`overflow-hidden rounded-[1.7rem] border bg-white shadow-sm transition ${expanded ? "border-[#b7cdbc]" : "border-[#dce3dc]"}`}>
                <button type="button" aria-expanded={expanded} onClick={() => setExpandedWeek(expanded ? "" : lesson.week)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                  <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5573d]">{lesson.week}</p><h3 className="mt-2 truncate font-serif text-2xl text-[#29483c] sm:text-3xl">{lesson.title}</h3></div>
                  <div className="flex shrink-0 items-center gap-3 text-[#809087]"><StatusPill lesson={lesson} /><ChevronIcon expanded={expanded} /></div>
                </button>
                {expanded && lesson.vocabulary && <div className="border-t border-[#edf0eb] px-5 pb-5 pt-5 sm:px-6 sm:pb-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#83948b]">Vocabulary to practise</p><div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">{lesson.vocabulary.map((word) => <div key={word} className="rounded-2xl bg-[#f1f5ef] px-2 py-4 text-center font-serif text-2xl text-[#29483c] sm:text-3xl">{word}</div>)}</div><button type="button" disabled aria-label="Print A4 worksheet PDF is not available yet" className="mt-5 flex w-full cursor-not-allowed items-center justify-between rounded-2xl border border-[#dce3dc] px-4 py-3.5 text-left text-sm font-semibold text-[#9aa8a0]"><span className="flex items-center gap-3"><FileIcon />Print A4 Worksheet (PDF)</span><ChevronIcon expanded={false} /></button></div>}
              </article>;
            })}
          </div>
        </section>
        </div>
      </div>
      <BottomNavigation activeItem="syllabus" />
    </main>
  );
}

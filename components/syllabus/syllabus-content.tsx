"use client";

import { useState } from "react";
import Link from "next/link";
import type { SyllabusLesson } from "@/lib/syllabus/get-lessons";
import { SYLLABUS_LEVELS, type MoeLevel } from "@/lib/syllabus/level";

type LessonStatus = "Pending Practice" | "Completed" | "Needs Revision";

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={"h-5 w-5 fill-none stroke-current stroke-[1.8] transition-transform " + (expanded ? "rotate-180" : "")}><path d="m6 9 6 6 6-6" /></svg>;
}

function FileIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h4" /></svg>;
}

function StatusPill({ status }: { status: LessonStatus }) {
  const styles = status === "Completed" ? "bg-[#e2eee3] text-[#347052]" : status === "Needs Revision" ? "bg-[#f7e2d9] text-[#a84d39]" : "bg-[#f3e8d5] text-[#9b6a37]";
  return <span className={"rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] " + styles}>{status}</span>;
}

function getPresentationStatus(index: number): LessonStatus {
  return index === 0 ? "Pending Practice" : "Completed";
}

export default function SyllabusContent({ lessons, selectedLevel, hasError = false }: { lessons: SyllabusLesson[]; selectedLevel: MoeLevel; hasError?: boolean }) {
  const [expandedLessonId, setExpandedLessonId] = useState(lessons[0]?.id ?? "");

  return <>
    <header className="py-8 sm:py-10"><div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b5573d]">Learning plan</p><h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">MOE Primary {selectedLevel.slice(1)}<br />Syllabus</h1><p className="mt-3 text-sm text-[#809087]">{lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"} Total</p></div></header>
    <section aria-label="Primary level selector" className="grid grid-cols-6 gap-2 rounded-2xl border border-[#dce3dc] bg-white p-2 shadow-sm">{SYLLABUS_LEVELS.map((level) => <Link key={level} href={"/syllabus?level=" + level} aria-current={level === selectedLevel ? "page" : undefined} className={"rounded-xl py-2.5 text-center text-xs font-bold transition " + (level === selectedLevel ? "bg-[#29483c] text-white shadow-sm" : "text-[#8b9b92] hover:bg-[#edf2ed]")}>{level}</Link>)}</section>
    <section className="mt-9"><div className="flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#83948b]">Course outline</p><h2 className="mt-1 font-serif text-3xl">Your lessons</h2></div><span className="text-xs font-semibold text-[#83948b]">2026</span></div>
      {hasError ? <p className="mt-5 rounded-[1.7rem] border border-dashed border-[#e1c9c0] bg-white px-5 py-8 text-sm text-[#a84d39]">We couldn&apos;t load the syllabus right now.</p> : lessons.length === 0 ? <p className="mt-5 rounded-[1.7rem] border border-dashed border-[#cdd9cf] bg-white px-5 py-8 text-sm text-[#809087]">No syllabus lessons available for this level yet.</p> : <div className="mt-5 space-y-4">{lessons.map((lesson, index) => { const expanded = expandedLessonId === lesson.id; return <article key={lesson.id} className={"overflow-hidden rounded-[1.7rem] border bg-white shadow-sm transition " + (expanded ? "border-[#b7cdbc]" : "border-[#dce3dc]")}>
        <button type="button" aria-expanded={expanded} onClick={() => setExpandedLessonId(expanded ? "" : lesson.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5573d]">Week {index + 4}</p><h3 className="mt-2 truncate font-serif text-2xl text-[#29483c] sm:text-3xl">{lesson.title}</h3><p className="mt-1 text-xs text-[#809087]">{lesson.level}</p></div><div className="flex shrink-0 items-center gap-3 text-[#809087]"><StatusPill status={getPresentationStatus(index)} /><ChevronIcon expanded={expanded} /></div></button>
        {expanded && <div className="border-t border-[#edf0eb] px-5 pb-5 pt-5 sm:px-6 sm:pb-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#83948b]">Vocabulary to practise</p><div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">{lesson.vocabulary.map((word) => <div key={word} className="rounded-2xl bg-[#f1f5ef] px-2 py-4 text-center font-serif text-2xl text-[#29483c] sm:text-3xl">{word}</div>)}</div><Link href={"/camera?lessonId=" + lesson.id} className="mt-5 flex w-full items-center justify-center rounded-full bg-[#29483c] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f392f]">Practice &amp; Grade</Link><button type="button" disabled aria-label="Print A4 worksheet PDF is not available yet" className="mt-3 flex w-full cursor-not-allowed items-center justify-between rounded-2xl border border-[#dce3dc] px-4 py-3.5 text-left text-sm font-semibold text-[#9aa8a0]"><span className="flex items-center gap-3"><FileIcon />Print A4 Worksheet (PDF)</span><ChevronIcon expanded={false} /></button></div>}
      </article>; })}</div>}
    </section>
  </>;
}

import Link from "next/link";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import AppHeader from "@/components/layout/app-header";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2]"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 10h18" /></svg>;
}

const week = [
  { day: "Mon", date: "12" },
  { day: "Tue", date: "13" },
  { day: "Wed", date: "14" },
  { day: "Thu", date: "15" },
  { day: "Fri", date: "16" },
  { day: "Sat", date: "17" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f3ed] pb-28 text-[#1b3028]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <AppHeader name="Akbar" />

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-[#29483c] p-6 text-white shadow-[0_18px_45px_rgba(41,72,60,0.18)] sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b9d1bd]">Prepaid lesson credits</p>
              <p className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">12 of 20</p>
              <p className="mt-1 text-sm text-[#c8d8cc]">Remaining lessons</p>
            </div>
            <div className="rounded-full bg-[#d7e8d6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#315d49]">Active</div>
          </div>
          <div className="mt-7 h-2 rounded-full bg-[#587666]" aria-label="12 of 20 credits remaining"><div className="h-full w-[60%] rounded-full bg-[#e3b56f]" /></div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-[#b9d1bd]">Valid until 31 Dec 2026</p>
            <button type="button" className="rounded-full bg-[#f5f3ed] px-4 py-2 text-xs font-bold text-[#29483c] transition hover:bg-white">Top Up</button>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-[1.5rem] border border-[#dce3dc] bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8b9b92]">Mastery rate</p>
            <p className="mt-3 font-serif text-3xl text-[#29483c]">82.4%</p>
            <div className="mt-4 h-1.5 rounded-full bg-[#e8eee8]"><div className="h-full w-[82.4%] rounded-full bg-[#75a47e]" /></div>
          </div>
          <div className="rounded-[1.5rem] border border-[#dce3dc] bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8b9b92]">Practiced</p>
            <p className="mt-3 font-serif text-3xl text-[#29483c]">48</p>
            <p className="mt-1 text-xs text-[#788980]">Characters</p>
          </div>
        </section>

        <section className="mt-9">
          <div className="flex items-end justify-between">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b5573d]">This week</p><h2 className="mt-1 font-serif text-3xl tracking-tight">Upcoming Ting Xie</h2></div>
            <Link href="/syllabus" className="text-xs font-bold text-[#47745b] transition hover:text-[#29483c]">View All</Link>
          </div>
          <div className="mt-5 grid grid-cols-6 gap-2">
            {week.map((item) => <div key={item.day} className={`rounded-2xl px-1 py-3 text-center ${item.day === "Wed" ? "bg-[#29483c] text-white shadow-md" : "bg-white text-[#809087]"}`}><p className="text-[10px] font-semibold">{item.day}</p><p className="mt-1 font-serif text-xl">{item.date}</p>{item.day === "Wed" && <span className="mx-auto mt-2 block h-1 w-1 rounded-full bg-[#e3b56f]" />}</div>)}
          </div>
        </section>

        <section className="mt-5 rounded-[2rem] border border-[#dce3dc] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-[#b5573d]"><CalendarIcon /><span className="text-[10px] font-bold uppercase tracking-[0.19em]">Upcoming test</span></div>
              <h3 className="mt-5 font-serif text-3xl text-[#29483c]">Week 4</h3>
              <p className="mt-1 text-lg font-semibold text-[#40564c]">《第十课》</p>
              <p className="mt-1 text-sm text-[#809087]">Spelling Test</p>
            </div>
            <div className="rounded-2xl bg-[#f3e8d5] px-3 py-2 text-center text-[#8b6037]"><p className="text-[10px] font-bold uppercase tracking-[0.14em]">Wed</p><p className="mt-1 text-sm font-bold">14 Jun</p></div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[#edf0eb] pt-4 text-xs text-[#809087]"><span>10 characters</span><span>09:00 - 09:30</span></div>
        </section>

        <Link href="/camera" className="mt-6 flex items-center justify-between rounded-full bg-[#b5573d] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_25px_rgba(181,87,61,0.22)] transition hover:bg-[#984633]"><span>Scan &amp; Grade Worksheet</span><ArrowIcon /></Link>
      </div>
      <BottomNavigation />
    </main>
  );
}

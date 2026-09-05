import Link from "next/link";

type NavigationIconProps = { active?: boolean };

function HomeIcon({ active }: NavigationIconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? "fill-current" : "fill-none stroke-current stroke-[1.8]"}`}><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" /></svg>;
}

function BookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 5.5V21M8 7h8M8 11h8" /></svg>;
}

function HistoryIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.5M4 4v4.5h4.5M12 8v4l2.5 2" /></svg>;
}

function SparkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>;
}

export default function BottomNavigation() {
  return <nav aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#e0e7df] bg-[#fbfaf6]/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md"><div className="mx-auto grid max-w-xl grid-cols-4"><Link href="/" aria-current="page" className="flex flex-col items-center gap-1 text-[#29483c]"><HomeIcon active /><span className="text-[10px] font-bold">Dashboard</span></Link><Link href="/syllabus" className="flex flex-col items-center gap-1 text-[#8b9b92] transition hover:text-[#29483c]"><BookIcon /><span className="text-[10px] font-semibold">Syllabus</span></Link><Link href="/results" className="flex flex-col items-center gap-1 text-[#8b9b92] transition hover:text-[#29483c]"><HistoryIcon /><span className="text-[10px] font-semibold">History</span></Link><button type="button" disabled aria-label="Premium is not available yet" className="flex cursor-not-allowed flex-col items-center gap-1 text-[#b7c0ba]"><SparkIcon /><span className="text-[10px] font-semibold">Premium</span></button></div></nav>;
}

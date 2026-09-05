type AppHeaderProps = {
  name: string;
  showStudentCard?: boolean;
  studentName?: string;
  level?: string;
};

function BellIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>;
}

export default function AppHeader({ name, showStudentCard = true, studentName = "Lucas - Primary 2", level = "P2" }: AppHeaderProps) {
  return <>
    <header className="flex items-center justify-between py-7 sm:py-9">
      <div><p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#83948b]">Welcome back,</p><h1 className="mt-1 font-serif text-3xl tracking-tight sm:text-4xl">{name}</h1></div>
      <button type="button" aria-label="View notifications" className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dce3dc] bg-white text-[#476055] shadow-sm transition hover:bg-[#edf2ed]"><BellIcon /><span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#c15c43]" /></button>
    </header>
    {showStudentCard && <section className="flex items-center justify-between rounded-2xl border border-[#dce3dc] bg-white px-4 py-3 shadow-sm sm:px-5">
      <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b9b92]">Class</p><p className="mt-1 text-sm font-semibold text-[#274138]">{studentName}</p></div>
      <span className="rounded-full bg-[#dce9df] px-2.5 py-1 text-[10px] font-semibold text-[#276047]">{level}</span>
    </section>}
  </>;
}

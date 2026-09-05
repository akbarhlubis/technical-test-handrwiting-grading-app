import AppHeader from "@/components/layout/app-header";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import SyllabusContent from "@/components/syllabus/syllabus-content";
import { getLessons, type SyllabusLesson } from "@/lib/syllabus/get-lessons";
import { resolveSyllabusLevel } from "@/lib/syllabus/level";

export const dynamic = "force-dynamic";

export default async function SyllabusPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string | string[] }>;
}) {
  const { level } = await searchParams;
  const selectedLevel = resolveSyllabusLevel(level);
  let lessons: SyllabusLesson[] = [];
  let hasError = false;

  try {
    lessons = await getLessons(selectedLevel);
  } catch (error) {
    hasError = true;
    console.error("[syllabus] Failed to load lessons", error);
  }

  return <main className="min-h-screen bg-[#f5f3ed] pb-32 text-[#1b3028]"><div className="mx-auto max-w-5xl px-5 sm:px-8"><AppHeader name="Akbar" /><div className="max-w-3xl"><SyllabusContent lessons={lessons} selectedLevel={selectedLevel} hasError={hasError} /></div></div><BottomNavigation activeItem="syllabus" /></main>;
}

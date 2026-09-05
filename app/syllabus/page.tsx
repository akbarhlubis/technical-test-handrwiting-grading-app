import AppHeader from "@/components/layout/app-header";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import SyllabusContent from "@/components/syllabus/syllabus-content";
import { getLessons, type SyllabusLesson } from "@/lib/syllabus/get-lessons";

export const dynamic = "force-dynamic";

export default async function SyllabusPage() {
  let lessons: SyllabusLesson[] = [];
  let hasError = false;

  try {
    lessons = await getLessons("P2");
  } catch (error) {
    hasError = true;
    console.error("[syllabus] Failed to load lessons", error);
  }

  return <main className="min-h-screen bg-[#f5f3ed] pb-32 text-[#1b3028]"><div className="mx-auto max-w-5xl px-5 sm:px-8"><AppHeader name="Akbar" /><div className="max-w-3xl"><SyllabusContent lessons={lessons} hasError={hasError} /></div></div><BottomNavigation activeItem="syllabus" /></main>;
}

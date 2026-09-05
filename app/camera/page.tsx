import HandwritingCamera from "@/components/camera/handwriting-camera";
import { resolveCameraLessonId } from "@/lib/camera/lesson";

export default async function CameraPage({
  searchParams,
}: {
  searchParams: Promise<{ lessonId?: string | string[] }>;
}) {
  const { lessonId } = await searchParams;

  return <HandwritingCamera lessonId={resolveCameraLessonId(lessonId)} />;
}

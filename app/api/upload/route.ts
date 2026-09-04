import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { gradeHandwriting } from "@/lib/grading/grade-handwriting";
import { calculateScore } from "@/lib/grading/score";

export const dynamic = "force-dynamic";

const BUCKET_NAME = "handwriting-submissions" as const;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function isValidUuid(value: string) {
  return UUID_PATTERN.test(value);
}

async function removeUploadedImage(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  imagePath: string,
) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([imagePath]);

  if (error) {
    console.error("Supabase upload cleanup failed.", {
      code: error.name,
      message: error.message,
    });
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return jsonError("Request must use multipart/form-data.", 415);
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid multipart form data.", 400);
  }

  const imageValue = formData.get("image");
  const lessonIdValue = formData.get("lessonId");
  const studentIdValue = formData.get("studentId");

  if (!(imageValue instanceof File)) {
    return jsonError("An image file is required.", 400);
  }

  if (!IMAGE_EXTENSIONS[imageValue.type]) {
    return jsonError("Image must be JPEG, PNG, or WebP.", 415);
  }

  if (imageValue.size > MAX_IMAGE_SIZE_BYTES) {
    return jsonError("Image must not exceed 10 MB.", 413);
  }

  if (typeof lessonIdValue !== "string" || !lessonIdValue.trim()) {
    return jsonError("lessonId is required.", 400);
  }

  const lessonId = lessonIdValue.trim();

  if (!isValidUuid(lessonId)) {
    return jsonError("lessonId must be a valid UUID.", 400);
  }

  if (typeof studentIdValue !== "string" || !studentIdValue.trim()) {
    return jsonError("studentId is required.", 400);
  }

  const studentId = studentIdValue.trim();
  const submissionId = crypto.randomUUID();
  const imagePath = `submissions/${submissionId}.${IMAGE_EXTENSIONS[imageValue.type]}`;

  try {
    const supabase = createSupabaseAdminClient();
    const { data: lesson, error: lessonError } = await supabase
      .from("lessons")
      .select("word_list")
      .eq("id", lessonId)
      .maybeSingle();

    if (lessonError) {
      console.error("Supabase lesson lookup failed.", {
        code: lessonError.code,
        message: lessonError.message,
      });
      return jsonError("Unable to load lesson.", 500);
    }

    if (!lesson) {
      return jsonError("lessonId does not reference an existing lesson.", 400);
    }

    if (
      !Array.isArray(lesson.word_list) ||
      lesson.word_list.some((word: unknown) => typeof word !== "string")
    ) {
      console.error("Lesson word list has an invalid shape.");
      return jsonError("Lesson word list is invalid.", 500);
    }

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(imagePath, imageValue, {
        contentType: imageValue.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase image upload failed.", {
        code: uploadError.name,
        message: uploadError.message,
      });

      return jsonError("Unable to upload image.", 500);
    }

    const { error: submissionError } = await supabase
      .from("submissions")
      .insert({
        id: submissionId,
        lesson_id: lessonId,
        student_id: studentId,
        image_path: imagePath,
        score: null,
      });

    if (submissionError) {
      console.error("Supabase submission insert failed.", {
        code: submissionError.code,
        message: submissionError.message,
      });

      await removeUploadedImage(supabase, imagePath);

      if (submissionError.code === "23503") {
        return jsonError("lessonId does not reference an existing lesson.", 400);
      }

      return jsonError("Unable to create submission.", 500);
    }

    let gradingResults;
    try {
      gradingResults = await gradeHandwriting(imageValue, lesson.word_list);
    } catch (error) {
      console.error(
        "Gemini handwriting grading failed.",
        error instanceof Error ? error.message : "Unknown error",
      );

      return Response.json(
        {
          error: "Submission uploaded, but grading is temporarily unavailable.",
          submissionId,
        },
        { status: 502 },
      );
    }

    if (gradingResults.length > 0) {
      const { error: characterResultsError } = await supabase
        .from("character_results")
        .insert(
          gradingResults.map((result) => ({
            submission_id: submissionId,
            character_name: result.characterName,
            recognized_text: result.recognizedText,
            is_correct: result.isCorrect,
          })),
        );

      if (characterResultsError) {
        console.error("Supabase character result insert failed.", {
          code: characterResultsError.code,
          message: characterResultsError.message,
        });

        return jsonError("Unable to save grading results.", 500);
      }
    }

    const score = calculateScore(gradingResults);
    const { error: scoreError } = await supabase
      .from("submissions")
      .update({ score })
      .eq("id", submissionId);

    if (scoreError) {
      console.error("Supabase submission score update failed.", {
        code: scoreError.code,
        message: scoreError.message,
      });

      if (gradingResults.length > 0) {
        await supabase
          .from("character_results")
          .delete()
          .eq("submission_id", submissionId);
      }

      return jsonError("Unable to save submission score.", 500);
    }

    return Response.json(
      {
        submission: {
          id: submissionId,
          studentId,
          lessonId,
          imagePath,
          score,
        },
        results: gradingResults,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Submission upload failed.",
      error instanceof Error ? error.message : "Unknown error",
    );

    return jsonError("Unable to create submission.", 500);
  }
}

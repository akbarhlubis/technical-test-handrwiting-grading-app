import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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

    return Response.json(
      {
        submission: {
          id: submissionId,
          studentId,
          lessonId,
          imagePath,
          score: null,
        },
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

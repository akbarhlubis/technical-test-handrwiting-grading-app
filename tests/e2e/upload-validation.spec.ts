import { expect, test } from "@playwright/test";

const validLessonId = "00000000-0000-4000-8000-000000000000";

function validImage() {
  return {
    name: "handwriting.png",
    mimeType: "image/png",
    buffer: Buffer.from("not-a-real-image"),
  };
}

test("rejects a request without an image", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      lessonId: validLessonId,
      studentId: "student-1",
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toEqual({
    error: "An image file is required.",
  });
});

test("rejects an unsupported image MIME type", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      image: {
        name: "handwriting.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("not-an-image"),
      },
      lessonId: validLessonId,
      studentId: "student-1",
    },
  });

  expect(response.status()).toBe(415);
  await expect(response.json()).resolves.toEqual({
    error: "Image must be JPEG, PNG, or WebP.",
  });
});

test("rejects an image larger than 10 MB", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      image: {
        name: "large-handwriting.png",
        mimeType: "image/png",
        buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
      },
      lessonId: validLessonId,
      studentId: "student-1",
    },
  });

  expect(response.status()).toBe(413);
  await expect(response.json()).resolves.toEqual({
    error: "Image must not exceed 10 MB.",
  });
});

test("rejects a missing lessonId", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      image: validImage(),
      studentId: "student-1",
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toEqual({
    error: "lessonId is required.",
  });
});

test("rejects an invalid lessonId", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      image: validImage(),
      lessonId: "not-a-uuid",
      studentId: "student-1",
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toEqual({
    error: "lessonId must be a valid UUID.",
  });
});

test("rejects a missing studentId", async ({ request }) => {
  const response = await request.post("/api/upload", {
    multipart: {
      image: validImage(),
      lessonId: validLessonId,
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toEqual({
    error: "studentId is required.",
  });
});

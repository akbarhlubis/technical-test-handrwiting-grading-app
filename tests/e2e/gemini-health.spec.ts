import { expect, test } from "@playwright/test";

test("Gemini health endpoint returns a successful JSON response", async ({
  request,
}) => {
  const response = await request.get("/api/health/gemini");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/json");
  await expect(response.json()).resolves.toEqual({ ok: true });
});

import { expect, test } from "@playwright/test";

test("Supabase health endpoint returns a successful JSON response", async ({
  request,
}) => {
  const response = await request.get("/api/health/supabase");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/json");
  await expect(response.json()).resolves.toEqual({ ok: true });
});

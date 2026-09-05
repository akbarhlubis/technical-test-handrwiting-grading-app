import { beforeEach, describe, expect, it, vi } from "vitest";

const { eq, order } = vi.hoisted(() => ({
  eq: vi.fn(),
  order: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: () => ({
    from: () => ({
      select: () => ({
        eq,
      }),
    }),
  }),
}));

import { getLessons } from "@/lib/syllabus/get-lessons";

describe("getLessons", () => {
  beforeEach(() => {
    eq.mockReset();
    order.mockReset();
    order.mockResolvedValue({ data: [], error: null });
    eq.mockReturnValue({ order });
  });

  it("passes the selected level to the ordered Supabase query", async () => {
    await expect(getLessons("P4")).resolves.toEqual([]);

    expect(eq).toHaveBeenCalledWith("moe_level", "P4");
    expect(order).toHaveBeenCalledWith("created_at", { ascending: true });
  });
});

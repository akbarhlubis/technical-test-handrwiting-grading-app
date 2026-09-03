import { createClient } from "@supabase/supabase-js";

function getSupabaseConfig() {
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase server configuration is missing.");
  }

  return { supabaseUrl, supabasePublishableKey };
}

export function createSupabaseServerClient() {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig();

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

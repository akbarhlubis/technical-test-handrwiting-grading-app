import { createClient } from "@supabase/supabase-js";

function getSupabaseAdminConfig() {
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase privileged server configuration is missing.");
  }

  return { supabaseUrl, supabaseSecretKey };
}

export function createSupabaseAdminClient() {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseAdminConfig();

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

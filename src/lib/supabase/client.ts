import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createSupabaseBrowserClient() {
  if (!supabaseEnv.success) return null;
  return createBrowserClient<Database>(
    supabaseEnv.data.NEXT_PUBLIC_SUPABASE_URL,
    supabaseEnv.data.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}


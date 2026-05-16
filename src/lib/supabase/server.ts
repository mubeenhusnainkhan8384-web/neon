import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export async function createSupabaseServerClient() {
  if (!supabaseEnv.success) return null;
  const cookieStore = await cookies();

  return createServerClient<Database>(
    supabaseEnv.data.NEXT_PUBLIC_SUPABASE_URL,
    supabaseEnv.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, _cacheHeaders) {
        try {
          void _cacheHeaders;
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignore when called from a Server Component without a mutable response.
        }
      },
    },
    }
  );
}


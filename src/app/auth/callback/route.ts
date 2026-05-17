import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // "next" lets you redirect somewhere specific after login (optional)
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();

if (!supabase) {
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}

const { error } = await supabase.auth.exchangeCodeForSession(code);;

    if (!error) {
      // Successful auth — redirect to dashboard (or wherever "next" says)
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Something went wrong — redirect to login with an error hint
  return NextResponse.redirect(
    `${origin}/login?error=Could+not+authenticate+user`
  );
}

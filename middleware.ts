import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/product-research",
  "/keywords",
  "/listing-builder",
  "/profit-calculator",
  "/projects",
];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, keep the app usable in mock/demo mode.
  if (!supabaseUrl || !supabaseAnonKey) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const isProtected = isProtectedPath(pathname);
  const isLoginRoute = pathname.startsWith("/login");
  const isAuthCallbackRoute = pathname.startsWith("/auth/callback");

  // Let OAuth callbacks run uninterrupted.
  if (isAuthCallbackRoute) return NextResponse.next();

  // Skip auth checks for public routes (except `/login`, where we redirect signed-in users).
  if (!isProtected && !isLoginRoute) return NextResponse.next();

  const response = NextResponse.next();
  // Prevent cached auth responses (important behind CDNs / reverse proxies).
  response.headers.set("Cache-Control", "private, no-store");

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const header = request.headers.get("cookie") ?? "";
        return parseCookieHeader(header).map(({ name, value }) => ({
          name,
          value: value ?? "",
        }));
      },
      setAll(cookiesToSet, cacheHeaders) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options)
          );
        });
        Object.entries(cacheHeaders).forEach(([key, val]) => {
          response.headers.set(key, val);
        });
      },
    },
  });

  // Use validated JWT claims for auth decisions.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  const userId = typeof claims?.sub === "string" ? claims.sub : null;

  if (isProtected && !userId) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && userId) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.searchParams.delete("redirectTo");
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};


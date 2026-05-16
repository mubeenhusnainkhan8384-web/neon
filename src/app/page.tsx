import { redirect } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  // If already signed in, go straight to the app.
  // (Middleware also protects app routes; this improves UX for returning users.)
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            Neon
          </div>
          <div className="flex items-center gap-2">
            <LinkButton href="/login" variant="ghost">
              Sign in
            </LinkButton>
            <LinkButton href="/login">
              Get started <ArrowRight className="ml-2 size-4" />
            </LinkButton>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Built for students learning Amazon FBA
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Research faster. Build better listings. Estimate profit with confidence.
            </h1>
            <p className="text-pretty text-lg leading-7 text-muted-foreground">
              Neon is a clean, educational workspace for Amazon sellers: product research, keyword planning, listing
              drafts, and a profit calculator—powered by Supabase auth and a modern UI.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/login" size="lg">
                Continue with email <ArrowRight className="ml-2 size-4" />
              </LinkButton>
              <LinkButton href="/login" size="lg" variant="outline">
                Try the MVP demo
              </LinkButton>
            </div>
            <p className="text-xs text-muted-foreground">
              MVP uses mock data by default. Add Supabase env vars to enable real auth.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Research</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Evaluate niche demand and competition using a simple, explainable checklist.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Keywords</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Organize keywords into clusters and map them to listing sections.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Listing Builder</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Draft titles, bullets, and descriptions with structured guidance.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profit Calculator</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Quick unit economics with fees, COGS, shipping, and margin.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

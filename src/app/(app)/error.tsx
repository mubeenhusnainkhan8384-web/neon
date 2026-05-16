"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border bg-card p-6">
      <h1 className="text-lg font-semibold">Couldn’t load this page</h1>
      <p className="mt-1 text-sm text-muted-foreground">Try again. If it keeps happening, check your env vars.</p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}


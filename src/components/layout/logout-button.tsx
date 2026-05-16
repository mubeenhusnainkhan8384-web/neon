"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="icon"
      className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-9 h-9 transition-colors"
      title="Sign out"
    >
      <LogOut className="w-4 h-4" />
    </Button>
  );
}

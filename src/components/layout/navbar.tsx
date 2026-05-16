import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/layout/logout-button";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const displayName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Student";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/60 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 w-72 group focus-within:border-orange-500/40 transition-colors">
        <Search className="w-4 h-4 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
        <input
          type="text"
          placeholder="Search products, keywords..."
          className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none flex-1"
        />
        <kbd className="text-[10px] text-slate-600 bg-slate-700/50 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white hover:bg-slate-800 w-9 h-9"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-700/60" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200 leading-none">{displayName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-orange-500/20">
            {initials}
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

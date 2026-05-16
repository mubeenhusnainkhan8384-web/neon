"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Type,
  FileText,
  Calculator,
  FolderKanban,
  Package,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Product Research",
    href: "/dashboard/product-research",
    icon: Search,
  },
  {
    label: "Keyword Research",
    href: "/dashboard/keyword-research",
    icon: Type,
  },
  {
    label: "Listing Builder",
    href: "/dashboard/listing-builder",
    icon: FileText,
  },
  {
    label: "Profit Calculator",
    href: "/dashboard/profit-calculator",
    icon: Calculator,
  },
  {
    label: "My Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-950 border-r border-slate-800/60">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/60">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold text-white tracking-tight">Neon</span>
          <p className="text-[10px] text-slate-500 -mt-0.5 font-medium tracking-widest uppercase">Seller Suite</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">
          Main Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/70"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-orange-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-orange-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom badge */}
      <div className="px-4 py-4 border-t border-slate-800/60">
        <div className="rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/15 p-3">
          <p className="text-xs font-semibold text-orange-400 mb-0.5">Student Plan</p>
          <p className="text-[11px] text-slate-500 leading-snug">
            Free forever for verified students 🎓
          </p>
        </div>
      </div>
    </aside>
  );
}

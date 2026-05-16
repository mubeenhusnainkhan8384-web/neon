// src/app/(app)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Tag,
  FileText,
  Calculator,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  FolderOpen,        // ← Add this
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",          label: "Dashboard",         icon: LayoutDashboard },
  { href: "/product-research",   label: "Product Research",  icon: Search },
  { href: "/keywords",           label: "Keywords",          icon: Tag },
  { href: "/listing-builder",    label: "Listing Builder",   icon: FileText },
  { href: "/profit-calculator",  label: "Profit Calculator", icon: Calculator },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-1">
      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-surface-0 border-r border-surface transition-transform duration-200 lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-6 h-16 border-b border-surface">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-gray-900">
              Neon
            </span>
            <button
              className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Tools
            </p>
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium transition-all duration-100",
                    active
                      ? "bg-gray-900 text-white shadow-xs"
                      : "text-gray-600 hover:bg-surface-2 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-gray-400")}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 pb-4 space-y-0.5 border-t border-surface pt-3">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-gray-500 hover:bg-surface-2 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              Settings
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4 text-gray-400" />
              Sign out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="flex items-center gap-4 px-4 h-16 border-b border-surface bg-surface-0 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-900 text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900">Neon</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

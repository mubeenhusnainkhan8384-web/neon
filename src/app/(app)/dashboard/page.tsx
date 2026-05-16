// src/app/(app)/dashboard/page.tsx
"use client";

import Link from "next/link";
import {
  Search,
  Tag,
  FileText,
  Calculator,
  ArrowRight,
  TrendingUp,
  Package,
  BarChart3,
  Clock,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Mock data ───────────────────────────────────────── */
const stats = [
  {
    label: "Products Researched",
    value: "12",
    delta: "+3 this week",
    positive: true,
    icon: Package,
    color: "blue",
  },
  {
    label: "Keyword Clusters",
    value: "5",
    delta: "+1 this week",
    positive: true,
    icon: Tag,
    color: "emerald",
  },
  {
    label: "Listings Drafted",
    value: "3",
    delta: "2 in progress",
    positive: null,
    icon: FileText,
    color: "violet",
  },
  {
    label: "Avg. Est. Margin",
    value: "28%",
    delta: "+4% vs last",
    positive: true,
    icon: TrendingUp,
    color: "amber",
  },
];

const quickActions = [
  {
    href: "/product-research",
    label: "Product Research",
    description: "Evaluate niche demand and competition",
    icon: Search,
  },
  {
    href: "/keywords",
    label: "Keywords",
    description: "Organize and map keyword clusters",
    icon: Tag,
  },
  {
    href: "/listing-builder",
    label: "Listing Builder",
    description: "Draft titles, bullets, and descriptions",
    icon: FileText,
  },
  {
    href: "/profit-calculator",
    label: "Profit Calculator",
    description: "Unit economics with fees and margins",
    icon: Calculator,
  },
];

const recentActivity = [
  {
    type: "research",
    label: "Researched 'Silicone Baby Bibs'",
    meta: "Score: 74 / 100 · Good opportunity",
    time: "2 hours ago",
    icon: Search,
    status: "success",
  },
  {
    type: "listing",
    label: "Started listing draft for 'Insulated Tumblers'",
    meta: "Title + 3 bullets written",
    time: "Yesterday",
    icon: FileText,
    status: "in-progress",
  },
  {
    type: "keyword",
    label: "Created keyword cluster 'Pet Supplies'",
    meta: "18 keywords · 4 listing sections mapped",
    time: "2 days ago",
    icon: Tag,
    status: "done",
  },
  {
    type: "profit",
    label: "Calculated profit for 'Yoga Mat Strap'",
    meta: "Est. margin: 31% · Net: $4.20/unit",
    time: "3 days ago",
    icon: BarChart3,
    status: "done",
  },
];

const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
  blue:    { bg: "bg-blue-50",   text: "text-blue-700",   iconBg: "bg-blue-100" },
  emerald: { bg: "bg-emerald-50",text: "text-emerald-700",iconBg: "bg-emerald-100" },
  violet:  { bg: "bg-violet-50", text: "text-violet-700", iconBg: "bg-violet-100" },
  amber:   { bg: "bg-amber-50",  text: "text-amber-700",  iconBg: "bg-amber-100" },
};

const statusDot: Record<string, string> = {
  success:     "bg-emerald-400",
  "in-progress": "bg-amber-400",
  done:        "bg-gray-300",
};

/* ── Component ───────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto space-y-10">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 mb-1">
            Good morning, Alex 👋
          </h1>
          <p className="text-[14.5px] text-gray-500">
            Here's an overview of your Amazon FBA workspace.
          </p>
        </div>
        <Link
          href="/product-research"
          className="btn-primary shrink-0 hidden sm:inline-flex"
        >
          <Sparkles className="w-4 h-4" />
          New research
        </Link>
      </div>

      {/* ── Stat cards ── */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, delta, positive, icon: Icon, color }) => {
            const c = colorMap[color];
            return (
              <div key={label} className="card p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
                    {label}
                  </span>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", c.iconBg)}>
                    <Icon className={cn("w-4 h-4", c.text)} />
                  </div>
                </div>
                <p className="text-[28px] font-bold text-gray-900 leading-none mb-1.5">
                  {value}
                </p>
                <p
                  className={cn(
                    "text-[12px] font-medium",
                    positive === true ? "text-emerald-600" :
                    positive === false ? "text-red-500" : "text-gray-400"
                  )}
                >
                  {delta}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quick actions + Tip ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick actions */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-gray-800">Quick actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="card p-4 flex items-start gap-3 group hover:shadow-md hover:border-gray-300 transition-all duration-150"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-900 transition-colors duration-150">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-150" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-gray-800 group-hover:text-gray-900">
                    {label}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Tip card */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-gray-800">Student tip</h2>
          </div>
          <div className="card p-5 bg-gray-950 border-gray-800 h-[calc(100%-40px)]">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-4">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-2">
              Start with demand, not the product
            </h3>
            <p className="text-[12.5px] text-gray-400 leading-relaxed mb-4">
              Successful FBA sellers validate keyword demand before they ever source a product.
              Use the Product Research checklist to score your niche before moving forward.
            </p>
            <Link
              href="/product-research"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Go to Product Research <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recent activity ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-gray-800">Recent activity</h2>
          <button className="text-[12.5px] text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="card divide-y divide-gray-100">
          {recentActivity.map(({ label, meta, time, icon: Icon, status }, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 hover:bg-surface-1 transition-colors duration-100"
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-medium text-gray-800 truncate">{label}</p>
                <p className="text-[12px] text-gray-500 mt-0.5">{meta}</p>
              </div>

              {/* Time + status */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={cn("w-2 h-2 rounded-full shrink-0", statusDot[status])}
                />
                <span className="text-[11.5px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Progress banner ── */}
      <section>
        <div
          className="card px-6 py-5 flex items-center justify-between gap-6"
          style={{ background: "linear-gradient(to right, #f8f9fb, #f0f2f5)" }}
        >
          <div>
            <p className="text-[13px] font-semibold text-gray-700 mb-0.5">
              Complete your first product analysis
            </p>
            <p className="text-[12px] text-gray-500">
              You've finished 2 of 4 steps in the FBA checklist
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full" style={{ width: "50%" }} />
              </div>
              <span className="text-[12px] font-medium text-gray-700">50%</span>
            </div>
            <Link href="/product-research" className="btn-primary text-[12.5px] px-4 py-2">
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

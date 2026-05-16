// src/app/(auth)/signup/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Sparkles, Check } from "lucide-react";

const perks = [
  "Product Research checklist & scoring",
  "Keyword clustering & listing mapping",
  "AI-assisted listing builder",
  "Unit economics profit calculator",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase signUp
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="min-h-screen bg-surface-1 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-16 border-b border-surface bg-surface-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-gray-900">Neon</span>
        </Link>
        <span className="text-sm text-gray-500">
          Have an account?{" "}
          <Link href="/login" className="text-gray-900 font-medium underline underline-offset-2 hover:text-blue-700 transition-colors">
            Sign in
          </Link>
        </span>
      </nav>

      {/* Two-column layout */}
      <div className="flex-1 flex items-stretch">

        {/* Left: form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-[400px]">

            <div className="mb-7 text-center">
              <span className="badge mb-4">Built for students learning Amazon FBA</span>
              <h1 className="text-[28px] font-bold text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-[15px] text-gray-500">
                Free to start. No credit card required.
              </p>
            </div>

            <div className="card p-7 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Johnson"
                    required
                    className="input-base"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    required
                    className="input-base"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={update("password")}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      required
                      className="input-base pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength hint */}
                  {form.password.length > 0 && (
                    <div className="flex gap-1 mt-1.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-200"
                          style={{
                            background:
                              form.password.length >= 12 && i < 4 ? "#059669"
                              : form.password.length >= 8 && i < 3 ? "#d97706"
                              : form.password.length >= 5 && i < 2 ? "#ef4444"
                              : i === 0 ? "#ef4444"
                              : "#e4e7ed",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-2"
                  style={{ paddingTop: "11px", paddingBottom: "11px" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Creating account…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Get started free <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>

              <div className="divider-text my-5">or</div>

              <button
                type="button"
                className="btn-secondary w-full"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="mt-5 text-center text-[12.5px] text-gray-400">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-gray-600">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-gray-600">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Right: feature panel — hidden on small screens */}
        <div className="hidden lg:flex w-[380px] shrink-0 bg-gray-950 items-center justify-center px-10 py-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-6">
              Everything you need
            </p>
            <h2 className="text-[26px] font-bold text-white leading-tight mb-8">
              Your complete Amazon<br />FBA learning toolkit
            </h2>
            <ul className="space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </span>
                  <span className="text-[14px] text-gray-300 leading-snug">{perk}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-[13px] text-gray-500 italic">
                "Neon helped me validate my first product idea in a single afternoon."
              </p>
              <p className="mt-3 text-[12px] text-gray-600">— Student, FBA Bootcamp cohort 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

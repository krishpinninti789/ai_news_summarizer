"use client";

import { SignUp } from "@clerk/nextjs";
import { ArrowLeft, Check, Clock3, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function SignUpPage() {
  return (
    <main className="hero-glow flex min-h-[calc(100vh-145px)] items-center justify-center px-5 py-16 sm:px-8">
      <div className="grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1fr_auto]">
        <div className="max-w-lg">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--neon-blue)]">
            <ArrowLeft className="size-4" /> Back to homepage
          </Link>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Start with the signal</p>
          <h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-tight tracking-[-.05em]">Make news work for you.</h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-[var(--ink-muted)]">Create a calmer daily habit around the stories that deserve your attention.</p>
          <div className="neon-panel mt-9 max-w-md rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--neon-blue)]">Your reading rhythm</span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--ink-faint)]"><Clock3 className="size-3.5" /> 4 min</span>
            </div>
            <div className="space-y-3 py-4">
              {["Choose the categories you follow", "Get the context before the commentary", "Go deeper only when it matters"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                  <span className="font-mono text-xs text-[var(--neon-blue)]">0{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-faint)]">
              <span className="flex items-center gap-1.5"><Sparkles className="size-3.5 text-[var(--neon-blue)]" /> AI-assisted</span>
              <span className="flex items-center gap-1.5"><Layers3 className="size-3.5 text-[var(--neon-blue)]" /> Source-aware</span>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 text-sm text-[var(--ink-muted)]">
            <span className="flex size-5 items-center justify-center rounded-full bg-[var(--neon-blue)] text-[var(--ink)]"><Check className="size-3" /></span>
            Free to start. Built for a calmer feed.
          </div>
        </div>
        <div className="neon-panel rounded-2xl p-6 sm:p-8">
          <SignUp
            appearance={clerkAppearance}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/explore"
          />
        </div>
      </div>
    </main>
  );
}

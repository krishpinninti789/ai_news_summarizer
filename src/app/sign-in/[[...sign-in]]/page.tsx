"use client";

import { SignIn } from "@clerk/nextjs";
import { ArrowLeft, Check, Clock3, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function SignInPage() {
  return (
    <main className="hero-glow flex min-h-[calc(100vh-145px)] items-center justify-center px-5 py-16 sm:px-8">
      <div className="grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1fr_auto]">
        <div className="max-w-lg">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--neon-blue)]">
            <ArrowLeft className="size-4" /> Back to homepage
          </Link>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Your daily signal</p>
          <h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-tight tracking-[-.05em]">Start where the story gets clear.</h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-[var(--ink-muted)]">NewsGist gives you the context first, so you can decide what deserves your attention.</p>
          <div className="neon-panel mt-9 max-w-md rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--neon-blue)]">Today&apos;s brief</span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--ink-faint)]"><Clock3 className="size-3.5" /> 4 min</span>
            </div>
            <div className="space-y-3 py-4">
              {["The signal behind the headline", "What changed since yesterday", "The angle worth reading next"].map((item, index) => (
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
          <div className="mt-7 grid max-w-md grid-cols-3 gap-3 text-center">
            {["No doomscrolling", "One calm feed", "Your pace"].map((item) => <div key={item} className="border-l border-[var(--line)] px-2 text-xs leading-5 text-[var(--ink-faint)] first:border-l-0">{item}</div>)}
          </div>
        </div>
        <div className="neon-panel rounded-2xl p-6 sm:p-8">
          <SignIn
            appearance={clerkAppearance}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/explore"
          />
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, Check, Clock3, Film, Sparkles } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/BrandMark";

const categories = ["Technology", "Business", "Science", "Culture", "Sports", "World"];

const features = [
  { number: "01", eyebrow: "Clarity", title: "Signal, not noise", text: "A concise brief that keeps the context, the tension, and the details worth knowing.", visual: "line" },
  { number: "02", eyebrow: "Focus", title: "Your time is yours", text: "Move from headline to informed in under two minutes. No clickbait rabbit holes.", visual: "bars" },
  { number: "03", eyebrow: "Perspective", title: "Many angles, one view", text: "See stories across categories and trusted sources without opening twenty tabs.", visual: "orbit" },
];

export default function LandingPage() {
  return (
    <main className="hero-glow overflow-hidden">
      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pb-32 lg:pt-24">
        <div className="dot-grid pointer-events-none absolute -left-24 -top-16 h-[34rem] w-[min(78vw,42rem)] opacity-90 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_76%)]" />
        <div className="dot-grid pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full opacity-65 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--neon-blue)]/15 blur-3xl" />
        <div className="relative z-10">
          <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.16em] text-[var(--ink-muted)]">
            <Sparkles className="size-3.5 text-[var(--neon-blue)]" /> The daily signal
          </div>
          <h1 className="reveal reveal-delay-1 max-w-3xl font-display text-6xl font-semibold leading-[.96] tracking-[-.065em] sm:text-7xl lg:text-[6.7rem]">
            Read less.<br /><span className="relative inline-block">Know more.<i className="absolute -bottom-1 left-1 h-2 w-[92%] -rotate-1 bg-[var(--neon-blue)]" /></span>
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-8 text-[var(--ink-muted)] sm:text-xl">
            NewsGist turns the day&apos;s biggest stories into clear, useful briefs. Less scrolling. More understanding.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
            <SignedOut><Link href="/sign-up"><Button size="lg" className="neon-button h-12 rounded-full px-6">Build your daily brief <ArrowRight className="size-4" /></Button></Link></SignedOut>
            <SignedIn><Link href="/explore"><Button size="lg" className="neon-button h-12 rounded-full px-6">Open your feed <ArrowRight className="size-4" /></Button></Link></SignedIn>
            <Link href="#how-it-works"><Button variant="outline" size="lg" className="h-12 rounded-full border-[var(--line)] bg-[var(--surface)] px-6">See how it works</Button></Link>
          </div>
          <div className="reveal reveal-delay-3 mt-10 flex items-center gap-3 text-sm text-[var(--ink-muted)]">
            <span className="flex items-center gap-1.5" aria-label="Familiar tools">
              <span className="flex size-7 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--neon-blue)] shadow-[0_0_12px_rgba(26,115,232,.14)]" title="Film and storytelling">
                <Film className="size-4" aria-hidden="true" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-[0_0_12px_rgba(26,115,232,.14)]" title="Google">
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z" />
                  <path fill="#34A853" d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.71-5.47-4.01H3.28v2.53A9.74 9.74 0 0 0 12 21.6Z" />
                  <path fill="#FBBC05" d="M6.53 13.7A5.86 5.86 0 0 1 6.22 12c0-.59.11-1.17.31-1.7V7.77H3.28A9.6 9.6 0 0 0 2.25 12c0 1.53.37 2.98 1.03 4.23l3.25-2.53Z" />
                  <path fill="#EA4335" d="M12 6.29c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.39 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.72 5.37l3.25 2.53c.77-2.3 2.93-4.01 5.47-4.01Z" />
                </svg>
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-[0_0_12px_rgba(26,115,232,.14)]" title="GitHub">
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.58 22.02c.57.1.78-.25.78-.55v-2.15c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.14.08 1.74 1.17 1.74 1.17 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.64 0-1.25.45-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .95-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.17-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.17 1.82 1.17 3.07 0 4.38-2.66 5.35-5.2 5.63.41.35.77 1.04.77 2.1v3.1c0 .3.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" /></svg>
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-[var(--neon-blue)]/45 bg-[var(--neon-blue)]/10 text-[10px] font-bold text-[var(--neon-blue)] shadow-[0_0_12px_rgba(26,115,232,.2)]">NG</span>
            </span>
            <span><strong className="text-[var(--ink)]">10k+</strong> stories made simpler</span>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-[460px] lg:mt-3">
          <div className="lotus-halo pointer-events-none" aria-hidden="true" />
          <div className="dot-grid absolute -right-12 -top-10 h-52 w-52 rounded-full opacity-45 [mask-image:radial-gradient(circle,black,transparent_68%)]" />
          <div className="relative rotate-2 rounded-[2rem] border border-[var(--ink)] bg-[var(--ink)] p-3 shadow-[18px_22px_0_var(--neon-blue)]">
            <div className="rounded-[1.45rem] bg-[var(--paper)] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                <BrandMark compact />
                <span className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--ink-faint)]">Thursday · 08:42</span>
              </div>
              <div className="py-8">
                <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--neon-blue)]">The morning brief</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">What matters today, in 90 seconds.</h2>
                <div className="mt-6 space-y-3">
                  {["AI is changing the way teams build.", "Markets find their footing after a volatile week.", "The science behind better urban air."].map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
                      <span className="font-mono text-xs text-[var(--ink-faint)]">0{index + 1}</span>
                      <p className="text-sm font-medium leading-5">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--line)] pt-5 text-xs text-[var(--ink-muted)]"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" /> 4 min read</span><span className="rounded-full bg-[var(--neon-blue)] px-2.5 py-1 font-semibold text-[var(--ink)]">AI brief</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-newsgist" className="dot-grid relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]/55">
        <div className="pointer-events-none absolute -right-24 top-1/2 size-96 -translate-y-1/2 rounded-full border border-[var(--neon-blue)]/25 shadow-[0_0_0_22px_rgba(26,115,232,.05),0_0_0_46px_rgba(26,115,232,.03)]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-12 max-w-2xl"><p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Why NewsGist</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A better relationship with the news.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map(({ number, eyebrow, title, text, visual }) => (
              <article key={number} className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--neon-blue)]/60 hover:shadow-[0_0_28px_rgba(26,115,232,.14)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                  <span className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">{eyebrow}</span>
                  <span className="font-mono text-xs text-[var(--ink-faint)]">{number}</span>
                </div>
                <div className="feature-visual mt-7" data-visual={visual} aria-hidden="true">
                  {visual === "line" && <><span /><span /><span /></>}
                  {visual === "bars" && <><span /><span /><span /><span /></>}
                  {visual === "orbit" && <><i /><i /><i /></>}
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-.035em]">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--ink-muted)]">{text}</p>
                <div className="mt-7 h-px w-10 bg-[var(--neon-blue)] transition-all duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="split-pattern relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute -left-28 top-20 size-72 rounded-full border border-[var(--neon-blue)]/20 shadow-[0_0_0_18px_rgba(26,115,232,.04),0_0_0_40px_rgba(26,115,232,.025)]" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="lg:pr-8"><p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Your edge</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Stay curious.<br />Stay in control.</h2><p className="mt-5 max-w-md leading-7 text-[var(--ink-muted)]">Follow the categories you care about, then let our AI do the first pass. You decide what deserves a deeper read.</p></div>
          <div className="topic-network">
            <svg className="topic-network__thread" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <path id="topic-route" d="M18 18 C42 5 58 5 82 18 C65 30 35 30 18 50 C35 70 65 70 82 82 C58 95 42 95 18 82 C35 65 65 35 82 18" />
              </defs>
              <ellipse className="topic-globe__outline" cx="50" cy="50" rx="45" ry="47" />
              <ellipse className="topic-globe__latitude" cx="50" cy="50" rx="42" ry="17" />
              <ellipse className="topic-globe__latitude topic-globe__latitude--lower" cx="50" cy="50" rx="42" ry="17" />
              <ellipse className="topic-globe__longitude" cx="50" cy="50" rx="16" ry="47" />
              <ellipse className="topic-globe__longitude topic-globe__longitude--wide" cx="50" cy="50" rx="30" ry="47" />
              <path className="topic-route" d="M18 18 C42 5 58 5 82 18 C65 30 35 30 18 50 C35 70 65 70 82 82 C58 95 42 95 18 82 C35 65 65 35 82 18" />
              <circle className="topic-signal" r="2.2">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#topic-route" />
                </animateMotion>
              </circle>
            </svg>
            <div className="topic-network__nodes">
              {categories.map((category) => (
                <div key={category} className="topic-node">
                  <span className="font-display text-xl">{category}</span>
                  <span className="topic-node__check"><Check className="size-3.5" /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="cta-panel mx-5 mb-20 rounded-[2rem] px-6 py-16 text-center sm:mx-8 lg:mx-auto lg:max-w-7xl">
        <div className="relative z-10">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-[var(--neon-blue)]/40 bg-[var(--neon-blue)]/10 text-[var(--neon-blue)] shadow-[0_0_28px_rgba(26,115,232,.2)]">
            <ArrowRight className="size-5 -rotate-45" />
          </div>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Make room for what matters</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.05em] text-[var(--ink)] sm:text-5xl">The world moves fast. Your news can feel simple.</h2>
          <p className="mx-auto mt-5 max-w-lg text-[var(--ink-muted)]">Start with the stories you care about and let NewsGist clear the rest of the noise.</p>
          <Link href="/sign-up" className="neon-button mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all">Get started free <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}

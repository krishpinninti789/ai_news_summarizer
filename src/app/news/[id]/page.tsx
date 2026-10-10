"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Newspaper,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsSummary from "@/components/NewsSummary";

// Assumes your existing Article type is globally available.
// Otherwise, import Article from your types file.

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articleId = params.id as string;
  const category = searchParams.get("category") || "general";

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      setArticle(null);

      try {
        const articleIndex = Number.parseInt(articleId, 10);

        if (!Number.isInteger(articleIndex) || articleIndex < 0) {
          setError("Invalid article ID");
          return;
        }

        const response = await fetch(
          `/api/news?category=${encodeURIComponent(category)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();

        const validArticles = (data.articles ?? []).filter(
          (item: Article) =>
            item.title && item.description && item.title !== "[Removed]",
        );

        if (validArticles.length === 0) {
          setError("No articles found for this category");
          return;
        }

        const selectedArticle = validArticles[articleIndex];

        if (selectedArticle) {
          setArticle(selectedArticle);
        } else {
          setError("Article not found in this category");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => controller.abort();
  }, [articleId, category]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBackClick = () => {
    if (category !== "general") {
      router.push(`/explore?category=${encodeURIComponent(category)}`);
    } else {
      router.push("/explore");
    }
  };

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  const isValidArticleUrl = (() => {
    if (!article?.url) return false;

    try {
      return new URL(article.url).protocol === "https:";
    } catch {
      return false;
    }
  })();

  const loadingScreen = (
    <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] px-4">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/10">
          <Newspaper className="h-8 w-8 animate-pulse text-[var(--neon-blue)]" />
        </div>

        <h2 className="text-lg font-semibold text-[var(--ink)]">
          Preparing your story
        </h2>

        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Fetching the latest details...
        </p>

        <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-[var(--ink)]/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--neon-blue)]" />
        </div>
      </div>
    </div>
  );

  const errorScreen = (
    <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[var(--ink)]/10 bg-[var(--surface-raised)] p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--neon-blue)]/10">
          <Newspaper className="h-8 w-8 text-[var(--neon-blue)]" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
          {error || "Article not found"}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
          The article you&apos;re looking for might have been moved or is no
          longer available.
        </p>

        <Button onClick={handleBackClick} className="mt-7 rounded-xl px-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back to News
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        {loading ? (
          loadingScreen
        ) : error || !article ? (
          errorScreen
        ) : (
          <div className="relative min-h-screen overflow-hidden bg-[var(--paper)]">
            {/* Ambient background effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[var(--neon-blue)]/5 blur-[120px]" />
              <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px]" />
            </div>

            <main className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              {/* Back navigation */}
              <div className="mb-8 sm:mb-10">
                <Button
                  variant="ghost"
                  onClick={handleBackClick}
                  className="group -ml-3 gap-2 rounded-full px-4 text-[var(--ink-muted)] transition-all duration-300 hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>
                    Back to{" "}
                    {category === "general" ? "News" : `${categoryLabel} News`}
                  </span>
                </Button>
              </div>

              {/* Article card */}
              <article className="neon-panel overflow-hidden rounded-2xl border border-[var(--ink)]/10 bg-[var(--surface-raised)] shadow-xl shadow-black/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[var(--neon-blue)]/5 sm:rounded-3xl">
                {/* Hero image */}
                {article.urlToImage && (
                  <div className="group relative h-64 overflow-hidden bg-[var(--surface-raised)] sm:h-80 md:h-[440px]">
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-blue)]" />
                        {category === "general"
                          ? "Latest News"
                          : `${categoryLabel} News`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Article body */}
                <div className="p-5 sm:p-8 md:p-12">
                  {/* Article metadata */}
                  <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mb-8">
                    <Badge className="rounded-full border border-[var(--neon-blue)]/30 bg-[var(--neon-blue)]/10 px-3 py-1.5 font-medium text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/15">
                      <Newspaper className="mr-1.5 h-3.5 w-3.5" />
                      {article.source?.name || "News Source"}
                    </Badge>

                    <div className="flex items-center gap-2 text-[var(--ink-muted)]">
                      <Clock className="h-4 w-4 shrink-0 opacity-70" />
                      <span className="text-xs leading-relaxed sm:text-sm">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <Badge
                      variant="outline"
                      className="rounded-full border-[var(--ink)]/15 px-3 py-1.5 text-[var(--ink-muted)]"
                    >
                      {categoryLabel}
                    </Badge>
                  </div>

                  {/* Headline */}
                  <h1 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                    {article.title}
                  </h1>

                  {/* Accent divider */}
                  <div className="mb-7 flex items-center gap-3">
                    <div className="h-1 w-12 rounded-full bg-[var(--neon-blue)]" />
                    <div className="h-px flex-1 bg-[var(--ink)]/10" />
                  </div>

                  {/* Description */}
                  <p className="mb-9 text-lg leading-8 text-[var(--ink-muted)] sm:text-xl sm:leading-9">
                    {article.description}
                  </p>

                  {/* Article content */}
                  {article.content && (
                    <div className="mb-10 border-l-2 border-[var(--neon-blue)]/30 pl-5 sm:pl-7">
                      <p className="whitespace-pre-line text-base leading-8 text-[var(--ink-muted)] sm:text-lg sm:leading-9">
                        {article.content.replace(
                          /\s*\[\+\d+ chars\]\s*$/,
                          "...",
                        )}
                      </p>
                    </div>
                  )}

                  {/* Original article link */}
                  <div className="mb-10 border-y border-[var(--ink)]/10 py-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="mb-1 text-base font-semibold text-[var(--ink)]">
                          Want the full story?
                        </h2>

                        <p className="text-sm leading-6 text-[var(--ink-muted)]">
                          Continue reading from the original news source.
                        </p>
                      </div>

                      {isValidArticleUrl && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neon-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--neon-blue)]/15 active:translate-y-0"
                        >
                          Read Full Article
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* AI summary */}
                  <section className="rounded-2xl border border-[var(--neon-blue)]/15 bg-[var(--neon-blue)]/[0.035] p-4 sm:p-6 md:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/10">
                        <Sparkles className="h-5 w-5 text-[var(--neon-blue)]" />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-[var(--ink)]">
                          AI-Powered Summary
                        </h2>

                        <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
                          Get the key takeaways in less time.
                        </p>
                      </div>
                    </div>

                    <NewsSummary
                      title={article.title}
                      content={article.content || article.description}
                    />
                  </section>
                </div>
              </article>

              {/* Footer */}
              <p className="mt-8 text-center text-xs leading-6 text-[var(--ink-muted)] opacity-70">
                Stay informed. Read beyond the headlines.
              </p>
            </main>
          </div>
        )}
      </SignedIn>
    </>
  );
}

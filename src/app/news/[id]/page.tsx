"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Clock, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import NewsSummary from "@/components/NewsSummary";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleIndex = Number.parseInt(params.id as string);
        const category = searchParams.get("category") || "general";

        // Fetch articles from the specific category
        const response = await fetch(`/api/news?category=${category}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          // Filter out invalid articles
          const validArticles = data.articles.filter(
            (article: Article) =>
              article.title &&
              article.description &&
              article.title !== "[Removed]"
          );

          if (validArticles[articleIndex]) {
            setArticle(validArticles[articleIndex]);
          } else {
            setError("Article not found in this category");
          }
        } else {
          setError("No articles found for this category");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id, searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBackClick = () => {
    const category = searchParams.get("category");
    if (category && category !== "general") {
      router.push(`/explore?category=${category}`);
    } else {
      router.push("/explore");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
        <div className="text-center">
          <Newspaper className="mx-auto mb-4 h-8 w-8 animate-pulse text-[var(--neon-blue)]" />
          <p className="text-[var(--ink-muted)]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-[var(--ink)]">
            {error || "Article not found"}
          </h2>
          <p className="mb-4 text-[var(--ink-muted)]">
            The article you're looking for might have been moved or is no longer
            available.
          </p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to News
          </Button>
        </div>
      </div>
    );
  }

  const currentCategory = searchParams.get("category") || "general";

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-[var(--paper)]">

          {/* Article Content */}
          <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
            <Button variant="ghost" onClick={handleBackClick} className="mb-6 text-[var(--ink-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to {currentCategory === "general" ? "News" : `${currentCategory} News`}
            </Button>
            <article className="neon-panel overflow-hidden rounded-2xl">
              {/* Article Image */}
              {article.urlToImage && (
                <div className="relative h-64 md:h-96">
                  <img
                    src={article.urlToImage || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              )}

              <div className="p-6 md:p-10">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="border-[var(--neon-blue)]/40 bg-[var(--neon-blue)]/10 text-[var(--neon-blue)]">
                    {article.source.name}
                  </Badge>
                  <div className="flex items-center gap-2 text-[var(--ink-faint)]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {currentCategory.charAt(0).toUpperCase() +
                      currentCategory.slice(1)}{" "}
                    News
                  </Badge>
                </div>

                {/* Article Title */}
                <h1 className="mb-6 font-display text-3xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
                  {article.title}
                </h1>

                {/* Article Description */}
                <p className="mb-8 text-xl leading-relaxed text-[var(--ink-muted)]">
                  {article.description}
                </p>

                {/* Article Content */}
                {article.content && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="leading-relaxed text-[var(--ink-muted)]">
                      {article.content.replace(/\[\+\d+ chars\]$/, "...")}
                    </p>
                  </div>
                )}

                {/* External Link */}
                <div className="mb-8">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Full Article
                  </a>
                </div>

                {/* AI Summary Section */}

                <NewsSummary
                  title={article.title}
                  content={article.content || article.description}
                />
              </div>
            </article>
          </main>
        </div>
      </SignedIn>
    </>
  );
}

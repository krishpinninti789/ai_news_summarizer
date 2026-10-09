"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2, Newspaper } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Initialize category from URL params (for back navigation) or default to "general"
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("category") || "general";
  });

  const fetchNews = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?category=${category}`);
      const data = await response.json();

      if (data.articles) {
        setArticles(
          data.articles.filter(
            (article: Article) =>
              article.title &&
              article.description &&
              article.title !== "[Removed]"
          )
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category change - NO URL updates, just state change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Don't update URL - keep it smooth and client-side only
  };

  // Only sync with URL on initial load (for back navigation from articles)
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []); // Empty dependency array - only run on mount

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-[var(--paper)]">
          <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="mb-6 transition-all duration-300">
              <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">Your daily signal</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em] text-[var(--ink)] capitalize">
                {selectedCategory === "general"
                  ? "Latest News"
                  : `${selectedCategory} News`}
              </h2>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="mx-auto mb-4 size-8 animate-spin text-[var(--neon-blue)]" />
                  <p className="text-[var(--ink-muted)]">
                    Loading {selectedCategory} news...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* News Grid with smooth transition */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                  {articles.map((article, index) => (
                    <div
                      key={`${selectedCategory}-${index}-${article.title.slice(
                        0,
                        20
                      )}`}
                      className="animate-in fade-in-0 duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <NewsCard
                        article={article}
                        index={index}
                        category={selectedCategory}
                      />
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {articles.length === 0 && (
                  <div className="text-center py-20 animate-in fade-in-0 duration-500">
                    <Newspaper className="mx-auto mb-4 h-16 w-16 text-[var(--ink-faint)]" />
                    <h3 className="mb-2 text-xl font-semibold text-[var(--ink-muted)]">
                      No articles found
                    </h3>
                    <p className="text-[var(--ink-faint)]">
                      No articles available in the {selectedCategory} category
                      right now
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </SignedIn>
    </>
  );
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--paper)]" />}>
      <HomePage />
    </Suspense>
  );
}

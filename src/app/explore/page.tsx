"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Search, Newspaper, X } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import NewsCard from "@/components/NewsCard";
import NewsCardShimmer from "@/components/NewsCardShimmer";
import CategoryFilter from "@/components/CategoryFilter";
import NewsSearchFilters from "@/components/NewsSearchFilters";

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevancy");
  const [searchIn, setSearchIn] = useState("title,description,content");
  const [recency, setRecency] = useState("all");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const searchParams = useSearchParams();

  // Initialize category from URL params (for back navigation) or default to "general"
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("category") || "general";
  });

  const fetchNews = async (
    category: string,
    searchQuery = "",
    currentPage = page,
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ category });
      if (searchQuery) {
        params.set("q", searchQuery);
        params.set("sortBy", sortBy);
        params.set("searchIn", searchIn);
        params.set("page", String(currentPage));
        if (recency !== "all") {
          const from = new Date();
          from.setDate(from.getDate() - Number(recency));
          params.set("from", from.toISOString());
        }
      }
      const response = await fetch(`/api/news?${params.toString()}`);
      const data = await response.json();

      if (data.articles) {
        setTotalResults(data.totalResults || 0);
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
    setActiveQuery("");
    setQuery("");
    setPage(1);
    setTotalResults(0);
    // Don't update URL - keep it smooth and client-side only
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setActiveQuery(nextQuery);
    setPage(1);
  };

  const clearSearch = () => {
    setQuery("");
    setActiveQuery("");
    setPage(1);
    setTotalResults(0);
  };

  const handleSearchFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  // Only sync with URL on initial load (for back navigation from articles)
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []); // Empty dependency array - only run on mount

  useEffect(() => {
    fetchNews(selectedCategory, activeQuery, page);
  }, [selectedCategory, activeQuery, sortBy, searchIn, recency, page]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="explore-page min-h-screen bg-[var(--paper)]">
          <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="mb-6 transition-all duration-300">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--neon-blue)]">
                    {activeQuery ? "Search results" : "Your daily signal"}
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em] text-[var(--ink)] capitalize">
                    {activeQuery ? `Results for “${activeQuery}”` : selectedCategory === "general" ? "Latest News" : `${selectedCategory} News`}
                  </h2>
                </div>
              </div>
            </div>
            <form className="mb-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-[0_12px_32px_rgba(0,0,0,.18)]" onSubmit={handleSearch}>
              <Search className="ml-3 size-4 text-[var(--ink-faint)]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stories, topics, or people"
                aria-label="Search stories"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
              />
              {query && (
                <button type="button" onClick={clearSearch} aria-label="Clear search" className="cursor-pointer rounded-lg p-2 text-[var(--ink-faint)] hover:text-[var(--ink)]">
                  <X className="size-4" />
                </button>
              )}
              <button type="submit" className="neon-button cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold">Search</button>
            </form>
            {activeQuery && (
              <NewsSearchFilters
                sortBy={sortBy}
                searchIn={searchIn}
                recency={recency}
                onSortChange={handleSearchFilterChange(setSortBy)}
                onSearchInChange={handleSearchFilterChange(setSearchIn)}
                onRecencyChange={handleSearchFilterChange(setRecency)}
              />
            )}

            {/* Loading State */}
            {loading ? (
              <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                aria-label={`Loading ${selectedCategory} news`}
                aria-busy="true"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <NewsCardShimmer key={`${selectedCategory}-shimmer-${index}`} />
                ))}
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
                      className="h-full animate-in fade-in-0 duration-300"
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
                {activeQuery && totalResults > 20 && (
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                      className="cursor-pointer rounded-xl border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink-muted)] transition-colors hover:border-[var(--neon-blue)] hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="font-mono text-xs text-[var(--ink-faint)]">
                      Page {page} of {Math.ceil(totalResults / 20)}
                    </span>
                    <button
                      type="button"
                      disabled={page >= Math.ceil(totalResults / 20)}
                      onClick={() => setPage((currentPage) => currentPage + 1)}
                      className="neon-button cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}

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

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2, Newspaper, Sparkles } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import NewsCard from "@/components/NewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
  content: string;
}

export default function HomePage() {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Header with User Profile */}

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Category Title with smooth transition */}
            <div className="mb-6 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedCategory === "general"
                  ? "Latest News"
                  : `${selectedCategory} News`}
              </h2>
              {/* <p className="text-gray-600">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading {selectedCategory} articles...
                  </span>
                ) : (
                  <>
                    {articles.length} articles found in{" "}
                    {selectedCategory === "general"
                      ? "general"
                      : selectedCategory}{" "}
                    category
                  </>
                )}
              </p> */}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">
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
                    <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-500">
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
}

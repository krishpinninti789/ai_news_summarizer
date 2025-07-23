"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Clock, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import UserProfile from "@/components/UserProfile";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="w-8 h-8 animate-pulse mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Article not found"}
          </h2>
          <p className="text-gray-600 mb-4">
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={handleBackClick}
                    className="hover:bg-blue-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to{" "}
                    {currentCategory === "general"
                      ? "News"
                      : `${
                          currentCategory.charAt(0).toUpperCase() +
                          currentCategory.slice(1)
                        } News`}
                  </Button>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {currentCategory.charAt(0).toUpperCase() +
                      currentCategory.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
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

              <div className="p-6 md:p-8 lg:mt-18">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {article.source.name}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700">
                    {currentCategory.charAt(0).toUpperCase() +
                      currentCategory.slice(1)}{" "}
                    News
                  </Badge>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Article Description */}
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {article.description}
                </p>

                {/* Article Content */}
                {article.content && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-800 leading-relaxed">
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
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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

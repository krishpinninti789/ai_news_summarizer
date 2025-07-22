"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Clock, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import NewsSummary from "@/components/NewsSummary";
import UserProfile from "@/components/UserProfile";
import { formatDate } from "@/lib/utils";

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        if (
          data.articles &&
          data.articles[Number.parseInt(params.id as string)]
        ) {
          setArticle(data.articles[Number.parseInt(params.id as string)]);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

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

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Article not found
          </h2>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to News
                </Button>
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
                    className="object-fill"
                    crossOrigin="anonymous"
                  />
                </div>
              )}

              <div className="p-6 mt-2 md:mt-10 lg:mt-18 md:p-8">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 mt-1 md:mt-1">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {article.source.name}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
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
};

export default NewsDetailPage;

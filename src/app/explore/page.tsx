"use client"

import { useState, useEffect } from "react"

import { Loader2, Newspaper, Sparkles } from "lucide-react"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { CategoryFilter } from "@/components/CategoryFilter"
import { UserProfile } from "@/components/UserProfile"
import NewsCard from "@/components/NewsCard"


interface Article {
  title: string
  description: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
  url: string
  content: string
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("general")

  const fetchNews = async (category: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/news?category=${category}`)
      const data = await response.json()

      if (data.articles) {
        setArticles(
          data.articles.filter(
            (article: Article) => article.title && article.description && article.title !== "[Removed]",
          ),
        )
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(selectedCategory)
  }, [selectedCategory])

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          
          

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Filter */}
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Loading latest news...</p>
                </div>
              </div>
            ) : (
              <>
                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
                </div>

                {/* Empty State */}
                {articles.length === 0 && (
                  <div className="text-center py-20">
                    <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                    <p className="text-gray-500">Try selecting a different category</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </SignedIn>
    </>
  )
}

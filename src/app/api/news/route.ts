import { type NextRequest, NextResponse } from "next/server"

const NEWS_API_KEY = process.env.NEWS_API_KEY
const NEWS_API_URL = "https://newsapi.org/v2"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "general"
  const country = searchParams.get("country") || "us"

  if (!NEWS_API_KEY) {
    return NextResponse.json({ error: "News API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&pageSize=20`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch news")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

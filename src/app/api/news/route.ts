import { NEWS_API_URL } from "@/constants";
import { type NextRequest, NextResponse } from "next/server";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  const country = searchParams.get("country") || "us";
  const query = searchParams.get("q")?.trim() || "";
  const sortBy = searchParams.get("sortBy") || "relevancy";
  const searchIn = searchParams.get("searchIn") || "title,description,content";
  const from = searchParams.get("from") || "";
  const page = searchParams.get("page") || "1";

  if (!NEWS_API_KEY) {
    return NextResponse.json(
      { error: "News API key not configured" },
      { status: 500 }
    );
  }

  try {
    const endpoint = query ? "everything" : "top-headlines";
    const params = new URLSearchParams({
      apiKey: NEWS_API_KEY,
      pageSize: "20",
      language: "en",
    });

    if (query) {
      params.set("q", query.slice(0, 500));
      params.set("searchIn", searchIn);
      params.set("sortBy", sortBy);
      params.set("page", page);
      if (from) params.set("from", from);
    } else {
      params.set("country", country);
      params.set("category", category);
    }

    const response = await fetch(`${NEWS_API_URL}/${endpoint}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

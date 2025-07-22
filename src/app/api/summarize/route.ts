import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json()

    if (!content || !title) {
      return NextResponse.json({ error: "Content and title are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a professional news summarizer. Create concise, informative bullet points that capture the key information from news articles.",
      prompt: `Summarize the following news article in 3-5 bullet points. Focus on the most important facts and developments.

Title: ${title}

Content: ${content}

Format your response as bullet points using • symbol.`,
    })

    return NextResponse.json({ summary: text })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}

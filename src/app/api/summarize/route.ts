import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { perplexity } from "@ai-sdk/perplexity";

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content || !title) {
      return NextResponse.json(
        { error: "Content and title are required" },
        { status: 400 }
      );
    }

    const { text, sources, providerMetadata } = await generateText({
      model: perplexity("sonar-pro"),
      system: `You are a professional news summarizer with expertise in journalism and current events. 
      Create concise, informative bullet points that capture the key information from news articles. 
      Focus on the most important facts, developments, and implications. 
      Ensure accuracy and provide context where necessary.`,
      prompt: `Analyze and summarize the following news article in 4-6 clear, informative bullet points. 
      Focus on the key facts, main developments, and important implications.

Title: ${title}

Content: ${content}

Requirements:
- Use bullet points with • symbol
- Each point should be concise but informative
- Include key facts, figures, and developments
- Highlight the main implications or significance
- Maintain journalistic objectivity
- If there are quotes, include the most impactful ones`,
    });

    // Extract usage information from Perplexity metadata
    const usage = providerMetadata?.perplexity?.usage;
    const citationTokens =
      usage && typeof usage === "object" && "citationTokens" in usage
        ? (usage as any).citationTokens
        : 0;
    const numSearchQueries =
      usage && typeof usage === "object" && "numSearchQueries" in usage
        ? (usage as any).numSearchQueries
        : 0;

    return NextResponse.json({
      summary: text,
      sources: sources || [],
      metadata: {
        citationTokens,
        numSearchQueries,
        provider: "Perplexity Sonar Pro",
      },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}

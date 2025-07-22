"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, ExternalLink, Search, Zap } from "lucide-react";

export function NewsSummary({ title, content }: NewsSummaryProps) {
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data: SummaryResponse = await response.json();
      setSummaryData(data);
      setHasGenerated(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Summary
          <Badge
            variant="outline"
            className="ml-auto bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700"
          >
            <Zap className="w-3 h-3 mr-1" />
            Perplexity AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasGenerated ? (
          <div className="text-center py-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 mb-4">
              <Search className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Powered by Perplexity AI
              </h3>
              <p className="text-gray-600 text-sm">
                Get an AI-powered summary with real-time web search and
                citations from trusted sources
              </p>
            </div>
            <Button
              onClick={generateSummary}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Summary
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <>
                {/* Summary Content */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {summaryData?.summary}
                  </div>
                </div>

                {/* Metadata */}
                {summaryData?.metadata && (
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <Badge variant="outline" className="bg-white">
                      <Search className="w-3 h-3 mr-1" />
                      {summaryData.metadata.numSearchQueries} searches
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Zap className="w-3 h-3 mr-1" />
                      {summaryData.metadata.citationTokens} citation tokens
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      {summaryData.metadata.provider}
                    </Badge>
                  </div>
                )}

                {/* Sources */}
                {summaryData?.sources && summaryData.sources.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Sources & Citations
                    </h4>
                    <div className="space-y-2">
                      {summaryData.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 truncate">
                              {source.title || "Source"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {source.url}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regenerate Button */}
                <Button
                  onClick={generateSummary}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="w-full bg-transparent border-purple-200 hover:bg-purple-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Regenerate Summary
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

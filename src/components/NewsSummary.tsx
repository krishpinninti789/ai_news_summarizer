"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, ExternalLink, Search, Zap } from "lucide-react";

const NewsSummary = ({ title, content }: NewsSummaryProps) => {
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
          <Sparkles className="w-5 h-5 text-[var(--neon-blue)]" />
          AI Summary
          <Badge
            variant="outline"
            className="ml-auto border-[var(--neon-blue)]/30 bg-[var(--neon-blue)]/10 text-[var(--neon-blue)]"
          >
            <Zap className="w-3 h-3 mr-1" />
            Powered with AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasGenerated ? (
          <div className="text-center py-6">
            <div className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] p-6">
              <Search className="mx-auto mb-3 h-12 w-12 text-[var(--neon-blue)]" />
              <h3 className="mb-2 font-semibold text-[var(--ink)]">
                Powered with AI
              </h3>
              <p className="text-sm text-[var(--ink-muted)]">
                Get an AI-powered summary with real-time web search and
                citations from trusted sources
              </p>
            </div>
            <Button
              onClick={generateSummary}
              disabled={isLoading}
              className="neon-button"
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
                  <div className="rounded-xl border border-[var(--neon-blue)]/25 bg-[var(--surface-raised)] p-6 shadow-[0_0_28px_rgba(0,188,255,.06)]">
                    <div className="whitespace-pre-line leading-relaxed text-[var(--ink)]">
                    {summaryData?.summary}
                  </div>
                </div>

                {/* Metadata */}
                {summaryData?.metadata && (
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--ink-faint)]">
                    <Badge variant="outline">
                      <Search className="w-3 h-3 mr-1" />
                      {summaryData.metadata.numSearchQueries} searches
                    </Badge>
                    <Badge variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      {summaryData.metadata.citationTokens} citation tokens
                    </Badge>
                    <Badge variant="outline">
                      {summaryData.metadata.provider}
                    </Badge>
                  </div>
                )}

                {/* Sources */}
                {summaryData?.sources && summaryData.sources.length > 0 && (
                  <div className="border-t border-[var(--line)] pt-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--ink)]">
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
                          className="group flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3 transition-colors hover:border-[var(--neon-blue)]/50 hover:bg-[var(--surface-raised)]"
                        >
                          <ExternalLink className="w-4 h-4 text-[var(--ink-faint)] group-hover:text-[var(--neon-blue)]" />
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-[var(--ink)] group-hover:text-[var(--neon-blue)]">
                              {source.title || "Source"}
                            </p>
                            <p className="truncate text-xs text-[var(--ink-faint)]">
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
                  className="w-full border-[var(--line)] bg-transparent hover:bg-[var(--surface-raised)]"
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
};

export default NewsSummary;

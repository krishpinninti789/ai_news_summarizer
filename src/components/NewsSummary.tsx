"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

interface NewsSummaryProps {
  title: string
  content: string
}

const NewsSummary = ({ title, content }: NewsSummaryProps)=> {
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateSummary = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data.summary)
      setHasGenerated(true)
    } catch (error) {
      console.error("Error generating summary:", error)
      setSummary("Failed to generate summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasGenerated ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">Get an AI-powered summary of this article in key bullet points</p>
            <Button
              onClick={generateSummary}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Summary...
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
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">{summary}</div>
            </div>
            <Button
              onClick={generateSummary}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="w-full bg-transparent"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Regenerating...
                </>
              ) : (
                "Regenerate Summary"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NewsSummary;

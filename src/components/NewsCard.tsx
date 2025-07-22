import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"



const NewsCard = ({ article, index }: NewsCardProps)=> {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {article.urlToImage ? (
          <img
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-gray-400 text-lg font-medium">No Image</div>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white">{article.source.name}</Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Clock className="w-4 h-4" />
          {formatDate(article.publishedAt)}
        </div>
        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 line-clamp-3 mb-4">{article.description}</p>

        <div className="flex gap-2">
          <Link
            href={`/news/${index}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
          >
            Read More & Summarize
          </Link>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard;

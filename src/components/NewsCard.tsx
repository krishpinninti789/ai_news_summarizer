import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

const NewsCard = ({ article, index, category }: NewsCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden rounded-2xl border-[var(--line)] bg-[var(--surface)] shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(26,115,232,.18)]">
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
          <div className="dot-grid flex h-48 w-full items-center justify-center bg-[var(--paper)]">
            <div className="font-display text-lg font-medium text-[var(--ink-muted)]">No image</div>
          </div>
        )}
        <Badge className="absolute left-3 top-3 bg-[var(--surface)]/90 text-[var(--ink)] hover:bg-[var(--surface-raised)]">
          {article.source.name}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center gap-2 text-sm text-[var(--ink-faint)]">
          <Clock className="w-4 h-4" />
          {formatDate(article.publishedAt)}
        </div>
        <h3 className="line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover:text-[var(--neon-blue)]">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="mb-4 line-clamp-3 text-[var(--ink-muted)]">{article.description}</p>

        <div className="flex gap-2">
          <Link
            href={`/news/${index}?category=${category}`}
            className="neon-button flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-all"
          >
            Read More & Summarize
          </Link>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-medium transition-colors hover:border-[var(--ink)]"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;

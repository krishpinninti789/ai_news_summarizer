import { Card } from "@/components/ui/card";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import NewsImage from "@/components/shared/NewsImage";

const NewsCard = ({ article, index, category }: NewsCardProps) => {
  return (
    <Card className="news-card group h-full cursor-pointer overflow-hidden rounded-2xl border-[var(--line)] bg-[var(--surface)] p-0 shadow-none transition-all duration-300">
      <div className="news-card__media dot-grid">
        <NewsImage src={article.urlToImage} alt={article.title} />
        <div className="news-card__media-shade" />
        <span className="news-card__source">{article.source.name}</span>
      </div>

      <div className="news-card__content flex flex-1 flex-col p-5">
        <h3 className="line-clamp-3 font-display text-[1.2rem] font-semibold leading-[1.18] tracking-[-.025em] text-[var(--ink)] transition-colors group-hover:text-[var(--neon-blue)]">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--ink-muted)]">
          {article.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <Link
            href={`/news/${index}?category=${category}`}
            className="neon-button inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all"
          >
            Read the brief
            <ArrowUpRight className="size-4" />
          </Link>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open original article from ${article.source.name}`}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink-muted)] transition-all hover:border-[var(--neon-blue)] hover:bg-[rgba(26,115,232,.1)] hover:text-[var(--ink)]"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;

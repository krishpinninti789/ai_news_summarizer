"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import NewsImage from "@/components/shared/NewsImage";

const NewsCard = ({ article, index, category }: NewsCardProps) => {
  const router = useRouter();
  const articlePath = `/news/${index}?category=${category}`;

  const openArticle = () => router.push(articlePath);

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openArticle();
    }
  };

  return (
    <Card
      role="link"
      tabIndex={0}
      aria-label={`Read the brief: ${article.title}`}
      className="news-card group h-full cursor-pointer overflow-hidden rounded-2xl border-[var(--line)] bg-[var(--surface)] p-0 shadow-none transition-all duration-300"
      onClick={openArticle}
      onKeyDown={handleCardKeyDown}
    >
      <div className="news-card__media">
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
      </div>
    </Card>
  );
};

export default NewsCard;

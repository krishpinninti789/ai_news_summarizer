"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NewsImageProps = {
  src?: string;
  alt: string;
};

const NewsImage = ({ src, alt }: NewsImageProps) => {
  const [hasError, setHasError] = useState(false);
  const normalizedSrc = normalizeImageUrl(src);

  useEffect(() => {
    setHasError(false);
  }, [normalizedSrc]);

  if (!normalizedSrc || hasError) {
    return (
      <div className="news-image-fallback" role="img" aria-label={`${alt} image unavailable`}>
        <div className="news-image-fallback__halo" />
        <div className="news-image-fallback__scene" aria-hidden="true">
          <span className="news-image-fallback__sun" />
          <span className="news-image-fallback__ridge news-image-fallback__ridge--back" />
          <span className="news-image-fallback__ridge news-image-fallback__ridge--front" />
        </div>
        <span className="news-image-fallback__label">NewsGist / Signal</span>
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="news-card__image transition-transform duration-500 group-hover:scale-105"
      onError={() => setHasError(true)}
    />
  );
};

function normalizeImageUrl(src?: string) {
  if (!src) return null;

  try {
    const url = new URL(src.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export default NewsImage;

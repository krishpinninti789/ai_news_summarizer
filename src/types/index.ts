type Article = {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
  content: string;
};

type NewsCardProps = {
  article: {
    title: string;
    description: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      name: string;
    };
    url: string;
    content: string;
  };
  index: number;
  category: string;
};

type CategoryFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

type NewsSummaryProps = {
  title: string;
  content: string;
};

type SummaryResponse = {
  summary: string;
  sources?: Array<{
    url: string;
    title?: string;
  }>;
  metadata?: {
    citationTokens: number;
    numSearchQueries: number;
    provider: string;
  };
};

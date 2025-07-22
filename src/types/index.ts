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
};

type CategoryFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

type NewsSummaryProps = {
  title: string;
  content: string;
};

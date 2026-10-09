import { Filter, SlidersHorizontal } from "lucide-react";

type NewsSearchFiltersProps = {
  sortBy: string;
  searchIn: string;
  recency: string;
  onSortChange: (value: string) => void;
  onSearchInChange: (value: string) => void;
  onRecencyChange: (value: string) => void;
};

const NewsSearchFilters = ({
  sortBy,
  searchIn,
  recency,
  onSortChange,
  onSearchInChange,
  onRecencyChange,
}: NewsSearchFiltersProps) => {
  return (
    <details className="news-search-filters mb-8 max-w-3xl">
      <summary className="news-search-filters__summary">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[var(--neon-blue)]" />
          Refine search
        </span>
        <Filter className="size-4 text-[var(--ink-faint)]" />
      </summary>
      <div className="news-search-filters__body">
        <label>
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            <option value="relevancy">Most relevant</option>
            <option value="publishedAt">Most recent</option>
            <option value="popularity">Most popular</option>
          </select>
        </label>
        <label>
          <span>Search in</span>
          <select value={searchIn} onChange={(event) => onSearchInChange(event.target.value)}>
            <option value="title,description,content">All article text</option>
            <option value="title">Headlines only</option>
            <option value="title,description">Headlines and summaries</option>
          </select>
        </label>
        <label>
          <span>Published</span>
          <select value={recency} onChange={(event) => onRecencyChange(event.target.value)}>
            <option value="all">Any time</option>
            <option value="1">Past 24 hours</option>
            <option value="7">Past 7 days</option>
            <option value="30">Past 30 days</option>
          </select>
        </label>
      </div>
    </details>
  );
};

export default NewsSearchFilters;

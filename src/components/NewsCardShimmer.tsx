const NewsCardShimmer = () => {
  return (
    <div className="news-card-shimmer" aria-hidden="true">
      <div className="news-card-shimmer__media shimmer-block" />
      <div className="news-card-shimmer__content">
        <div className="shimmer-block shimmer-line shimmer-line--title" />
        <div className="shimmer-block shimmer-line shimmer-line--title shimmer-line--short" />
        <div className="shimmer-block shimmer-line shimmer-line--body" />
        <div className="shimmer-block shimmer-line shimmer-line--body" />
        <div className="shimmer-block shimmer-line shimmer-line--body shimmer-line--short" />
      </div>
    </div>
  );
};

export default NewsCardShimmer;

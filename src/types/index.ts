type Article =  {
    title: string
    description: string
    urlToImage: string
    publishedAt: string
    source: {
      name: string
    }
    url: string
    content: string
}

type NewsCardProps =  {
    article: {
      title: string
      description: string
      urlToImage: string
      publishedAt: string
      source: {
        name: string
      }
      url: string
      content: string
    }
    index: number
  }


interface trendingRepoType {
  author: string
  repo: string
  describe: string
  language: string
  star: number
  fork: number
  octiconStar: number
}

interface repository {
  author: string
}

export {
  repository,
  trendingRepoType
}

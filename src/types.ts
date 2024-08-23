export type Entry = {
  id: string,
  title: string,
  link: string,
  description: string,
  published: string, 
  podcastTitle?: string,
  podcastLink?: string
}

export type FeedSchema = {
  title: string,
  link: string,
  description: string,
  generator: string,
  language: string,
  published: string,
  entries: Entry[]
}
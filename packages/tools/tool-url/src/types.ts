export type UrlState = {
  raw: string
  encoded: string
  decoded: string
  url?: {
    protocol: string
    host: string
    pathname: string
    search: string
    hash: string
    params: string
  }
}

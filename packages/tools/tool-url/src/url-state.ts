import { hasEscapes, safeDecode } from './codec'
import { parseInputUrl } from './parse'
import type { UrlState } from './types'

export function looksLikeUrlWork(input: string): boolean {
  return hasEscapes(input) || /^https?:\/\//i.test(input) || /^www\./i.test(input) || /^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(input)
}

export function confidence(input: string): number {
  if (/^https?:\/\//i.test(input)) {
    return 0.9
  }

  if (hasEscapes(input)) {
    return 0.82
  }

  return 0.68
}

export function buildUrlState(input: string): UrlState {
  const decoded = safeDecode(input)
  const encoded = encodeURIComponent(decoded)
  const parsedUrl = parseUrl(decoded)

  return {
    raw: input,
    decoded,
    encoded,
    url: parsedUrl,
  }
}

function parseUrl(input: string): UrlState['url'] | undefined {
  const url = parseInputUrl(input)

  if (!url) {
    return undefined
  }

  const params = Array.from(url.searchParams.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  return {
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    params,
  }
}

export { hasEscapes } from './codec'

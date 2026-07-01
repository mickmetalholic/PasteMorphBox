export function extractUrlParamValues(input: string): string[] {
  const url = parseInputUrl(input)

  if (!url) {
    return []
  }

  return Array.from(url.searchParams.values()).filter(Boolean)
}

export function parseInputUrl(input: string): URL | null {
  try {
    return new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`)
  } catch {
    return null
  }
}

export type DerivedCandidate = {
  source: string
  label: string
}

export function deriveCandidates(input: string): DerivedCandidate[] {
  const source = input.trim()

  if (!source) {
    return []
  }

  const candidates: DerivedCandidate[] = []
  addCandidate(candidates, decodePercent(source), 'percent-decoded input', source)

  for (const value of extractUrlParamValues(source)) {
    addCandidate(candidates, value, 'URL query parameter', source)
    addCandidate(candidates, decodeUrlComponentValue(value), 'decoded URL query parameter', source)
  }

  addCandidate(candidates, decodeBase64(source), 'Base64 decoded input', source)
  addCandidate(candidates, decodeBase64Url(source), 'Base64URL decoded input', source)
  addCandidate(candidates, decodeJwtPayload(source), 'JWT payload', source)

  return candidates
}

function addCandidate(candidates: DerivedCandidate[], value: string | null, label: string, original: string) {
  const source = value?.trim()

  if (!source || source === original || candidates.some((candidate) => candidate.source === source)) {
    return
  }

  candidates.push({ source, label })
}

function decodePercent(source: string): string | null {
  if (!/%[0-9a-f]{2}/i.test(source)) {
    return null
  }

  try {
    return decodeURIComponent(source)
  } catch {
    return null
  }
}

function extractUrlParamValues(source: string): string[] {
  try {
    const url = new URL(/^https?:\/\//i.test(source) ? source : `https://${source}`)
    return url.search
      .slice(1)
      .split('&')
      .map((part) => part.split('=')[1] ?? '')
      .filter(Boolean)
  } catch {
    return []
  }
}

function decodeUrlComponentValue(source: string): string | null {
  if (!/%[0-9a-f]{2}|\+/i.test(source)) {
    return null
  }

  try {
    return decodeURIComponent(source.replace(/\+/g, '%20'))
  } catch {
    return null
  }
}

function decodeBase64(source: string): string | null {
  const normalized = source.replace(/\s+/g, '')

  if (normalized.length < 8 || normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    return null
  }

  return decodeBase64Alphabet(normalized)
}

function decodeBase64Url(source: string): string | null {
  if (source.includes('.') || source.length < 8 || !/^[A-Za-z0-9_-]+={0,2}$/.test(source)) {
    return null
  }

  const base64 = source.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(source.length / 4) * 4, '=')
  return decodeBase64Alphabet(base64)
}

function decodeJwtPayload(source: string): string | null {
  const parts = source.split('.')

  if (parts.length !== 3 || !parts[1]) {
    return null
  }

  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
  return decodeBase64Alphabet(payload)
}

function decodeBase64Alphabet(source: string): string | null {
  try {
    const binary = atob(source)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    const text = new TextDecoder().decode(bytes)
    return isMostlyPrintable(text) ? text : null
  } catch {
    return null
  }
}

function isMostlyPrintable(value: string): boolean {
  const printable = [...value].filter((character) => {
    const code = character.charCodeAt(0)
    return code > 8 && (code < 14 || code > 31)
  }).length

  return value.length > 0 && printable / value.length > 0.9
}

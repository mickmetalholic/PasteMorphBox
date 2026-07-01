import type { JwtState } from './types'

export function parseJwt(source: string): JwtState | null {
  const parts = source.split('.')

  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    return null
  }

  const header = parseBase64UrlJson(parts[0])
  const payload = parseBase64UrlJson(parts[1])

  if (!header || !payload) {
    return null
  }

  return {
    raw: source,
    header,
    payload,
    signature: parts[2],
  }
}

function parseBase64UrlJson(value: string): string | null {
  const text = decodeBase64Url(value)

  if (!text) {
    return null
  }

  try {
    return JSON.stringify(JSON.parse(text) as unknown, null, 2)
  } catch {
    return null
  }
}

function decodeBase64Url(value: string): string | null {
  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=')
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

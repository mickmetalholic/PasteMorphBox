import type { ToolModule } from '@pastemorphbox/core'

export type Base64State = {
  kind: 'base64' | 'base64url'
  raw: string
  decoded: string
  encoded: string
}

export const base64Tool: ToolModule<Base64State> = {
  id: 'base64',
  name: 'Base64',
  description: 'Encode and decode Base64 and Base64URL text.',
  category: 'developer',
  tags: ['base64', 'base64url', 'decode', 'text'],
  examples: [
    {
      id: 'base64-text',
      label: 'Base64 text',
      description: 'Decode readable Base64 and copy the normalized value.',
      source: 'SGVsbG8gUGFzdGVNb3JwaEJveA==',
      suggestWhenNoMatch: true,
      tags: ['decode'],
    },
    {
      id: 'base64url-text',
      label: 'Base64URL text',
      description: 'Decode URL-safe Base64 and copy the normalized value.',
      source: 'SGVsbG8td29ybGQ',
      tags: ['decode'],
    },
  ],
  detect(input) {
    const source = input.trim()
    const kind = detectBase64Kind(source)

    if (!kind) {
      return []
    }

    const decoded = kind === 'base64' ? decodeBase64(source) : decodeBase64Url(source)

    if (decoded === null || !isMostlyPrintable(decoded)) {
      return []
    }

    return [
      {
        title: 'Base64 conversion',
        subtitle: kind === 'base64' ? 'Decoded as UTF-8 Base64 text' : 'Decoded as URL-safe Base64 text',
        confidence: kind === 'base64' ? 0.76 : 0.66,
        state: {
          kind,
          raw: source,
          decoded,
          encoded: kind === 'base64' ? encodeBase64(decoded) : encodeBase64Url(decoded),
        },
        source,
      },
    ]
  },
  getFields(state) {
    return [
      {
        id: 'decoded',
        label: 'Decoded text',
        value: state.decoded,
        wide: true,
        monospace: true,
      },
      {
        id: 'encoded',
        label: state.kind === 'base64' ? 'Encoded Base64' : 'Normalized Base64URL',
        value: state.encoded,
        wide: true,
        monospace: true,
      },
    ]
  },
  serializePrimary(state) {
    return state.decoded
  },
}

function detectBase64Kind(input: string): Base64State['kind'] | null {
  if (isJwtShaped(input)) {
    return null
  }

  if (looksLikeBase64(input)) {
    return 'base64'
  }

  if (looksLikeBase64Url(input)) {
    return 'base64url'
  }

  return null
}

function isJwtShaped(input: string): boolean {
  const parts = input.split('.')
  return parts.length === 3 && parts.every(Boolean)
}

function looksLikeBase64(input: string): boolean {
  const normalized = input.replace(/\s+/g, '')
  return normalized.length >= 8 && normalized.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(normalized)
}

function looksLikeBase64Url(input: string): boolean {
  const normalized = input.replace(/\s+/g, '')
  return normalized.length >= 8 && /^[A-Za-z0-9_-]+={0,2}$/.test(normalized)
}

function decodeBase64(input: string): string | null {
  try {
    const binary = atob(input.replace(/\s+/g, ''))
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

function decodeBase64Url(input: string): string | null {
  try {
    const normalized = input.replace(/\s+/g, '')
    const base64 = normalized.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(normalized.length / 4) * 4, '=')
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

function encodeBase64Url(input: string): string {
  return encodeBase64(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function isMostlyPrintable(input: string): boolean {
  if (!input) {
    return false
  }

  const printable = [...input].filter((character) => {
    const code = character.charCodeAt(0)
    return code > 8 && (code < 14 || code > 31)
  }).length

  return printable / input.length > 0.9
}

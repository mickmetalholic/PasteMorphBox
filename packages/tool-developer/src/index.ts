import type { ToolModule, ToolMatch } from '@pastemorphbox/core'

type JwtState = {
  kind: 'jwt'
  raw: string
  header: string
  payload: string
  signature: string
}

type Base64UrlState = {
  kind: 'base64url'
  raw: string
  decoded: string
  encoded: string
}

type UuidState = {
  kind: 'uuid'
  raw: string
  version: string
  normalized: string
}

type HashState = {
  kind: 'hash'
  raw: string
  hashKind: string
  normalized: string
}

type HtmlEntityState = {
  kind: 'html-entities'
  raw: string
  decoded: string
  encoded: string
}

export type DeveloperState = JwtState | Base64UrlState | UuidState | HashState | HtmlEntityState

export const developerTool: ToolModule<DeveloperState> = {
  id: 'developer',
  name: 'Developer',
  description: 'Inspect JWTs, UUIDs, hashes, Base64URL, and HTML entities.',
  category: 'developer',
  tags: ['jwt', 'uuid', 'hash', 'html', 'base64url'],
  examples: [
    {
      id: 'jwt',
      label: 'JWT',
      description: 'Decode JWT header and payload without verification.',
      source: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature',
      suggestWhenNoMatch: true,
      tags: ['jwt'],
    },
    {
      id: 'uuid',
      label: 'UUID',
      description: 'Inspect UUID version and normalized value.',
      source: '550e8400-e29b-41d4-a716-446655440000',
      tags: ['uuid'],
    },
    {
      id: 'html-entities',
      label: 'HTML entities',
      description: 'Decode and encode common HTML entity text.',
      source: 'Tom &amp; Jerry &lt;3',
      tags: ['html'],
    },
  ],
  detect(input) {
    const source = input.trim()

    if (!source) {
      return []
    }

    return [
      detectJwt(source),
      detectUuid(source),
      detectHash(source),
      detectBase64Url(source),
      detectHtmlEntities(source),
    ].filter((match): match is Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> => match !== null)
  },
  getFields(state) {
    if (state.kind === 'jwt') {
      return [
        { id: 'header', label: 'Header JSON', value: state.header, monospace: true, wide: true },
        { id: 'payload', label: 'Payload JSON', value: state.payload, monospace: true, wide: true },
        { id: 'signature', label: 'Signature', value: state.signature, monospace: true, wide: true },
      ]
    }

    if (state.kind === 'base64url') {
      return [
        { id: 'decoded', label: 'Decoded text', value: state.decoded, monospace: true, wide: true },
        { id: 'encoded', label: 'Normalized Base64URL', value: state.encoded, monospace: true, wide: true },
      ]
    }

    if (state.kind === 'uuid') {
      return [
        { id: 'version', label: 'Version', value: state.version },
        { id: 'normalized', label: 'Normalized UUID', value: state.normalized, monospace: true, wide: true },
      ]
    }

    if (state.kind === 'hash') {
      return [
        { id: 'hash-kind', label: 'Detected hash shape', value: state.hashKind },
        { id: 'normalized', label: 'Normalized value', value: state.normalized, monospace: true, wide: true },
      ]
    }

    return [
      { id: 'decoded', label: 'Decoded text', value: state.decoded, wide: true },
      { id: 'encoded', label: 'Encoded entities', value: state.encoded, wide: true },
    ]
  },
  serializePrimary(state) {
    if (state.kind === 'jwt') {
      return state.payload
    }

    if (state.kind === 'uuid' || state.kind === 'hash') {
      return state.normalized
    }

    return state.decoded
  },
}

function detectJwt(source: string): Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> | null {
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
    title: 'JWT inspection',
    subtitle: 'Decoded JWT header and payload without verifying the signature',
    confidence: 0.88,
    state: {
      kind: 'jwt',
      raw: source,
      header,
      payload,
      signature: parts[2],
    },
    source,
  }
}

function detectBase64Url(source: string): Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> | null {
  if (source.includes('.') || source.length < 8 || !/^[A-Za-z0-9_-]+={0,2}$/.test(source)) {
    return null
  }

  const decoded = decodeBase64Url(source)

  if (!decoded || !isMostlyPrintable(decoded)) {
    return null
  }

  return {
    title: 'Base64URL conversion',
    subtitle: 'Decoded as URL-safe Base64 text',
    confidence: 0.66,
    state: {
      kind: 'base64url',
      raw: source,
      decoded,
      encoded: encodeBase64Url(decoded),
    },
    source,
  }
}

function detectUuid(source: string): Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> | null {
  const match = source.match(/^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

  if (!match) {
    return null
  }

  return {
    title: 'UUID inspection',
    subtitle: `Detected UUID version ${match[1]}`,
    confidence: 0.86,
    state: {
      kind: 'uuid',
      raw: source,
      version: match[1] ?? 'unknown',
      normalized: source.toLowerCase(),
    },
    source,
  }
}

function detectHash(source: string): Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> | null {
  if (!/^[a-f0-9]+$/i.test(source)) {
    return null
  }

  const hashKind = hashKindForLength(source.length)

  if (!hashKind) {
    return null
  }

  return {
    title: 'Hash inspection',
    subtitle: `Looks like a ${hashKind} digest`,
    confidence: 0.8,
    state: {
      kind: 'hash',
      raw: source,
      hashKind,
      normalized: source.toLowerCase(),
    },
    source,
  }
}

function detectHtmlEntities(source: string): Omit<ToolMatch<DeveloperState>, 'toolId' | 'matchId'> | null {
  const hasEntity = /&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/i.test(source)
  const hasRawHtmlCharacters = /[<>&"]/.test(source)

  if (!hasEntity && !hasRawHtmlCharacters) {
    return null
  }

  return {
    title: 'HTML entity conversion',
    subtitle: hasEntity ? 'Detected HTML entity text' : 'Detected text that can be entity-encoded',
    confidence: hasEntity ? 0.72 : 0.52,
    state: {
      kind: 'html-entities',
      raw: source,
      decoded: decodeHtmlEntities(source),
      encoded: encodeHtmlEntities(source),
    },
    source,
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

function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function isMostlyPrintable(value: string): boolean {
  const printable = [...value].filter((character) => {
    const code = character.charCodeAt(0)
    return code > 8 && (code < 14 || code > 31)
  }).length

  return value.length > 0 && printable / value.length > 0.9
}

function hashKindForLength(length: number): string | null {
  if (length === 32) {
    return 'MD5'
  }

  if (length === 40) {
    return 'SHA-1'
  }

  if (length === 64) {
    return 'SHA-256'
  }

  return null
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (entity) => {
    const lower = entity.toLowerCase()

    if (lower === '&amp;') return '&'
    if (lower === '&lt;') return '<'
    if (lower === '&gt;') return '>'
    if (lower === '&quot;') return '"'
    if (lower === '&apos;') return "'"

    const numeric = lower.match(/^&#(x[0-9a-f]+|\d+);$/)

    if (!numeric) {
      return entity
    }

    const raw = numeric[1] ?? ''
    const codePoint = raw.startsWith('x') ? Number.parseInt(raw.slice(1), 16) : Number.parseInt(raw, 10)

    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity
  })
}

function encodeHtmlEntities(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

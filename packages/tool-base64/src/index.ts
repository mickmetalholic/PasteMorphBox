import type { ToolModule } from '@pastemorphbox/core'

export type Base64State = {
  raw: string
  decoded?: string
  encoded: string
}

const genericEncodingConfidence = 0.35

export const base64Tool: ToolModule<Base64State> = {
  id: 'base64',
  name: 'Base64',
  description: 'Encode and decode Base64 text.',
  detect(input) {
    const source = input.trim()

    if (!source) {
      return []
    }

    if (looksLikeBase64(source)) {
      const decoded = decodeBase64(source)

      if (decoded !== null && isMostlyPrintable(decoded)) {
        return [
          {
            title: 'Base64 conversion',
            subtitle: 'Decoded as UTF-8 Base64 text',
            confidence: 0.76,
            state: {
              raw: source,
              decoded,
              encoded: encodeBase64(decoded),
            },
            source,
          },
        ]
      }
    }

    return [
      {
        title: 'Base64 conversion',
        subtitle: 'Encoded as UTF-8 Base64 text',
        confidence: genericEncodingConfidence,
        state: {
          raw: source,
          encoded: encodeBase64(source),
        },
        source,
      },
    ]
  },
  getFields(state) {
    const fields = [
      {
        id: 'encoded',
        label: 'Encoded Base64',
        value: state.encoded,
        wide: true,
        monospace: true,
      },
    ]

    if (state.decoded !== undefined) {
      return [
        {
          id: 'decoded',
          label: 'Decoded text',
          value: state.decoded,
          wide: true,
          monospace: true,
        },
        ...fields,
      ]
    }

    return [
      {
        id: 'raw',
        label: 'Original text',
        value: state.raw,
        wide: true,
        monospace: true,
      },
      ...fields,
    ]
  },
  serializePrimary(state) {
    return state.decoded ?? state.encoded
  },
}

function looksLikeBase64(input: string): boolean {
  const normalized = input.replace(/\s+/g, '')

  return normalized.length >= 8 && normalized.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(normalized)
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

function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
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

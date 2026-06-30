import type { ToolModule } from '@pastemorphbox/core'

export type JwtState = {
  raw: string
  header: string
  payload: string
  signature: string
}

export const jwtTool: ToolModule<JwtState> = {
  id: 'jwt',
  name: 'JWT',
  description: 'Decode JWT header and payload without verifying the signature.',
  category: 'developer',
  tags: ['jwt', 'token', 'base64url'],
  examples: [
    {
      id: 'jwt',
      label: 'JWT',
      description: 'Decode JWT header and payload without verification.',
      source: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature',
      suggestWhenNoMatch: true,
      tags: ['jwt'],
    },
  ],
  detect(input) {
    const source = input.trim()
    const state = parseJwt(source)

    if (!state) {
      return []
    }

    return [
      {
        title: 'JWT inspection',
        subtitle: 'Decoded JWT header and payload without verifying the signature',
        confidence: 0.88,
        state,
        source,
      },
    ]
  },
  getFields(state) {
    return [
      { id: 'header', label: 'Header JSON', value: state.header, monospace: true, wide: true },
      { id: 'payload', label: 'Payload JSON', value: state.payload, monospace: true, wide: true },
      { id: 'signature', label: 'Signature', value: state.signature, monospace: true, wide: true },
    ]
  },
  serializePrimary(state) {
    return state.payload
  },
}

function parseJwt(source: string): JwtState | null {
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

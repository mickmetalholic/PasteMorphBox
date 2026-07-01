import type { Base64State } from './types'

export function detectBase64Kind(input: string): Base64State['kind'] | null {
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

export function decodeBase64(input: string): string | null {
  try {
    const binary = atob(input.replace(/\s+/g, ''))
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

export function decodeBase64Url(input: string): string | null {
  try {
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=')
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

export function encodeBase64Url(input: string): string {
  return encodeBase64(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function isMostlyPrintable(input: string): boolean {
  if (!input) {
    return false
  }

  const printable = [...input].filter((character) => {
    const code = character.charCodeAt(0)
    return code > 8 && (code < 14 || code > 31)
  }).length

  return printable / input.length > 0.9
}

function isJwtShaped(input: string): boolean {
  const parts = input.split('.')
  return parts.length === 3 && parts.every(Boolean)
}

function looksLikeBase64(input: string): boolean {
  if (/\s/.test(input)) {
    return false
  }

  const normalized = input.replace(/\s+/g, '')
  return normalized.length >= 8 && normalized.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(normalized)
}

function looksLikeBase64Url(input: string): boolean {
  if (/\s/.test(input)) {
    return false
  }

  return input.length >= 8 && /^[A-Za-z0-9_-]+={0,2}$/.test(input)
}

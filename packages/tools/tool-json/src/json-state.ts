import type { JsonState } from './types'

export function looksLikeJson(input: string): boolean {
  return input.startsWith('{') || input.startsWith('[') || input.endsWith('}') || input.endsWith(']')
}

export function parseJson(input: string): JsonState {
  try {
    const value = JSON.parse(input) as unknown

    return {
      raw: input,
      valid: true,
      formatted: JSON.stringify(value, null, 2),
      compact: JSON.stringify(value),
      summary: summarizeJson(value),
    }
  } catch (error) {
    return {
      raw: input,
      valid: false,
      formatted: '',
      compact: '',
      summary: 'Invalid JSON',
      error: error instanceof Error ? error.message : 'Invalid JSON',
    }
  }
}

function summarizeJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `Array with ${value.length} item${value.length === 1 ? '' : 's'}`
  }

  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value)
    return `Object with ${keys.length} key${keys.length === 1 ? '' : 's'}`
  }

  return `${typeof value} value`
}

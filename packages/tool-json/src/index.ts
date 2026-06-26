import type { ToolField, ToolModule } from '@pastemorphbox/core'

export type JsonState = {
  raw: string
  valid: boolean
  formatted: string
  compact: string
  summary: string
  error?: string
}

export const jsonTool: ToolModule<JsonState> = {
  id: 'json',
  name: 'JSON',
  description: 'Validate, format, and compact JSON.',
  detect(input) {
    if (!looksLikeJson(input)) {
      return []
    }

    const state = parseJson(input)

    return [
      {
        title: state.valid ? 'JSON formatting' : 'JSON validation',
        subtitle: state.valid ? 'Parsed as valid JSON' : 'Looks like JSON but has a syntax issue',
        confidence: state.valid ? 0.92 : 0.58,
        state,
        source: input,
      },
    ]
  },
  getFields(state) {
    const fields: ToolField[] = [
      {
        id: 'summary',
        label: 'Summary',
        value: state.summary,
      },
    ]

    if (!state.valid) {
      fields.push({
        id: 'error',
        label: 'Error',
        value: state.error ?? 'Invalid JSON',
        wide: true,
      })

      return fields
    }

    fields.push(
      {
        id: 'formatted',
        label: 'Formatted',
        value: state.formatted,
        copyValue: state.formatted,
        inputKind: 'textarea',
        monospace: true,
        wide: true,
      },
      {
        id: 'compact',
        label: 'Compact',
        value: state.compact,
        monospace: true,
        wide: true,
      },
    )

    return fields
  },
  serializePrimary(state) {
    return state.valid ? state.formatted : state.raw
  },
}

function looksLikeJson(input: string): boolean {
  return input.startsWith('{') || input.startsWith('[') || input.endsWith('}') || input.endsWith(']')
}

function parseJson(input: string): JsonState {
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

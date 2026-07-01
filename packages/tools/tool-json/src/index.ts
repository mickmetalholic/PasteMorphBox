import type { ToolModule } from '@pastemorphbox/core'
import { getJsonFields } from './fields'
import { looksLikeJson, parseJson } from './json-state'
import type { JsonState } from './types'

export type { JsonState } from './types'

export const jsonTool: ToolModule<JsonState> = {
  id: 'json',
  name: 'JSON',
  description: 'Validate, format, and compact JSON.',
  category: 'inspect',
  tags: ['json', 'format', 'developer'],
  examples: [
    {
      id: 'json-object',
      label: 'JSON object',
      description: 'Format, compact, and summarize structured JSON.',
      source: '{"user":{"id":123,"name":"Mika"},"roles":["admin","billing"],"active":true}',
      suggestWhenNoMatch: true,
      tags: ['format'],
    },
    {
      id: 'json-array',
      label: 'JSON array',
      description: 'Summarize and format an array payload.',
      source: '[{"sku":"A-1","qty":2},{"sku":"B-4","qty":5}]',
      tags: ['format'],
    },
  ],
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
  getFields: getJsonFields,
  serializePrimary(state) {
    return state.valid ? state.formatted : state.raw
  },
}

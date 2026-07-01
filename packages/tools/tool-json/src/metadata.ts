import type { ToolModule } from '@pastemorphbox/core'
import type { JsonState } from './types'

export const jsonMetadata = {
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
} satisfies Pick<ToolModule<JsonState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

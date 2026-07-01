import type { ToolModule } from '@pastemorphbox/core'
import type { UrlState } from './types'

export const urlMetadata = {
  id: 'url',
  name: 'URL',
  description: 'Encode, decode, and inspect URLs.',
  category: 'developer',
  tags: ['url', 'decode', 'query'],
  examples: [
    {
      id: 'url-decode',
      label: 'URL decode',
      description: 'Decode escaped URLs and inspect URL parts.',
      source: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dpaste%2520tools%26ref%3Ddemo',
      suggestWhenNoMatch: true,
      tags: ['decode'],
    },
    {
      id: 'url-parts',
      label: 'URL parts',
      description: 'Break down a full URL into origin, path, and query params.',
      source: 'https://example.com/orders?id=42&status=ready#details',
      tags: ['query'],
    },
  ],
} satisfies Pick<ToolModule<UrlState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

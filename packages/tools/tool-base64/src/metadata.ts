import type { ToolModule } from '@pastemorphbox/core'
import type { Base64State } from './types'

export const base64Metadata = {
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
} satisfies Pick<ToolModule<Base64State>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

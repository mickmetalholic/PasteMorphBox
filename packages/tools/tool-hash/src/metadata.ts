import type { ToolModule } from '@pastemorphbox/core'
import type { HashState } from './types'

export const hashMetadata = {
  id: 'hash',
  name: 'Hash',
  description: 'Inspect common hexadecimal digest shapes.',
  category: 'developer',
  tags: ['hash', 'md5', 'sha1', 'sha256'],
  examples: [
    {
      id: 'md5',
      label: 'Hash',
      description: 'Detect common digest shapes and normalize casing.',
      source: 'd41d8cd98f00b204e9800998ecf8427e',
      tags: ['hash'],
    },
  ],
} satisfies Pick<ToolModule<HashState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

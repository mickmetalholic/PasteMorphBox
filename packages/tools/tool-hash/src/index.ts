import type { ToolModule } from '@pastemorphbox/core'
import { getHashFields } from './fields'
import { hashKindForLength } from './hash-state'
import type { HashState } from './types'

export type { HashState } from './types'

export const hashTool: ToolModule<HashState> = {
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
  detect(input) {
    const source = input.trim()

    if (!/^[a-f0-9]+$/i.test(source)) {
      return []
    }

    const hashKind = hashKindForLength(source.length)

    if (!hashKind) {
      return []
    }

    return [
      {
        title: 'Hash inspection',
        subtitle: `Looks like a ${hashKind} digest`,
        confidence: 0.8,
        state: {
          raw: source,
          hashKind,
          normalized: source.toLowerCase(),
        },
        source,
      },
    ]
  },
  getFields: getHashFields,
  serializePrimary(state) {
    return state.normalized
  },
}

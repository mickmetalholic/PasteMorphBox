import type { ToolModule } from '@pastemorphbox/core'
import { getHashFields } from './fields'
import { hashKindForLength } from './hash-state'
import { hashMetadata } from './metadata'
import type { HashState } from './types'

export type { HashState } from './types'

export const hashTool: ToolModule<HashState> = {
  ...hashMetadata,
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

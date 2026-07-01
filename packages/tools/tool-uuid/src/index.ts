import type { ToolModule } from '@pastemorphbox/core'
import { getUuidFields } from './fields'
import { uuidMetadata } from './metadata'
import { parseUuidVersion } from './uuid-state'
import type { UuidState } from './types'

export type { UuidState } from './types'

export const uuidTool: ToolModule<UuidState> = {
  ...uuidMetadata,
  detect(input) {
    const source = input.trim()
    const version = parseUuidVersion(source)

    if (!version) {
      return []
    }

    return [
      {
        title: 'UUID inspection',
        subtitle: `Detected UUID version ${version}`,
        confidence: 0.86,
        state: {
          raw: source,
          version,
          normalized: source.toLowerCase(),
        },
        source,
      },
    ]
  },
  getFields: getUuidFields,
  serializePrimary(state) {
    return state.normalized
  },
}

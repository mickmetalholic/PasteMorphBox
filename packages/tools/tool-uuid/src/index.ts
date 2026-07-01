import type { ToolModule } from '@pastemorphbox/core'
import { getUuidFields } from './fields'
import { parseUuidVersion } from './uuid-state'
import type { UuidState } from './types'

export type { UuidState } from './types'

export const uuidTool: ToolModule<UuidState> = {
  id: 'uuid',
  name: 'UUID',
  description: 'Inspect UUID version and normalized value.',
  category: 'developer',
  tags: ['uuid', 'identifier'],
  examples: [
    {
      id: 'uuid',
      label: 'UUID',
      description: 'Inspect UUID version and normalized value.',
      source: '550e8400-e29b-41d4-a716-446655440000',
      tags: ['uuid'],
    },
  ],
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

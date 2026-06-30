import type { ToolModule } from '@pastemorphbox/core'

export type UuidState = {
  raw: string
  version: string
  normalized: string
}

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
    const match = source.match(/^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

    if (!match) {
      return []
    }

    return [
      {
        title: 'UUID inspection',
        subtitle: `Detected UUID version ${match[1]}`,
        confidence: 0.86,
        state: {
          raw: source,
          version: match[1] ?? 'unknown',
          normalized: source.toLowerCase(),
        },
        source,
      },
    ]
  },
  getFields(state) {
    return [
      { id: 'version', label: 'Version', value: state.version },
      { id: 'normalized', label: 'Normalized UUID', value: state.normalized, monospace: true, wide: true },
    ]
  },
  serializePrimary(state) {
    return state.normalized
  },
}

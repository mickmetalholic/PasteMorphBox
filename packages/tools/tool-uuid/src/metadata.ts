import type { ToolModule } from '@pastemorphbox/core'
import type { UuidState } from './types'

export const uuidMetadata = {
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
} satisfies Pick<ToolModule<UuidState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

import type { ToolModule } from '@pastemorphbox/core'
import { getHtmlEntitiesFields } from './fields'
import { decodeHtmlEntities, encodeHtmlEntities, hasHtmlEntity, hasRawHtmlCharacters } from './html-entities-state'
import type { HtmlEntitiesState } from './types'

export type { HtmlEntitiesState } from './types'

export const htmlEntitiesTool: ToolModule<HtmlEntitiesState> = {
  id: 'html-entities',
  name: 'HTML entities',
  description: 'Decode and encode common HTML entity text.',
  category: 'developer',
  tags: ['html', 'entities', 'escape'],
  examples: [
    {
      id: 'html-entities',
      label: 'HTML entities',
      description: 'Decode and encode common HTML entity text.',
      source: 'Tom &amp; Jerry &lt;3',
      tags: ['html'],
    },
  ],
  detect(input) {
    const source = input.trim()
    const hasEntity = hasHtmlEntity(source)
    const canEncodeRawCharacters = hasRawHtmlCharacters(source)

    if (!hasEntity && !canEncodeRawCharacters) {
      return []
    }

    return [
      {
        title: 'HTML entity conversion',
        subtitle: hasEntity ? 'Detected HTML entity text' : 'Detected text that can be entity-encoded',
        confidence: hasEntity ? 0.72 : 0.52,
        state: {
          raw: source,
          decoded: decodeHtmlEntities(source),
          encoded: encodeHtmlEntities(source),
        },
        source,
      },
    ]
  },
  getFields: getHtmlEntitiesFields,
  serializePrimary(state) {
    return state.decoded
  },
}

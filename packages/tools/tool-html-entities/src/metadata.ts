import type { ToolModule } from '@pastemorphbox/core'
import type { HtmlEntitiesState } from './types'

export const htmlEntitiesMetadata = {
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
} satisfies Pick<ToolModule<HtmlEntitiesState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

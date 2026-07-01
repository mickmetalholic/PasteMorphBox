import type { ToolModule } from '@pastemorphbox/core'
import type { TextState } from './types'

export const textMetadata = {
  id: 'text',
  name: 'Text',
  description: 'Clean whitespace, transform lists, change case, and count text.',
  category: 'clean',
  tags: ['text', 'cleanup', 'list', 'case'],
  examples: [
    {
      id: 'messy-list',
      label: 'Messy list',
      description: 'Trim, dedupe, sort, and join pasted lines.',
      source: '  Alice  \n\nBob\nAlice\n  carol  ',
      suggestWhenNoMatch: true,
      tags: ['list'],
    },
    {
      id: 'case-cleanup',
      label: 'Case cleanup',
      description: 'Create uppercase, lowercase, and title case variants.',
      source: 'quarterly launch CHECKLIST',
      tags: ['case'],
    },
  ],
} satisfies Pick<ToolModule<TextState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

import type { ToolModule } from '@pastemorphbox/core'
import { getTextFields } from './fields'
import { buildTextState, textConfidence } from './text-state'
import type { TextState } from './types'

export type { TextState } from './types'

export const textTool: ToolModule<TextState> = {
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
  detect(input) {
    const state = buildTextState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: 'Text cleanup',
        subtitle: state.stats.lines > 1 ? 'Detected multi-line text' : 'Detected plain text',
        confidence: textConfidence(state),
        state,
        source: input,
      },
    ]
  },
  getFields: getTextFields,
  serializePrimary(state) {
    return state.removedEmptyLines
  },
}

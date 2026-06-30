import type { ToolField, ToolModule } from '@pastemorphbox/core'
import { buildTextState, formatStats, textConfidence } from './text-state'
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
  getFields(state) {
    const fields: ToolField[] = [
      {
        id: 'stats',
        label: 'Counts',
        value: formatStats(state),
        monospace: true,
      },
      {
        id: 'trimmed',
        label: 'Trimmed',
        value: state.trimmed,
        monospace: true,
        wide: true,
      },
      {
        id: 'removed-empty-lines',
        label: 'Removed empty lines',
        value: state.removedEmptyLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'normalized-whitespace',
        label: 'Normalized whitespace',
        value: state.normalizedWhitespace,
        monospace: true,
        wide: true,
      },
      {
        id: 'deduplicated-lines',
        label: 'Deduplicated lines',
        value: state.deduplicatedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'sorted-lines',
        label: 'Sorted lines',
        value: state.sortedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'joined-lines',
        label: 'Joined lines',
        value: state.joinedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'uppercase',
        label: 'Uppercase',
        value: state.uppercase,
        monospace: true,
        wide: true,
      },
      {
        id: 'lowercase',
        label: 'Lowercase',
        value: state.lowercase,
        monospace: true,
        wide: true,
      },
      {
        id: 'title-case',
        label: 'Title case',
        value: state.titleCase,
        monospace: true,
        wide: true,
      },
    ]

    return fields
  },
  serializePrimary(state) {
    return state.removedEmptyLines
  },
}

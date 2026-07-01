import type { ToolField } from '@pastemorphbox/core'
import { formatStats } from './text-state'
import type { TextState } from './types'

export function getTextFields(state: TextState): ToolField[] {
  return [
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
}

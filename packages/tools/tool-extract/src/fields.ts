import type { ToolField } from '@pastemorphbox/core'
import type { ExtractState } from './types'

export function getExtractFields(state: ExtractState): ToolField[] {
  const fields: ToolField[] = [
    {
      id: 'summary',
      label: 'Summary',
      value: `${state.total} extracted value${state.total === 1 ? '' : 's'} across ${state.groups.length} group${state.groups.length === 1 ? '' : 's'}`,
    },
  ]

  for (const group of state.groups) {
    fields.push({
      id: group.key,
      label: group.label,
      value: group.values.join('\n'),
      monospace: true,
      wide: true,
    })
  }

  fields.push({
    id: 'csv',
    label: 'CSV',
    value: state.csv,
    monospace: true,
    wide: true,
  })

  return fields
}

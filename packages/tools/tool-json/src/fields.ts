import type { ToolField } from '@pastemorphbox/core'
import type { JsonState } from './types'

export function getJsonFields(state: JsonState): ToolField[] {
  const fields: ToolField[] = [
    {
      id: 'summary',
      label: 'Summary',
      value: state.summary,
    },
  ]

  if (!state.valid) {
    fields.push({
      id: 'error',
      label: 'Error',
      value: state.error ?? 'Invalid JSON',
      wide: true,
    })

    return fields
  }

  fields.push(
    {
      id: 'formatted',
      label: 'Formatted',
      value: state.formatted,
      copyValue: state.formatted,
      inputKind: 'textarea',
      monospace: true,
      wide: true,
    },
    {
      id: 'compact',
      label: 'Compact',
      value: state.compact,
      monospace: true,
      wide: true,
    },
  )

  return fields
}

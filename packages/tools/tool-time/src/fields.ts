import type { ToolField } from '@pastemorphbox/core'
import { formatRelative, toLocalDisplay, toLocalInputValue } from './format'
import type { TimeState } from './types'

export function getTimeFields(state: TimeState): ToolField[] {
  const date = new Date(state.epochMs)

  return [
    {
      id: 'seconds',
      label: 'Unix seconds',
      value: Math.floor(state.epochMs / 1000).toString(),
      editable: true,
      inputKind: 'number',
      monospace: true,
    },
    {
      id: 'milliseconds',
      label: 'Unix milliseconds',
      value: state.epochMs.toString(),
      editable: true,
      inputKind: 'number',
      monospace: true,
    },
    {
      id: 'local',
      label: 'Local time',
      value: toLocalInputValue(date),
      copyValue: toLocalDisplay(date),
      editable: true,
      inputKind: 'datetime-local',
    },
    {
      id: 'utc',
      label: 'UTC',
      value: date.toUTCString(),
    },
    {
      id: 'iso',
      label: 'ISO 8601',
      value: date.toISOString(),
      editable: true,
      inputKind: 'text',
      monospace: true,
      wide: true,
    },
    {
      id: 'relative',
      label: 'Relative',
      value: formatRelative(state.epochMs),
    },
  ]
}

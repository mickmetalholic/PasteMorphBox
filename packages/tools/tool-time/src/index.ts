import type { ToolModule } from '@pastemorphbox/core'
import { formatRelative, toLocalDisplay, toLocalInputValue } from './format'
import { detectNumericTimestamp, parseEditedTime } from './time-state'
import type { TimeState } from './types'

export type { TimeState } from './types'

export const timeTool: ToolModule<TimeState> = {
  id: 'time',
  name: 'Time',
  description: 'Convert Unix timestamps, local dates, UTC, and ISO time.',
  category: 'convert',
  tags: ['timestamp', 'date', 'utc'],
  examples: [
    {
      id: 'timestamp-seconds',
      label: 'Timestamp',
      description: 'Read Unix timestamps across local and UTC time.',
      source: '1700000000',
      suggestWhenNoMatch: true,
      tags: ['timestamp'],
    },
    {
      id: 'iso-date',
      label: 'ISO date',
      description: 'Convert an ISO date into timestamp formats.',
      source: '2026-06-29T12:00:00Z',
      tags: ['date'],
    },
  ],
  detect(input) {
    const numeric = detectNumericTimestamp(input)

    if (numeric) {
      return [numeric]
    }

    const parsedDate = Date.parse(input)

    if (!Number.isNaN(parsedDate) && /[-/:T年月日]/.test(input)) {
      return [
        {
          title: 'Time conversion',
          subtitle: 'Parsed as a date/time value',
          confidence: 0.86,
          state: {
            epochMs: parsedDate,
            sourceKind: 'date',
          },
          source: input,
        },
      ]
    }

    return []
  },
  getFields(state) {
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
  },
  applyEdit(state, fieldId, value) {
    const nextMs = parseEditedTime(fieldId, value)

    if (nextMs === null) {
      return {
        state,
        error: 'Enter a valid timestamp or date.',
      }
    }

    return {
      state: {
        epochMs: nextMs,
        sourceKind: state.sourceKind,
      },
    }
  },
  serializePrimary(state) {
    return Math.floor(state.epochMs / 1000).toString()
  },
}

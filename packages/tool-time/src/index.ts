import type { ToolModule } from '@pastemorphbox/core'

export type TimeState = {
  epochMs: number
  sourceKind: 'seconds' | 'milliseconds' | 'date'
}

const plausibleMin = Date.UTC(1970, 0, 1)
const plausibleMax = Date.UTC(2100, 0, 1)

export const timeTool: ToolModule<TimeState> = {
  id: 'time',
  name: 'Time',
  description: 'Convert Unix timestamps, local dates, UTC, and ISO time.',
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

function detectNumericTimestamp(input: string) {
  if (!/^-?\d{9,16}$/.test(input)) {
    return null
  }

  const value = Number(input)

  if (!Number.isSafeInteger(value)) {
    return null
  }

  const epochMs = input.length >= 13 ? value : value * 1000

  if (epochMs < plausibleMin || epochMs > plausibleMax) {
    return null
  }

  const isMilliseconds = input.length >= 13

  return {
    title: 'Timestamp conversion',
    subtitle: isMilliseconds ? 'Parsed as Unix milliseconds' : 'Parsed as Unix seconds',
    confidence: isMilliseconds ? 0.93 : 0.96,
    state: {
      epochMs,
      sourceKind: isMilliseconds ? 'milliseconds' : 'seconds',
    } satisfies TimeState,
    source: input,
  }
}

function parseEditedTime(fieldId: string, value: string): number | null {
  if (fieldId === 'seconds') {
    const seconds = Number(value)
    return Number.isFinite(seconds) ? Math.trunc(seconds * 1000) : null
  }

  if (fieldId === 'milliseconds') {
    const milliseconds = Number(value)
    return Number.isFinite(milliseconds) ? Math.trunc(milliseconds) : null
  }

  if (fieldId === 'local' || fieldId === 'iso') {
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? null : parsed
  }

  return null
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

function toLocalInputValue(date: Date): string {
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    'T',
    pad(date.getHours()),
    ':',
    pad(date.getMinutes()),
    ':',
    pad(date.getSeconds()),
  ].join('')
}

function toLocalDisplay(date: Date): string {
  return toLocalInputValue(date).replace('T', ' ')
}

function formatRelative(epochMs: number): string {
  const diffSeconds = Math.round((epochMs - Date.now()) / 1000)
  const absolute = Math.abs(diffSeconds)
  const suffix = diffSeconds >= 0 ? 'from now' : 'ago'

  if (absolute < 60) {
    return `${absolute}s ${suffix}`
  }

  if (absolute < 3600) {
    return `${Math.round(absolute / 60)}m ${suffix}`
  }

  if (absolute < 86400) {
    return `${Math.round(absolute / 3600)}h ${suffix}`
  }

  return `${Math.round(absolute / 86400)}d ${suffix}`
}

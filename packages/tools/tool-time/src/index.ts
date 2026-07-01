import type { ToolModule } from '@pastemorphbox/core'
import { getTimeFields } from './fields'
import { timeMetadata } from './metadata'
import { detectNumericTimestamp, parseEditedTime } from './time-state'
import type { TimeState } from './types'

export type { TimeState } from './types'

export const timeTool: ToolModule<TimeState> = {
  ...timeMetadata,
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
  getFields: getTimeFields,
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

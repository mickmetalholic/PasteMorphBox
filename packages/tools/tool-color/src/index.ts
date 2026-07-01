import type { ToolModule } from '@pastemorphbox/core'
import { getColorFields } from './fields'
import { formatHex } from './format'
import { colorMetadata } from './metadata'
import { colorConfidence, parseColor } from './parse-color'
import type { RgbState } from './types'

export const colorTool: ToolModule<RgbState> = {
  ...colorMetadata,
  detect(input) {
    const rgb = parseColor(input)

    if (!rgb) {
      return []
    }

    return [
      {
        title: 'Color conversion',
        subtitle: 'Parsed as a CSS color value',
        confidence: colorConfidence(input),
        state: rgb,
        source: input,
      },
    ]
  },
  getFields: getColorFields,
  applyEdit(state, _fieldId, value) {
    const next = parseColor(value)

    if (!next) {
      return {
        state,
        error: 'Enter a valid CSS color.',
      }
    }

    return {
      state: next,
    }
  },
  serializePrimary(state) {
    return formatHex(state)
  },
}

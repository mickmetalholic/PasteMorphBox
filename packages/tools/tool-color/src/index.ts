import type { ToolModule } from '@pastemorphbox/core'
import { getColorFields } from './fields'
import { formatHex } from './format'
import { colorConfidence, parseColor } from './parse-color'
import type { RgbState } from './types'

export const colorTool: ToolModule<RgbState> = {
  id: 'color',
  name: 'Color',
  description: 'Convert CSS color values across common color spaces.',
  category: 'inspect',
  tags: ['color', 'css', 'design'],
  examples: [
    {
      id: 'hex-color',
      label: 'Color value',
      description: 'Convert color formats and preview the swatch.',
      source: '#ff6600',
      suggestWhenNoMatch: true,
      tags: ['css'],
    },
    {
      id: 'rgb-color',
      label: 'RGB color',
      description: 'Inspect a CSS RGB color in other spaces.',
      source: 'rgb(34 197 94)',
      tags: ['css'],
    },
  ],
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

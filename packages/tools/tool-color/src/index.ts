import type { ToolModule } from '@pastemorphbox/core'
import { converter } from 'culori'
import { formatHex, formatHsl, formatHsv, formatOklch, formatRgba } from './format'
import { colorConfidence, parseColor } from './parse-color'
import type { HslLike, HsvLike, OklchLike, RgbState } from './types'

const toHsl = converter('hsl')
const toHsv = converter('hsv')
const toOklch = converter('oklch')

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
  getFields(state) {
    const hex = formatHex(state)
    const hsl = toHsl(state) as HslLike
    const hsv = toHsv(state) as HsvLike
    const oklch = toOklch(state) as OklchLike

    return [
      {
        id: 'preview',
        label: 'Preview',
        value: hex,
        colorSwatch: formatRgba(state),
      },
      {
        id: 'hex',
        label: 'HEX',
        value: hex,
        editable: true,
        inputKind: 'text',
        monospace: true,
        colorSwatch: formatRgba(state),
      },
      {
        id: 'rgb',
        label: 'RGB',
        value: formatRgba(state),
        editable: true,
        inputKind: 'text',
        monospace: true,
      },
      {
        id: 'hsl',
        label: 'HSL',
        value: formatHsl(hsl, state.alpha),
        editable: true,
        inputKind: 'text',
        monospace: true,
      },
      {
        id: 'hsv',
        label: 'HSV',
        value: formatHsv(hsv, state.alpha),
        monospace: true,
      },
      {
        id: 'oklch',
        label: 'OKLCH',
        value: formatOklch(oklch, state.alpha),
        monospace: true,
      },
      {
        id: 'css-var',
        label: 'CSS variable',
        value: `--color: ${hex};`,
        monospace: true,
        wide: true,
      },
    ]
  },
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

import type { ToolField } from '@pastemorphbox/core'
import { converter } from 'culori'
import { formatHex, formatHsl, formatHsv, formatOklch, formatRgba } from './format'
import type { HslLike, HsvLike, OklchLike, RgbState } from './types'

const toHsl = converter('hsl')
const toHsv = converter('hsv')
const toOklch = converter('oklch')

export function getColorFields(state: RgbState): ToolField[] {
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
}

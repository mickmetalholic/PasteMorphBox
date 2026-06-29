import type { ToolModule } from '@pastemorphbox/core'
import { converter, parse } from 'culori'

type RgbState = {
  mode: 'rgb'
  r: number
  g: number
  b: number
  alpha: number
}

type HslLike = {
  h?: number
  s?: number
  l?: number
  alpha?: number
}

type HsvLike = {
  h?: number
  s?: number
  v?: number
  alpha?: number
}

type OklchLike = {
  l?: number
  c?: number
  h?: number
  alpha?: number
}

const toRgb = converter('rgb')
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

function parseColor(input: string): RgbState | null {
  const parsed = parse(input)

  if (!parsed) {
    return null
  }

  const rgb = toRgb(parsed) as { r?: number; g?: number; b?: number; alpha?: number } | undefined

  if (!rgb || rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    return null
  }

  return {
    mode: 'rgb',
    r: clamp01(rgb.r),
    g: clamp01(rgb.g),
    b: clamp01(rgb.b),
    alpha: rgb.alpha === undefined ? 1 : clamp01(rgb.alpha),
  }
}

function colorConfidence(input: string): number {
  if (/^#([\da-f]{3,8})$/i.test(input)) {
    return 0.97
  }

  if (/^(rgb|rgba|hsl|hsla|hwb|oklch|lab|lch|color)\(/i.test(input)) {
    return 0.94
  }

  return 0.72
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function channel(value: number): number {
  return Math.round(clamp01(value) * 255)
}

function alpha(value: number): string {
  return Number(value.toFixed(3)).toString()
}

function formatHex(state: RgbState): string {
  const rgb = [channel(state.r), channel(state.g), channel(state.b)]
    .map((part) => part.toString(16).padStart(2, '0'))
    .join('')

  if (state.alpha < 1) {
    return `#${rgb}${channel(state.alpha).toString(16).padStart(2, '0')}`
  }

  return `#${rgb}`
}

function formatRgba(state: RgbState): string {
  const channels = `${channel(state.r)} ${channel(state.g)} ${channel(state.b)}`

  if (state.alpha < 1) {
    return `rgb(${channels} / ${alpha(state.alpha)})`
  }

  return `rgb(${channels})`
}

function formatHsl(color: HslLike, alphaValue: number): string {
  const hue = Math.round(color.h ?? 0)
  const saturation = Math.round((color.s ?? 0) * 100)
  const lightness = Math.round((color.l ?? 0) * 100)

  if (alphaValue < 1) {
    return `hsl(${hue} ${saturation}% ${lightness}% / ${alpha(alphaValue)})`
  }

  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

function formatHsv(color: HsvLike, alphaValue: number): string {
  const hue = Math.round(color.h ?? 0)
  const saturation = Math.round((color.s ?? 0) * 100)
  const value = Math.round((color.v ?? 0) * 100)

  if (alphaValue < 1) {
    return `hsv(${hue} ${saturation}% ${value}% / ${alpha(alphaValue)})`
  }

  return `hsv(${hue} ${saturation}% ${value}%)`
}

function formatOklch(color: OklchLike, alphaValue: number): string {
  const lightness = Number((color.l ?? 0).toFixed(4))
  const chroma = Number((color.c ?? 0).toFixed(4))
  const hue = Math.round(color.h ?? 0)

  if (alphaValue < 1) {
    return `oklch(${lightness} ${chroma} ${hue} / ${alpha(alphaValue)})`
  }

  return `oklch(${lightness} ${chroma} ${hue})`
}

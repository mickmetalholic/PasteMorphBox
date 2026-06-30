import { converter, parse } from 'culori'
import type { RgbState } from './types'

const toRgb = converter('rgb')

export function parseColor(input: string): RgbState | null {
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

export function colorConfidence(input: string): number {
  if (/^#([\da-f]{3,8})$/i.test(input)) {
    return 0.97
  }

  if (/^(rgb|rgba|hsl|hsla|hwb|oklch|lab|lch|color)\(/i.test(input)) {
    return 0.94
  }

  return 0.72
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

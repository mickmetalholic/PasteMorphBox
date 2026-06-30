import type { HslLike, HsvLike, OklchLike, RgbState } from './types'

export function channel(value: number): number {
  return Math.round(Math.min(1, Math.max(0, value)) * 255)
}

export function alpha(value: number): string {
  return Number(value.toFixed(3)).toString()
}

export function formatHex(state: RgbState): string {
  const rgb = [channel(state.r), channel(state.g), channel(state.b)]
    .map((part) => part.toString(16).padStart(2, '0'))
    .join('')

  if (state.alpha < 1) {
    return `#${rgb}${channel(state.alpha).toString(16).padStart(2, '0')}`
  }

  return `#${rgb}`
}

export function formatRgba(state: RgbState): string {
  const channels = `${channel(state.r)} ${channel(state.g)} ${channel(state.b)}`

  if (state.alpha < 1) {
    return `rgb(${channels} / ${alpha(state.alpha)})`
  }

  return `rgb(${channels})`
}

export function formatHsl(color: HslLike, alphaValue: number): string {
  const hue = Math.round(color.h ?? 0)
  const saturation = Math.round((color.s ?? 0) * 100)
  const lightness = Math.round((color.l ?? 0) * 100)

  if (alphaValue < 1) {
    return `hsl(${hue} ${saturation}% ${lightness}% / ${alpha(alphaValue)})`
  }

  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

export function formatHsv(color: HsvLike, alphaValue: number): string {
  const hue = Math.round(color.h ?? 0)
  const saturation = Math.round((color.s ?? 0) * 100)
  const value = Math.round((color.v ?? 0) * 100)

  if (alphaValue < 1) {
    return `hsv(${hue} ${saturation}% ${value}% / ${alpha(alphaValue)})`
  }

  return `hsv(${hue} ${saturation}% ${value}%)`
}

export function formatOklch(color: OklchLike, alphaValue: number): string {
  const lightness = Number((color.l ?? 0).toFixed(4))
  const chroma = Number((color.c ?? 0).toFixed(4))
  const hue = Math.round(color.h ?? 0)

  if (alphaValue < 1) {
    return `oklch(${lightness} ${chroma} ${hue} / ${alpha(alphaValue)})`
  }

  return `oklch(${lightness} ${chroma} ${hue})`
}

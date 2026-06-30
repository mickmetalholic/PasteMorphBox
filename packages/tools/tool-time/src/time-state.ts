import type { TimeState } from './types'

const plausibleMin = Date.UTC(1970, 0, 1)
const plausibleMax = Date.UTC(2100, 0, 1)

export function detectNumericTimestamp(input: string) {
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

export function parseEditedTime(fieldId: string, value: string): number | null {
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

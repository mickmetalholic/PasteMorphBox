import { toCsv } from './format'
import { entityLabels, entityPatterns } from './patterns'
import type { EntityKey, ExtractState } from './types'

export function buildExtractState(input: string): ExtractState | null {
  const raw = input.trim()

  if (!raw) {
    return null
  }

  const groups = (
    [
      ['emails', extract(raw, entityPatterns.emails)],
      ['urls', extract(raw, entityPatterns.urls)],
      ['phones', extractPhones(raw)],
      ['dates', extract(raw, entityPatterns.dates)],
      ['money', extract(raw, entityPatterns.money)],
      ['ips', extract(raw, entityPatterns.ips)],
      ['hashtags', extract(raw, entityPatterns.hashtags)],
      ['mentions', extract(raw, entityPatterns.mentions)],
      ['domains', extract(raw, entityPatterns.domains).filter((value) => !raw.includes(`@${value}`))],
      ['numbers', extract(raw, entityPatterns.numbers)],
    ] as Array<[EntityKey, string[]]>
  )
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => ({
      key,
      label: entityLabels[key],
      values,
    }))

  const total = groups.reduce((sum, group) => sum + group.values.length, 0)

  if (total === 0) {
    return null
  }

  return {
    raw,
    groups,
    csv: toCsv(groups),
    total,
  }
}

export function extractConfidence(state: ExtractState): number {
  if (state.total >= 5 || state.groups.length >= 3) {
    return 0.74
  }

  if (state.total >= 2) {
    return 0.64
  }

  return 0.54
}

function extract(input: string, pattern: RegExp): string[] {
  const matches = Array.from(input.matchAll(pattern), ([match]) => trimToken(match))
  return dedupe(matches.filter(Boolean))
}

function extractPhones(input: string): string[] {
  return extract(input, entityPatterns.phones).filter((value) => value.replace(/\D/g, '').length >= 10)
}

function trimToken(value: string): string {
  return value.replace(/^[([{<]+/, '').replace(/[)\].,;:!?}>]+$/, '')
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const value of values) {
    const key = value.toLowerCase()

    if (!seen.has(key)) {
      seen.add(key)
      result.push(value)
    }
  }

  return result
}

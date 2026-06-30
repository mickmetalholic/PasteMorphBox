import type { EntityGroup, EntityKey, ExtractState } from './types'

const entityLabels = {
  emails: 'Emails',
  urls: 'URLs',
  phones: 'Phone-like values',
  dates: 'Dates',
  money: 'Money amounts',
  numbers: 'Numbers',
  domains: 'Domains',
  hashtags: 'Hashtags',
  mentions: 'Mentions',
  ips: 'IP addresses',
} satisfies Record<EntityKey, string>

const patterns: Record<EntityKey, RegExp> = {
  emails: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  urls: /\bhttps?:\/\/[^\s<>"']+/gi,
  phones: /(?:\+?\d[\d\s().-]{7,}\d)/g,
  dates: /\b(?:\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4}|[A-Z][a-z]{2,9}\s+\d{1,2},?\s+\d{4})\b/g,
  money: /(?:[$€£¥]\s?\d[\d,]*(?:\.\d{2})?|\b\d[\d,]*(?:\.\d{2})?\s?(?:USD|EUR|GBP|JPY|CNY)\b)/gi,
  numbers: /\b-?\d+(?:,\d{3})*(?:\.\d+)?\b/g,
  domains: /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi,
  hashtags: /#[\p{L}\p{N}_-]+/gu,
  mentions: /(?<![\w.])@[\p{L}\p{N}_-]+/gu,
  ips: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,
}

export function buildExtractState(input: string): ExtractState | null {
  const raw = input.trim()

  if (!raw) {
    return null
  }

  const groups = (
    [
      ['emails', extract(raw, patterns.emails)],
      ['urls', extract(raw, patterns.urls)],
      ['phones', extractPhones(raw)],
      ['dates', extract(raw, patterns.dates)],
      ['money', extract(raw, patterns.money)],
      ['ips', extract(raw, patterns.ips)],
      ['hashtags', extract(raw, patterns.hashtags)],
      ['mentions', extract(raw, patterns.mentions)],
      ['domains', extract(raw, patterns.domains).filter((value) => !raw.includes(`@${value}`))],
      ['numbers', extract(raw, patterns.numbers)],
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
  return extract(input, patterns.phones).filter((value) => value.replace(/\D/g, '').length >= 10)
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

function toCsv(groups: EntityGroup[]): string {
  const rows = ['type,value']

  for (const group of groups) {
    for (const value of group.values) {
      rows.push(`${csvCell(group.key)},${csvCell(value)}`)
    }
  }

  return rows.join('\n')
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

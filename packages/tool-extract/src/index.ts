import type { ToolField, ToolModule } from '@pastemorphbox/core'

type EntityKey = 'emails' | 'urls' | 'phones' | 'dates' | 'money' | 'numbers' | 'domains' | 'hashtags' | 'mentions' | 'ips'

type EntityGroup = {
  key: EntityKey
  label: string
  values: string[]
}

export type ExtractState = {
  raw: string
  groups: EntityGroup[]
  csv: string
  total: number
}

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

export const extractTool: ToolModule<ExtractState> = {
  id: 'extract',
  name: 'Extract',
  description: 'Extract emails, URLs, dates, money, numbers, and other entities from messy text.',
  category: 'extract',
  tags: ['extract', 'email', 'phone', 'url', 'csv'],
  examples: [
    {
      id: 'customer-details',
      label: 'Customer details',
      description: 'Pull contact details and amounts out of pasted notes.',
      source: 'Mika Chen <mika@example.com> paid $1,240.50 on 2026-06-29. Call +1 (415) 555-0199. Ref #vip',
      suggestWhenNoMatch: true,
      tags: ['contact'],
    },
    {
      id: 'campaign-links',
      label: 'Links and tags',
      description: 'Extract links, domains, mentions, and hashtags.',
      source: 'Launch notes: https://example.com/campaign?q=summer @ops #launch from app.example.com',
      tags: ['url'],
    },
  ],
  detect(input) {
    const state = buildExtractState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: 'Extracted entities',
        subtitle: `Found ${state.total} value${state.total === 1 ? '' : 's'} across ${state.groups.length} group${state.groups.length === 1 ? '' : 's'}`,
        confidence: extractConfidence(state),
        state,
        source: input,
      },
    ]
  },
  getFields(state) {
    const fields: ToolField[] = [
      {
        id: 'summary',
        label: 'Summary',
        value: `${state.total} extracted value${state.total === 1 ? '' : 's'} across ${state.groups.length} group${state.groups.length === 1 ? '' : 's'}`,
      },
    ]

    for (const group of state.groups) {
      fields.push({
        id: group.key,
        label: group.label,
        value: group.values.join('\n'),
        monospace: true,
        wide: true,
      })
    }

    fields.push({
      id: 'csv',
      label: 'CSV',
      value: state.csv,
      monospace: true,
      wide: true,
    })

    return fields
  },
  serializePrimary(state) {
    return state.csv
  },
}

function buildExtractState(input: string): ExtractState | null {
  const raw = input.trim()

  if (!raw) {
    return null
  }

  const groups = (
    [
      ['emails', extract(raw, /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi)],
      ['urls', extract(raw, /\bhttps?:\/\/[^\s<>"']+/gi)],
      ['phones', extractPhones(raw)],
      ['dates', extract(raw, /\b(?:\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4}|[A-Z][a-z]{2,9}\s+\d{1,2},?\s+\d{4})\b/g)],
      ['money', extract(raw, /(?:[$€£¥]\s?\d[\d,]*(?:\.\d{2})?|\b\d[\d,]*(?:\.\d{2})?\s?(?:USD|EUR|GBP|JPY|CNY)\b)/gi)],
      ['ips', extract(raw, /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g)],
      ['hashtags', extract(raw, /#[\p{L}\p{N}_-]+/gu)],
      ['mentions', extract(raw, /(?<![\w.])@[\p{L}\p{N}_-]+/gu)],
      ['domains', extract(raw, /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi).filter((value) => !raw.includes(`@${value}`))],
      ['numbers', extract(raw, /\b-?\d+(?:,\d{3})*(?:\.\d+)?\b/g)],
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

function extract(input: string, pattern: RegExp): string[] {
  const matches = Array.from(input.matchAll(pattern), ([match]) => trimToken(match))
  return dedupe(matches.filter(Boolean))
}

function extractPhones(input: string): string[] {
  return extract(input, /(?:\+?\d[\d\s().-]{7,}\d)/g).filter((value) => value.replace(/\D/g, '').length >= 10)
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

function extractConfidence(state: ExtractState): number {
  if (state.total >= 5 || state.groups.length >= 3) {
    return 0.74
  }

  if (state.total >= 2) {
    return 0.64
  }

  return 0.54
}

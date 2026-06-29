import type { ToolField, ToolModule } from '@pastemorphbox/core'

type TableKind = 'csv' | 'tsv' | 'pipe' | 'markdown' | 'list'

export type TableState = {
  raw: string
  kind: TableKind
  rows: string[][]
  markdown: string
  csv: string
  tsv: string
  numberedList: string
  bulletList: string
}

export const tableTool: ToolModule<TableState> = {
  id: 'table',
  name: 'Table',
  description: 'Convert CSV, TSV, Markdown tables, and multi-line lists.',
  category: 'table',
  tags: ['table', 'csv', 'tsv', 'markdown', 'list'],
  examples: [
    {
      id: 'csv-rows',
      label: 'CSV rows',
      description: 'Convert CSV rows into Markdown, TSV, and lists.',
      source: 'name,role\nMika,Admin\nJon,Support',
      suggestWhenNoMatch: true,
      tags: ['csv'],
    },
    {
      id: 'markdown-table',
      label: 'Markdown table',
      description: 'Normalize a Markdown table into CSV and TSV.',
      source: '| Name | Qty |\n| --- | ---: |\n| Apples | 4 |\n| Pears | 6 |',
      tags: ['markdown'],
    },
  ],
  detect(input) {
    const state = buildTableState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: state.kind === 'list' ? 'List conversion' : 'Table conversion',
        subtitle: state.kind === 'list' ? 'Detected multi-line list' : `Detected ${state.kind.toUpperCase()} rows`,
        confidence: tableConfidence(state),
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
        value: `${state.rows.length} row${state.rows.length === 1 ? '' : 's'} x ${columnCount(state.rows)} column${columnCount(state.rows) === 1 ? '' : 's'}`,
      },
      {
        id: 'markdown',
        label: 'Markdown table',
        value: state.markdown,
        monospace: true,
        wide: true,
      },
      {
        id: 'csv',
        label: 'CSV',
        value: state.csv,
        monospace: true,
        wide: true,
      },
      {
        id: 'tsv',
        label: 'TSV',
        value: state.tsv,
        monospace: true,
        wide: true,
      },
      {
        id: 'numbered-list',
        label: 'Numbered list',
        value: state.numberedList,
        monospace: true,
        wide: true,
      },
      {
        id: 'bullet-list',
        label: 'Bullet list',
        value: state.bulletList,
        monospace: true,
        wide: true,
      },
    ]

    return fields
  },
  serializePrimary(state) {
    return state.markdown
  },
}

function buildTableState(input: string): TableState | null {
  const raw = input.trim()

  if (!raw) {
    return null
  }

  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    return null
  }

  const parsed = parseRows(lines)

  if (!parsed) {
    return null
  }

  const rows = normalizeRows(parsed.rows)

  return {
    raw,
    kind: parsed.kind,
    rows,
    markdown: toMarkdown(rows),
    csv: rows.map((row) => row.map(csvCell).join(',')).join('\n'),
    tsv: rows.map((row) => row.join('\t')).join('\n'),
    numberedList: rows.map((row, index) => `${index + 1}. ${rowLabel(row)}`).join('\n'),
    bulletList: rows.map((row) => `- ${rowLabel(row)}`).join('\n'),
  }
}

function parseRows(lines: string[]): { kind: TableKind; rows: string[][] } | null {
  if (lines.every((line) => line.includes('|'))) {
    const rows = lines
      .filter((line) => !/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line))
      .map((line) =>
        line
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim()),
      )

    return { kind: lines.some((line) => /-{3,}/.test(line)) ? 'markdown' : 'pipe', rows }
  }

  if (lines.every((line) => line.includes('\t'))) {
    return { kind: 'tsv', rows: lines.map((line) => line.split('\t').map((cell) => cell.trim())) }
  }

  if (lines.every((line) => line.includes(','))) {
    return { kind: 'csv', rows: lines.map(parseCsvLine) }
  }

  return { kind: 'list', rows: lines.map((line) => [line]) }
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = []
  let current = ''
  let quoted = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const next = line[index + 1]

    if (character === '"' && quoted && next === '"') {
      current += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === ',' && !quoted) {
      cells.push(current.trim())
      current = ''
    } else {
      current += character
    }
  }

  cells.push(current.trim())
  return cells
}

function normalizeRows(rows: string[][]): string[][] {
  const width = columnCount(rows)
  return rows.map((row) => Array.from({ length: width }, (_, index) => row[index] ?? ''))
}

function columnCount(rows: string[][]): number {
  return Math.max(...rows.map((row) => row.length), 1)
}

function toMarkdown(rows: string[][]): string {
  const width = columnCount(rows)
  const header = width === 1 ? ['Value'] : rows[0] ?? []
  const body = width === 1 ? rows : rows.slice(1)
  const separator = Array.from({ length: width }, () => '---')
  const tableRows = [header, separator, ...body]

  return tableRows.map((row) => `| ${row.map(escapeMarkdownCell).join(' | ')} |`).join('\n')
}

function escapeMarkdownCell(value: string): string {
  return value.replace(/\|/g, '\\|')
}

function csvCell(value: string): string {
  if (!/[",\n\r]/.test(value)) {
    return value
  }

  return `"${value.replace(/"/g, '""')}"`
}

function rowLabel(row: string[]): string {
  return row.filter(Boolean).join(' - ')
}

function tableConfidence(state: TableState): number {
  if (state.kind === 'list') {
    return 0.5
  }

  if (columnCount(state.rows) >= 2 && state.rows.length >= 2) {
    return 0.72
  }

  return 0.58
}

import type { TableKind, TableState } from './types'

export function buildTableState(input: string): TableState | null {
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

export function columnCount(rows: string[][]): number {
  return Math.max(...rows.map((row) => row.length), 1)
}

export function tableConfidence(state: TableState): number {
  if (state.kind === 'list') {
    return 0.5
  }

  if (columnCount(state.rows) >= 2 && state.rows.length >= 2) {
    return 0.72
  }

  return 0.58
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

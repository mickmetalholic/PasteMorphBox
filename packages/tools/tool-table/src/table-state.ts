import { columnCount, normalizeRows, toBulletList, toCsv, toMarkdown, toNumberedList, toTsv } from './format'
import { parseRows } from './parse'
import type { TableState } from './types'

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
    csv: toCsv(rows),
    tsv: toTsv(rows),
    numberedList: toNumberedList(rows),
    bulletList: toBulletList(rows),
  }
}

export { columnCount } from './format'

export function tableConfidence(state: TableState): number {
  if (state.kind === 'list') {
    return 0.5
  }

  if (columnCount(state.rows) >= 2 && state.rows.length >= 2) {
    return 0.72
  }

  return 0.58
}

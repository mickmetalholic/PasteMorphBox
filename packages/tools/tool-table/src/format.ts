export function normalizeRows(rows: string[][]): string[][] {
  const width = columnCount(rows)
  return rows.map((row) => Array.from({ length: width }, (_, index) => row[index] ?? ''))
}

export function columnCount(rows: string[][]): number {
  return Math.max(...rows.map((row) => row.length), 1)
}

export function toMarkdown(rows: string[][]): string {
  const width = columnCount(rows)
  const header = width === 1 ? ['Value'] : rows[0] ?? []
  const body = width === 1 ? rows : rows.slice(1)
  const separator = Array.from({ length: width }, () => '---')
  const tableRows = [header, separator, ...body]

  return tableRows.map((row) => `| ${row.map(escapeMarkdownCell).join(' | ')} |`).join('\n')
}

export function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map(csvCell).join(',')).join('\n')
}

export function toTsv(rows: string[][]): string {
  return rows.map((row) => row.join('\t')).join('\n')
}

export function toNumberedList(rows: string[][]): string {
  return rows.map((row, index) => `${index + 1}. ${rowLabel(row)}`).join('\n')
}

export function toBulletList(rows: string[][]): string {
  return rows.map((row) => `- ${rowLabel(row)}`).join('\n')
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

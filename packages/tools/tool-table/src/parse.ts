import type { TableKind } from './types'

export function parseRows(lines: string[]): { kind: TableKind; rows: string[][] } | null {
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

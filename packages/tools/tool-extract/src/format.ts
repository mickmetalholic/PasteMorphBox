import type { EntityGroup } from './types'

export function toCsv(groups: EntityGroup[]): string {
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

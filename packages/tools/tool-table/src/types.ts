export type TableKind = 'csv' | 'tsv' | 'pipe' | 'markdown' | 'list'

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

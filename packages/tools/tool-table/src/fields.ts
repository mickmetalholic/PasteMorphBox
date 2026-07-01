import type { ToolField } from '@pastemorphbox/core'
import { columnCount } from './table-state'
import type { TableState } from './types'

export function getTableFields(state: TableState): ToolField[] {
  return [
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
}

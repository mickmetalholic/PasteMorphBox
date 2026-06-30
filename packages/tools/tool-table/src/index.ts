import type { ToolField, ToolModule } from '@pastemorphbox/core'
import { buildTableState, columnCount, tableConfidence } from './table-state'
import type { TableState } from './types'

export type { TableState } from './types'

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

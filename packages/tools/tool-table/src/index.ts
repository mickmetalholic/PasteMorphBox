import type { ToolModule } from '@pastemorphbox/core'
import { getTableFields } from './fields'
import { buildTableState, tableConfidence } from './table-state'
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
  getFields: getTableFields,
  serializePrimary(state) {
    return state.markdown
  },
}

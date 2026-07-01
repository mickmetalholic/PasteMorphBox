import type { ToolModule } from '@pastemorphbox/core'
import type { TableState } from './types'

export const tableMetadata = {
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
} satisfies Pick<ToolModule<TableState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

import type { ToolModule } from '@pastemorphbox/core'
import { buildExtractState, extractConfidence } from './extract-state'
import { getExtractFields } from './fields'
import type { ExtractState } from './types'

export type { ExtractState } from './types'

export const extractTool: ToolModule<ExtractState> = {
  id: 'extract',
  name: 'Extract',
  description: 'Extract emails, URLs, dates, money, numbers, and other entities from messy text.',
  category: 'extract',
  tags: ['extract', 'email', 'phone', 'url', 'csv'],
  examples: [
    {
      id: 'customer-details',
      label: 'Customer details',
      description: 'Pull contact details and amounts out of pasted notes.',
      source: 'Mika Chen <mika@example.com> paid $1,240.50 on 2026-06-29. Call +1 (415) 555-0199. Ref #vip',
      suggestWhenNoMatch: true,
      tags: ['contact'],
    },
    {
      id: 'campaign-links',
      label: 'Links and tags',
      description: 'Extract links, domains, mentions, and hashtags.',
      source: 'Launch notes: https://example.com/campaign?q=summer @ops #launch from app.example.com',
      tags: ['url'],
    },
  ],
  detect(input) {
    const state = buildExtractState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: 'Extracted entities',
        subtitle: `Found ${state.total} value${state.total === 1 ? '' : 's'} across ${state.groups.length} group${state.groups.length === 1 ? '' : 's'}`,
        confidence: extractConfidence(state),
        state,
        source: input,
      },
    ]
  },
  getFields: getExtractFields,
  serializePrimary(state) {
    return state.csv
  },
}

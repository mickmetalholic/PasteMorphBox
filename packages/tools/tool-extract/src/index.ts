import type { ToolModule } from '@pastemorphbox/core'
import { buildExtractState, extractConfidence } from './extract-state'
import { getExtractFields } from './fields'
import { extractMetadata } from './metadata'
import type { ExtractState } from './types'

export type { ExtractState } from './types'

export const extractTool: ToolModule<ExtractState> = {
  ...extractMetadata,
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

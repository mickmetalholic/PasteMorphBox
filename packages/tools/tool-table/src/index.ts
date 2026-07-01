import type { ToolModule } from '@pastemorphbox/core'
import { getTableFields } from './fields'
import { tableMetadata } from './metadata'
import { buildTableState, tableConfidence } from './table-state'
import type { TableState } from './types'

export type { TableState } from './types'

export const tableTool: ToolModule<TableState> = {
  ...tableMetadata,
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

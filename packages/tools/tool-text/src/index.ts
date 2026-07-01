import type { ToolModule } from '@pastemorphbox/core'
import { getTextFields } from './fields'
import { textMetadata } from './metadata'
import { buildTextState, textConfidence } from './text-state'
import type { TextState } from './types'

export type { TextState } from './types'

export const textTool: ToolModule<TextState> = {
  ...textMetadata,
  detect(input) {
    const state = buildTextState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: 'Text cleanup',
        subtitle: state.stats.lines > 1 ? 'Detected multi-line text' : 'Detected plain text',
        confidence: textConfidence(state),
        state,
        source: input,
      },
    ]
  },
  getFields: getTextFields,
  serializePrimary(state) {
    return state.removedEmptyLines
  },
}

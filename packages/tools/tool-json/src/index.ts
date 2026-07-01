import type { ToolModule } from '@pastemorphbox/core'
import { getJsonFields } from './fields'
import { looksLikeJson, parseJson } from './json-state'
import { jsonMetadata } from './metadata'
import type { JsonState } from './types'

export type { JsonState } from './types'

export const jsonTool: ToolModule<JsonState> = {
  ...jsonMetadata,
  detect(input) {
    if (!looksLikeJson(input)) {
      return []
    }

    const state = parseJson(input)

    return [
      {
        title: state.valid ? 'JSON formatting' : 'JSON validation',
        subtitle: state.valid ? 'Parsed as valid JSON' : 'Looks like JSON but has a syntax issue',
        confidence: state.valid ? 0.92 : 0.58,
        state,
        source: input,
      },
    ]
  },
  getFields: getJsonFields,
  serializePrimary(state) {
    return state.valid ? state.formatted : state.raw
  },
}

import type { ToolModule } from '@pastemorphbox/core'
import { getUrlFields } from './fields'
import { urlMetadata } from './metadata'
import { buildUrlState, confidence, hasEscapes, looksLikeUrlWork } from './url-state'
import type { UrlState } from './types'

export type { UrlState } from './types'
export { decodePercentText, decodeUrlParameterValue } from './codec'
export { extractUrlParamValues } from './parse'

export const urlTool: ToolModule<UrlState> = {
  ...urlMetadata,
  detect(input) {
    if (!looksLikeUrlWork(input)) {
      return []
    }

    return [
      {
        title: 'URL conversion',
        subtitle: hasEscapes(input) ? 'Detected percent-encoded text' : 'Detected URL-like text',
        confidence: confidence(input),
        state: buildUrlState(input),
        source: input,
      },
    ]
  },
  getFields: getUrlFields,
  serializePrimary(state) {
    return state.decoded
  },
}

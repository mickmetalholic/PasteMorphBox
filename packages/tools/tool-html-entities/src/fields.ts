import type { ToolField } from '@pastemorphbox/core'
import type { HtmlEntitiesState } from './types'

export function getHtmlEntitiesFields(state: HtmlEntitiesState): ToolField[] {
  return [
    { id: 'decoded', label: 'Decoded text', value: state.decoded, wide: true },
    { id: 'encoded', label: 'Encoded entities', value: state.encoded, wide: true },
  ]
}

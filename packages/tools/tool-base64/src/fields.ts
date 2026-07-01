import type { ToolField } from '@pastemorphbox/core'
import type { Base64State } from './types'

export function getBase64Fields(state: Base64State): ToolField[] {
  return [
    {
      id: 'decoded',
      label: 'Decoded text',
      value: state.decoded,
      wide: true,
      monospace: true,
    },
    {
      id: 'encoded',
      label: state.kind === 'base64' ? 'Encoded Base64' : 'Normalized Base64URL',
      value: state.encoded,
      wide: true,
      monospace: true,
    },
  ]
}

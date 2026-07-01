import type { ToolField } from '@pastemorphbox/core'
import type { JwtState } from './types'

export function getJwtFields(state: JwtState): ToolField[] {
  return [
    { id: 'header', label: 'Header JSON', value: state.header, monospace: true, wide: true },
    { id: 'payload', label: 'Payload JSON', value: state.payload, monospace: true, wide: true },
    { id: 'signature', label: 'Signature', value: state.signature, monospace: true, wide: true },
  ]
}

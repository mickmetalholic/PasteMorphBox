import type { ToolField } from '@pastemorphbox/core'
import type { UuidState } from './types'

export function getUuidFields(state: UuidState): ToolField[] {
  return [
    { id: 'version', label: 'Version', value: state.version },
    { id: 'normalized', label: 'Normalized UUID', value: state.normalized, monospace: true, wide: true },
  ]
}

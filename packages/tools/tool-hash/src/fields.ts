import type { ToolField } from '@pastemorphbox/core'
import type { HashState } from './types'

export function getHashFields(state: HashState): ToolField[] {
  return [
    { id: 'hash-kind', label: 'Detected hash shape', value: state.hashKind },
    { id: 'normalized', label: 'Normalized value', value: state.normalized, monospace: true, wide: true },
  ]
}

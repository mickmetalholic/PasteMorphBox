import type { ToolField } from '@pastemorphbox/core'
import type { UrlState } from './types'

export function getUrlFields(state: UrlState): ToolField[] {
  const fields: ToolField[] = [
    {
      id: 'decoded',
      label: 'Decoded',
      value: state.decoded,
      wide: true,
    },
    {
      id: 'encoded',
      label: 'Encoded',
      value: state.encoded,
      wide: true,
      monospace: true,
    },
  ]

  if (!state.url) {
    return fields
  }

  fields.push({ id: 'origin', label: 'Origin', value: `${state.url.protocol}//${state.url.host}` }, { id: 'path', label: 'Path', value: state.url.pathname || '/' })

  if (state.url.params) {
    fields.push({
      id: 'params',
      label: 'Query params',
      value: state.url.params,
      wide: true,
      monospace: true,
    })
  }

  return fields
}

import type { ToolField, ToolModule } from '@pastemorphbox/core'
import { buildUrlState, confidence, hasEscapes, looksLikeUrlWork } from './url-state'
import type { UrlState } from './types'

export type { UrlState } from './types'

export const urlTool: ToolModule<UrlState> = {
  id: 'url',
  name: 'URL',
  description: 'Encode, decode, and inspect URLs.',
  category: 'developer',
  tags: ['url', 'decode', 'query'],
  examples: [
    {
      id: 'url-decode',
      label: 'URL decode',
      description: 'Decode escaped URLs and inspect URL parts.',
      source: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dpaste%2520tools%26ref%3Ddemo',
      suggestWhenNoMatch: true,
      tags: ['decode'],
    },
    {
      id: 'url-parts',
      label: 'URL parts',
      description: 'Break down a full URL into origin, path, and query params.',
      source: 'https://example.com/orders?id=42&status=ready#details',
      tags: ['query'],
    },
  ],
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
  getFields(state) {
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

    if (state.url) {
      fields.push(
        { id: 'origin', label: 'Origin', value: `${state.url.protocol}//${state.url.host}` },
        { id: 'path', label: 'Path', value: state.url.pathname || '/' },
      )

      if (state.url.params) {
        fields.push({
          id: 'params',
          label: 'Query params',
          value: state.url.params,
          wide: true,
          monospace: true,
        })
      }
    }

    return fields
  },
  serializePrimary(state) {
    return state.decoded
  },
}

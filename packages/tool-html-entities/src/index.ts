import type { ToolModule } from '@pastemorphbox/core'

export type HtmlEntitiesState = {
  raw: string
  decoded: string
  encoded: string
}

export const htmlEntitiesTool: ToolModule<HtmlEntitiesState> = {
  id: 'html-entities',
  name: 'HTML entities',
  description: 'Decode and encode common HTML entity text.',
  category: 'developer',
  tags: ['html', 'entities', 'escape'],
  examples: [
    {
      id: 'html-entities',
      label: 'HTML entities',
      description: 'Decode and encode common HTML entity text.',
      source: 'Tom &amp; Jerry &lt;3',
      tags: ['html'],
    },
  ],
  detect(input) {
    const source = input.trim()
    const hasEntity = /&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/i.test(source)
    const hasRawHtmlCharacters = /[<>&"]/.test(source)

    if (!hasEntity && !hasRawHtmlCharacters) {
      return []
    }

    return [
      {
        title: 'HTML entity conversion',
        subtitle: hasEntity ? 'Detected HTML entity text' : 'Detected text that can be entity-encoded',
        confidence: hasEntity ? 0.72 : 0.52,
        state: {
          raw: source,
          decoded: decodeHtmlEntities(source),
          encoded: encodeHtmlEntities(source),
        },
        source,
      },
    ]
  },
  getFields(state) {
    return [
      { id: 'decoded', label: 'Decoded text', value: state.decoded, wide: true },
      { id: 'encoded', label: 'Encoded entities', value: state.encoded, wide: true },
    ]
  },
  serializePrimary(state) {
    return state.decoded
  },
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (entity) => {
    const lower = entity.toLowerCase()

    if (lower === '&amp;') return '&'
    if (lower === '&lt;') return '<'
    if (lower === '&gt;') return '>'
    if (lower === '&quot;') return '"'
    if (lower === '&apos;') return "'"

    const numeric = lower.match(/^&#(x[0-9a-f]+|\d+);$/)

    if (!numeric) {
      return entity
    }

    const raw = numeric[1] ?? ''
    const codePoint = raw.startsWith('x') ? Number.parseInt(raw.slice(1), 16) : Number.parseInt(raw, 10)

    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity
  })
}

function encodeHtmlEntities(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

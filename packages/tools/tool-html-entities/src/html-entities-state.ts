export function hasHtmlEntity(value: string): boolean {
  return /&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/i.test(value)
}

export function hasRawHtmlCharacters(value: string): boolean {
  return /[<>&"]/.test(value)
}

export function decodeHtmlEntities(value: string): string {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (entity) => decodeHtmlEntity(entity))
}

export function encodeHtmlEntities(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function decodeHtmlEntity(entity: string): string {
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
}

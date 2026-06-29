export type PasteExample = {
  id: string
  group: 'Convert' | 'Inspect' | 'Developer'
  label: string
  description: string
  sample: string
}

export const pasteExamples: PasteExample[] = [
  {
    id: 'json-format',
    group: 'Inspect',
    label: 'JSON object',
    description: 'Format, compact, and summarize structured JSON.',
    sample: '{"user":{"id":123,"name":"Mika"},"roles":["admin","billing"],"active":true}',
  },
  {
    id: 'url-decode',
    group: 'Convert',
    label: 'URL decode',
    description: 'Decode escaped URLs and inspect URL parts.',
    sample: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dpaste%2520tools%26ref%3Ddemo',
  },
  {
    id: 'timestamp',
    group: 'Convert',
    label: 'Timestamp',
    description: 'Read Unix timestamps across local and UTC time.',
    sample: '1700000000',
  },
  {
    id: 'color',
    group: 'Inspect',
    label: 'Color value',
    description: 'Convert color formats and preview the swatch.',
    sample: '#ff6600',
  },
  {
    id: 'base64',
    group: 'Developer',
    label: 'Base64 text',
    description: 'Decode readable Base64 and copy the normalized value.',
    sample: 'SGVsbG8gUGFzdGVNb3JwaEJveA==',
  },
  {
    id: 'plain-url',
    group: 'Developer',
    label: 'URL parts',
    description: 'Break down a full URL into origin, path, and query params.',
    sample: 'https://example.com/orders?id=42&status=ready#details',
  },
]

export const highlightedExampleIds = ['json-format', 'url-decode', 'timestamp', 'color']

export function getHighlightedExamples(): PasteExample[] {
  return highlightedExampleIds.map((id) => findPasteExample(id))
}

export function getExamplesByGroup(): Array<[PasteExample['group'], PasteExample[]]> {
  const groups = new Map<PasteExample['group'], PasteExample[]>()

  for (const example of pasteExamples) {
    groups.set(example.group, [...(groups.get(example.group) ?? []), example])
  }

  return Array.from(groups.entries())
}

export function getNoMatchSuggestions(): PasteExample[] {
  return ['json-format', 'url-decode', 'base64'].map((id) => findPasteExample(id))
}

function findPasteExample(id: string): PasteExample {
  const example = pasteExamples.find((item) => item.id === id)

  if (!example) {
    throw new Error(`Missing paste example: ${id}`)
  }

  return example
}

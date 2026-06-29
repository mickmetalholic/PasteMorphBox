import { runToolDetections, type AnyToolMatch, type AnyToolModule, type ToolCategory, type ToolExample } from '@pastemorphbox/core'
import { base64Tool } from '@pastemorphbox/tool-base64'
import { colorTool } from '@pastemorphbox/tool-color'
import { developerTool } from '@pastemorphbox/tool-developer'
import { extractTool } from '@pastemorphbox/tool-extract'
import { jsonTool } from '@pastemorphbox/tool-json'
import { tableTool } from '@pastemorphbox/tool-table'
import { textTool } from '@pastemorphbox/tool-text'
import { timeTool } from '@pastemorphbox/tool-time'
import { urlTool } from '@pastemorphbox/tool-url'

export const toolModules = [
  timeTool,
  colorTool,
  jsonTool,
  urlTool,
  base64Tool,
  developerTool,
  extractTool,
  tableTool,
  textTool,
] satisfies AnyToolModule[]

export type RegisteredToolExample = ToolExample & {
  toolId: string
  toolName: string
  category: ToolCategory
  toolTags: string[]
}

export type ToolExampleGroup = {
  category: ToolCategory
  label: string
  examples: RegisteredToolExample[]
}

const categoryLabels = {
  clean: 'Clean',
  extract: 'Extract',
  convert: 'Convert',
  inspect: 'Inspect',
  table: 'Tables',
  developer: 'Developer',
} satisfies Record<ToolCategory, string>

const categoryOrder: ToolCategory[] = ['clean', 'extract', 'convert', 'inspect', 'table', 'developer']

type DerivedCandidate = {
  source: string
  label: string
}

export function detectAll(input: string): AnyToolMatch[] {
  const directMatches = runToolDetections(input, toolModules)
  const derivedMatches = deriveCandidates(input).flatMap((candidate, index) =>
    runToolDetections(candidate.source, toolModules).map((match) => ({
      ...match,
      matchId: `derived:${index}:${match.matchId}`,
      title: `${match.title} from ${candidate.label}`,
      subtitle: `${match.subtitle}; derived from ${candidate.label}`,
      confidence: Math.max(0, match.confidence - 0.08),
    })),
  )

  return dedupeMatches([...directMatches, ...derivedMatches]).sort((a, b) => b.confidence - a.confidence)
}

export function getToolModule(toolId: string): AnyToolModule | undefined {
  return toolModules.find((tool) => tool.id === toolId)
}

export function getToolExamples(): RegisteredToolExample[] {
  return toolModules.flatMap((tool) => {
    const category = tool.category ?? 'convert'

    return (tool.examples ?? []).map((example) => ({
      ...example,
      toolId: tool.id,
      toolName: tool.name,
      category,
      toolTags: tool.tags ?? [],
    }))
  })
}

export function getToolExampleGroups(): ToolExampleGroup[] {
  const examples = getToolExamples()

  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      examples: examples.filter((example) => example.category === category),
    }))
    .filter((group) => group.examples.length > 0)
}

export function getNoMatchSuggestions(): RegisteredToolExample[] {
  return getToolExamples().filter((example) => example.suggestWhenNoMatch)
}

function deriveCandidates(input: string): DerivedCandidate[] {
  const source = input.trim()

  if (!source) {
    return []
  }

  const candidates: DerivedCandidate[] = []
  addCandidate(candidates, decodePercent(source), 'percent-decoded input', source)

  for (const value of extractUrlParamValues(source)) {
    addCandidate(candidates, value, 'URL query parameter', source)
    addCandidate(candidates, decodePercent(value), 'decoded URL query parameter', source)
  }

  addCandidate(candidates, decodeBase64(source), 'Base64 decoded input', source)
  addCandidate(candidates, decodeBase64Url(source), 'Base64URL decoded input', source)
  addCandidate(candidates, decodeJwtPayload(source), 'JWT payload', source)

  return candidates
}

function addCandidate(candidates: DerivedCandidate[], value: string | null, label: string, original: string) {
  const source = value?.trim()

  if (!source || source === original || candidates.some((candidate) => candidate.source === source)) {
    return
  }

  candidates.push({ source, label })
}

function decodePercent(source: string): string | null {
  if (!/%[0-9a-f]{2}/i.test(source)) {
    return null
  }

  try {
    return decodeURIComponent(source)
  } catch {
    return null
  }
}

function extractUrlParamValues(source: string): string[] {
  try {
    const url = new URL(/^https?:\/\//i.test(source) ? source : `https://${source}`)
    return Array.from(url.searchParams.values()).filter(Boolean)
  } catch {
    return []
  }
}

function decodeBase64(source: string): string | null {
  const normalized = source.replace(/\s+/g, '')

  if (normalized.length < 8 || normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    return null
  }

  return decodeBase64Alphabet(normalized)
}

function decodeBase64Url(source: string): string | null {
  if (source.includes('.') || source.length < 8 || !/^[A-Za-z0-9_-]+={0,2}$/.test(source)) {
    return null
  }

  const base64 = source.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(source.length / 4) * 4, '=')
  return decodeBase64Alphabet(base64)
}

function decodeJwtPayload(source: string): string | null {
  const parts = source.split('.')

  if (parts.length !== 3 || !parts[1]) {
    return null
  }

  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
  return decodeBase64Alphabet(payload)
}

function decodeBase64Alphabet(source: string): string | null {
  try {
    const binary = atob(source)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    const text = new TextDecoder().decode(bytes)
    return isMostlyPrintable(text) ? text : null
  } catch {
    return null
  }
}

function isMostlyPrintable(value: string): boolean {
  const printable = [...value].filter((character) => {
    const code = character.charCodeAt(0)
    return code > 8 && (code < 14 || code > 31)
  }).length

  return value.length > 0 && printable / value.length > 0.9
}

function dedupeMatches(matches: AnyToolMatch[]): AnyToolMatch[] {
  const seen = new Set<string>()
  const result: AnyToolMatch[] = []

  for (const match of matches) {
    const key = `${match.toolId}:${match.source}`

    if (!seen.has(key)) {
      seen.add(key)
      result.push(match)
    }
  }

  return result
}

import { runToolDetections, type AnyToolMatch, type AnyToolModule, type ToolCategory, type ToolExample } from '@pastemorphbox/core'
import { base64Tool } from '@pastemorphbox/tool-base64'
import { colorTool } from '@pastemorphbox/tool-color'
import { extractTool } from '@pastemorphbox/tool-extract'
import { hashTool } from '@pastemorphbox/tool-hash'
import { htmlEntitiesTool } from '@pastemorphbox/tool-html-entities'
import { jsonTool } from '@pastemorphbox/tool-json'
import { jwtTool } from '@pastemorphbox/tool-jwt'
import { tableTool } from '@pastemorphbox/tool-table'
import { textTool } from '@pastemorphbox/tool-text'
import { timeTool } from '@pastemorphbox/tool-time'
import { urlTool } from '@pastemorphbox/tool-url'
import { uuidTool } from '@pastemorphbox/tool-uuid'

export const toolModules = [
  timeTool,
  colorTool,
  jsonTool,
  urlTool,
  base64Tool,
  jwtTool,
  uuidTool,
  hashTool,
  htmlEntitiesTool,
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
  totalExamples: number
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
const starterExampleKeys = ['json:json-object', 'url:url-parts', 'jwt:jwt', 'extract:customer-details', 'table:csv-rows', 'text:messy-list']
const derivedConfidencePenalty = 0.08
const toolRankAdjustments: Record<string, number> = {
  json: 0.05,
  url: 0.04,
  jwt: 0.04,
  color: 0.04,
  table: 0.03,
  base64: 0.02,
  uuid: 0.02,
  hash: 0.01,
  extract: 0.01,
  time: 0,
  'html-entities': -0.08,
  text: -0.14,
}

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
      confidence: Math.max(0, match.confidence - derivedConfidencePenalty),
    })),
  )

  return rankMatches(dedupeMatches([...directMatches, ...derivedMatches]))
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
  return getToolExamplePreviewGroups(Number.POSITIVE_INFINITY)
}

export function getToolExamplePreviewGroups(limitPerGroup = 3): ToolExampleGroup[] {
  const examples = getToolExamples()

  return categoryOrder
    .map((category) => {
      const categoryExamples = examples.filter((example) => example.category === category)

      return {
        category,
        label: categoryLabels[category],
        examples: categoryExamples.slice(0, limitPerGroup),
        totalExamples: categoryExamples.length,
      }
    })
    .filter((group) => group.examples.length > 0)
}

export function getStarterExamples(): RegisteredToolExample[] {
  const examplesByKey = new Map(getToolExamples().map((example) => [exampleKey(example), example]))

  return starterExampleKeys.flatMap((key) => {
    const example = examplesByKey.get(key)
    return example ? [example] : []
  })
}

export function getNoMatchSuggestions(): RegisteredToolExample[] {
  return getToolExamples()
    .filter((example) => example.suggestWhenNoMatch)
    .slice(0, 6)
}

function exampleKey(example: RegisteredToolExample): string {
  return `${example.toolId}:${example.id}`
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
    addCandidate(candidates, decodeUrlComponentValue(value), 'decoded URL query parameter', source)
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
    return url.search
      .slice(1)
      .split('&')
      .map((part) => part.split('=')[1] ?? '')
      .filter(Boolean)
  } catch {
    return []
  }
}

function decodeUrlComponentValue(source: string): string | null {
  if (!/%[0-9a-f]{2}|\+/i.test(source)) {
    return null
  }

  try {
    return decodeURIComponent(source.replace(/\+/g, '%20'))
  } catch {
    return null
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

function rankMatches(matches: AnyToolMatch[]): AnyToolMatch[] {
  return matches
    .map((match, index) => ({
      match: {
        ...match,
        confidence: rankConfidence(match),
      },
      index,
    }))
    .sort((left, right) => right.match.confidence - left.match.confidence || left.index - right.index)
    .map(({ match }) => match)
}

function rankConfidence(match: AnyToolMatch): number {
  const adjustment = toolRankAdjustments[match.toolId] ?? 0
  return Math.max(0, Math.min(1, match.confidence + adjustment))
}

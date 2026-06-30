import type { ToolCategory, ToolExample } from '@pastemorphbox/core'
import { toolModules } from './modules'

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

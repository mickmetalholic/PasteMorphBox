import { runToolDetections, type AnyToolMatch, type AnyToolModule, type ToolCategory, type ToolExample } from '@pastemorphbox/core'
import { base64Tool } from '@pastemorphbox/tool-base64'
import { colorTool } from '@pastemorphbox/tool-color'
import { extractTool } from '@pastemorphbox/tool-extract'
import { jsonTool } from '@pastemorphbox/tool-json'
import { tableTool } from '@pastemorphbox/tool-table'
import { textTool } from '@pastemorphbox/tool-text'
import { timeTool } from '@pastemorphbox/tool-time'
import { urlTool } from '@pastemorphbox/tool-url'

export const toolModules = [timeTool, colorTool, jsonTool, urlTool, base64Tool, extractTool, tableTool, textTool] satisfies AnyToolModule[]

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

export function detectAll(input: string): AnyToolMatch[] {
  return runToolDetections(input, toolModules)
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

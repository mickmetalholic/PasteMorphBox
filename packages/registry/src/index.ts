import { runToolDetections, type AnyToolMatch, type AnyToolModule } from '@pastemorphbox/core'
import { base64Tool } from '@pastemorphbox/tool-base64'
import { colorTool } from '@pastemorphbox/tool-color'
import { jsonTool } from '@pastemorphbox/tool-json'
import { timeTool } from '@pastemorphbox/tool-time'
import { urlTool } from '@pastemorphbox/tool-url'

export const toolModules = [timeTool, colorTool, jsonTool, urlTool, base64Tool] satisfies AnyToolModule[]

export function detectAll(input: string): AnyToolMatch[] {
  return runToolDetections(input, toolModules)
}

export function getToolModule(toolId: string): AnyToolModule | undefined {
  return toolModules.find((tool) => tool.id === toolId)
}

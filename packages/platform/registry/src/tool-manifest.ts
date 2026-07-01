import type { AnyToolModule } from '@pastemorphbox/core'
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

export type RegisteredToolManifestEntry = {
  module: AnyToolModule
  packageName: string
  rankBias: number
}

export const registeredToolManifest = [
  { module: timeTool, packageName: '@pastemorphbox/tool-time', rankBias: 0 },
  { module: colorTool, packageName: '@pastemorphbox/tool-color', rankBias: 0.04 },
  { module: jsonTool, packageName: '@pastemorphbox/tool-json', rankBias: 0.05 },
  { module: urlTool, packageName: '@pastemorphbox/tool-url', rankBias: 0.04 },
  { module: base64Tool, packageName: '@pastemorphbox/tool-base64', rankBias: 0.02 },
  { module: jwtTool, packageName: '@pastemorphbox/tool-jwt', rankBias: 0.04 },
  { module: uuidTool, packageName: '@pastemorphbox/tool-uuid', rankBias: 0.02 },
  { module: hashTool, packageName: '@pastemorphbox/tool-hash', rankBias: 0.01 },
  { module: htmlEntitiesTool, packageName: '@pastemorphbox/tool-html-entities', rankBias: -0.08 },
  { module: extractTool, packageName: '@pastemorphbox/tool-extract', rankBias: 0.01 },
  { module: tableTool, packageName: '@pastemorphbox/tool-table', rankBias: 0.03 },
  { module: textTool, packageName: '@pastemorphbox/tool-text', rankBias: -0.14 },
] satisfies RegisteredToolManifestEntry[]

export const registeredToolModules = registeredToolManifest.map((entry) => entry.module)
export const registeredToolPackageNames = registeredToolManifest.map((entry) => entry.packageName)

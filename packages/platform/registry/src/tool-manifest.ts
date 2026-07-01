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

export const registeredToolModules = [
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

import type { AnyToolModule } from '@pastemorphbox/core'
import { registeredToolModules } from './tool-manifest'

export const toolModules = registeredToolModules satisfies AnyToolModule[]

export function getToolModule(toolId: string): AnyToolModule | undefined {
  return toolModules.find((tool) => tool.id === toolId)
}

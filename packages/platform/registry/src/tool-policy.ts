import { registeredToolManifest } from './tool-manifest'

export const toolRankBiasById = new Map(registeredToolManifest.map((entry) => [entry.module.id, entry.rankBias]))

export function rankBiasForTool(toolId: string): number {
  return toolRankBiasById.get(toolId) ?? 0
}

export function hasRankPolicy(toolId: string): boolean {
  return toolRankBiasById.has(toolId)
}

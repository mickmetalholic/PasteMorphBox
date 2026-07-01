import { runToolDetections, type AnyToolMatch } from '@pastemorphbox/core'
import { deriveCandidates } from './derived-candidates'
import {
  getNoMatchSuggestions,
  getStarterExamples,
  getToolExampleGroups,
  getToolExamplePreviewGroups,
  getToolExamples,
  type RegisteredToolExample,
  type ToolExampleGroup,
} from './examples'
import { getToolModule, toolModules } from './modules'
import { dedupeMatches, rankMatches } from './ranking'
import { hasRankPolicy, rankBiasForTool } from './tool-policy'
import { registeredToolPackageNames } from './tool-manifest'

const derivedConfidencePenalty = 0.08

export { getNoMatchSuggestions, getStarterExamples, getToolExampleGroups, getToolExamplePreviewGroups, getToolExamples, getToolModule, hasRankPolicy, rankBiasForTool, registeredToolPackageNames, toolModules }
export type { RegisteredToolExample, ToolExampleGroup }

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

import type { AnyToolMatch } from '@pastemorphbox/core'
import { rankBiasForTool } from './tool-policy'

export function dedupeMatches(matches: AnyToolMatch[]): AnyToolMatch[] {
  const seen = new Set<string>()
  const result: AnyToolMatch[] = []

  for (const match of matches) {
    const key = `${match.toolId}:${match.source}:${match.dedupeKey ?? match.matchId}`

    if (!seen.has(key)) {
      seen.add(key)
      result.push(match)
    }
  }

  return result
}

export function rankMatches(matches: AnyToolMatch[]): AnyToolMatch[] {
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
  const adjustment = rankBiasForTool(match.toolId)
  return Math.max(0, Math.min(1, match.confidence + adjustment))
}

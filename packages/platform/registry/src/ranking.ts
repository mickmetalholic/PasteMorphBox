import type { AnyToolMatch } from '@pastemorphbox/core'

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

export function dedupeMatches(matches: AnyToolMatch[]): AnyToolMatch[] {
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
  const adjustment = toolRankAdjustments[match.toolId] ?? 0
  return Math.max(0, Math.min(1, match.confidence + adjustment))
}

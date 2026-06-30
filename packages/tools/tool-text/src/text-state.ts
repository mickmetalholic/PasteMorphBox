import type { TextState } from './types'

export function buildTextState(input: string): TextState | null {
  const trimmed = input.trim()

  if (trimmed.length < 2) {
    return null
  }

  const lines = input.split(/\r?\n/)
  const trimmedLines = lines.map((line) => line.trim())
  const nonEmptyLines = trimmedLines.filter(Boolean)
  const removedEmptyLines = nonEmptyLines.join('\n')
  const normalizedWhitespace = trimmed.replace(/\s+/g, ' ')
  const deduplicatedLines = dedupe(nonEmptyLines).join('\n')
  const sortedLines = [...nonEmptyLines].sort((left, right) => left.localeCompare(right)).join('\n')
  const joinedLines = nonEmptyLines.join(', ')
  const words = trimmed.match(/\S+/g) ?? []

  return {
    raw: input,
    trimmed,
    removedEmptyLines,
    normalizedWhitespace,
    deduplicatedLines,
    sortedLines,
    joinedLines,
    uppercase: trimmed.toUpperCase(),
    lowercase: trimmed.toLowerCase(),
    titleCase: toTitleCase(trimmed),
    stats: {
      characters: input.length,
      charactersNoWhitespace: input.replace(/\s/g, '').length,
      words: words.length,
      lines: lines.length,
      nonEmptyLines: nonEmptyLines.length,
    },
  }
}

export function textConfidence(state: TextState): number {
  if (state.stats.nonEmptyLines >= 3) {
    return 0.48
  }

  if (state.stats.lines > 1 || /[,;]/.test(state.raw)) {
    return 0.42
  }

  return 0.32
}

export function formatStats(state: TextState): string {
  return [
    `Characters: ${state.stats.characters}`,
    `Characters without whitespace: ${state.stats.charactersNoWhitespace}`,
    `Words: ${state.stats.words}`,
    `Lines: ${state.stats.lines}`,
    `Non-empty lines: ${state.stats.nonEmptyLines}`,
  ].join('\n')
}

function dedupe(lines: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line)
      result.push(line)
    }
  }

  return result
}

function toTitleCase(input: string): string {
  return input.toLowerCase().replace(/\b[\p{L}\p{N}]/gu, (character) => character.toUpperCase())
}

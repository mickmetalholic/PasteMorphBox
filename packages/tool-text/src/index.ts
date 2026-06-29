import type { ToolField, ToolModule } from '@pastemorphbox/core'

export type TextState = {
  raw: string
  trimmed: string
  removedEmptyLines: string
  normalizedWhitespace: string
  deduplicatedLines: string
  sortedLines: string
  joinedLines: string
  uppercase: string
  lowercase: string
  titleCase: string
  stats: {
    characters: number
    charactersNoWhitespace: number
    words: number
    lines: number
    nonEmptyLines: number
  }
}

export const textTool: ToolModule<TextState> = {
  id: 'text',
  name: 'Text',
  description: 'Clean whitespace, transform lists, change case, and count text.',
  category: 'clean',
  tags: ['text', 'cleanup', 'list', 'case'],
  examples: [
    {
      id: 'messy-list',
      label: 'Messy list',
      description: 'Trim, dedupe, sort, and join pasted lines.',
      source: '  Alice  \n\nBob\nAlice\n  carol  ',
      suggestWhenNoMatch: true,
      tags: ['list'],
    },
    {
      id: 'case-cleanup',
      label: 'Case cleanup',
      description: 'Create uppercase, lowercase, and title case variants.',
      source: 'quarterly launch CHECKLIST',
      tags: ['case'],
    },
  ],
  detect(input) {
    const state = buildTextState(input)

    if (!state) {
      return []
    }

    return [
      {
        title: 'Text cleanup',
        subtitle: state.stats.lines > 1 ? 'Detected multi-line text' : 'Detected plain text',
        confidence: textConfidence(state),
        state,
        source: input,
      },
    ]
  },
  getFields(state) {
    const fields: ToolField[] = [
      {
        id: 'stats',
        label: 'Counts',
        value: formatStats(state),
        monospace: true,
      },
      {
        id: 'trimmed',
        label: 'Trimmed',
        value: state.trimmed,
        monospace: true,
        wide: true,
      },
      {
        id: 'removed-empty-lines',
        label: 'Removed empty lines',
        value: state.removedEmptyLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'normalized-whitespace',
        label: 'Normalized whitespace',
        value: state.normalizedWhitespace,
        monospace: true,
        wide: true,
      },
      {
        id: 'deduplicated-lines',
        label: 'Deduplicated lines',
        value: state.deduplicatedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'sorted-lines',
        label: 'Sorted lines',
        value: state.sortedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'joined-lines',
        label: 'Joined lines',
        value: state.joinedLines,
        monospace: true,
        wide: true,
      },
      {
        id: 'uppercase',
        label: 'Uppercase',
        value: state.uppercase,
        monospace: true,
        wide: true,
      },
      {
        id: 'lowercase',
        label: 'Lowercase',
        value: state.lowercase,
        monospace: true,
        wide: true,
      },
      {
        id: 'title-case',
        label: 'Title case',
        value: state.titleCase,
        monospace: true,
        wide: true,
      },
    ]

    return fields
  },
  serializePrimary(state) {
    return state.removedEmptyLines
  },
}

function buildTextState(input: string): TextState | null {
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

function textConfidence(state: TextState): number {
  if (state.stats.nonEmptyLines >= 3) {
    return 0.48
  }

  if (state.stats.lines > 1 || /[,;]/.test(state.raw)) {
    return 0.42
  }

  return 0.32
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

function formatStats(state: TextState): string {
  return [
    `Characters: ${state.stats.characters}`,
    `Characters without whitespace: ${state.stats.charactersNoWhitespace}`,
    `Words: ${state.stats.words}`,
    `Lines: ${state.stats.lines}`,
    `Non-empty lines: ${state.stats.nonEmptyLines}`,
  ].join('\n')
}

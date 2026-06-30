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

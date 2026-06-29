import { describe, expect, it } from 'vitest'
import { getExamplesByGroup, getHighlightedExamples, getNoMatchSuggestions, pasteExamples } from './discovery'

describe('paste discovery content', () => {
  it('uses unique example ids with non-empty samples', () => {
    const ids = new Set(pasteExamples.map((example) => example.id))

    expect(ids.size).toBe(pasteExamples.length)
    expect(pasteExamples.every((example) => example.sample.trim().length > 0)).toBe(true)
  })

  it('exposes grouped examples for the examples panel', () => {
    const groups = getExamplesByGroup()

    expect(groups.length).toBeGreaterThan(1)
    expect(groups.flatMap(([, examples]) => examples)).toHaveLength(pasteExamples.length)
  })

  it('keeps highlighted and no-match suggestions backed by real examples', () => {
    const exampleIds = new Set(pasteExamples.map((example) => example.id))
    const suggestedIds = [...getHighlightedExamples(), ...getNoMatchSuggestions()].map((example) => example.id)

    expect(suggestedIds.every((id) => exampleIds.has(id))).toBe(true)
  })
})

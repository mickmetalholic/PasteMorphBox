import { describe, expect, it } from 'vitest'
import { getNoMatchSuggestions, getToolExampleGroups, getToolExamples } from '@pastemorphbox/registry'

describe('paste discovery content', () => {
  it('uses unique example ids with non-empty samples', () => {
    const examples = getToolExamples()
    const ids = new Set(examples.map((example) => `${example.toolId}:${example.id}`))

    expect(ids.size).toBe(examples.length)
    expect(examples.every((example) => example.source.trim().length > 0)).toBe(true)
  })

  it('exposes grouped examples for the examples panel', () => {
    const groups = getToolExampleGroups()

    expect(groups.length).toBeGreaterThan(1)
    expect(groups.flatMap((group) => group.examples)).toHaveLength(getToolExamples().length)
  })

  it('keeps no-match suggestions backed by registered examples', () => {
    const exampleIds = new Set(getToolExamples().map((example) => `${example.toolId}:${example.id}`))
    const suggestedIds = getNoMatchSuggestions().map((example) => `${example.toolId}:${example.id}`)

    expect(suggestedIds.every((id) => exampleIds.has(id))).toBe(true)
  })
})

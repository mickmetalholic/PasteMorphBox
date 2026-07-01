import { describe, expect, it } from 'vitest'
import { detectAll, getNoMatchSuggestions, getStarterExamples, getToolExampleGroups, getToolExamplePreviewGroups, getToolExamples, registeredToolPackageNames } from '@pastemorphbox/registry'
import { registeredToolWorkspacePackages, workspaceTranspilePackages } from '../../workspace-packages'

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

  it('exposes curated starter examples backed by detectable registered examples', () => {
    const exampleIds = new Set(getToolExamples().map((example) => `${example.toolId}:${example.id}`))
    const starterExamples = getStarterExamples()
    const starterIds = new Set(starterExamples.map((example) => `${example.toolId}:${example.id}`))
    const starterCategories = new Set(starterExamples.map((example) => example.category))

    expect(starterExamples.length).toBeGreaterThan(3)
    expect(starterIds.size).toBe(starterExamples.length)
    expect(starterCategories.size).toBeGreaterThan(2)
    expect([...starterIds].every((id) => exampleIds.has(id))).toBe(true)
    expect(starterExamples.every((example) => detectAll(example.source).some((match) => match.toolId === example.toolId))).toBe(true)
  })

  it('exposes compact grouped example previews', () => {
    const groups = getToolExamplePreviewGroups(1)

    expect(groups.length).toBeGreaterThan(1)
    expect(groups.every((group) => group.examples.length <= 1)).toBe(true)
    expect(groups.every((group) => group.totalExamples >= group.examples.length)).toBe(true)
  })

  it('keeps no-match suggestions backed by registered examples', () => {
    const exampleIds = new Set(getToolExamples().map((example) => `${example.toolId}:${example.id}`))
    const suggestedIds = getNoMatchSuggestions().map((example) => `${example.toolId}:${example.id}`)

    expect(suggestedIds.length).toBeLessThanOrEqual(6)
    expect(suggestedIds.every((id) => exampleIds.has(id))).toBe(true)
  })

  it('keeps web transpilation inventory aligned with the registry tool manifest', () => {
    expect(registeredToolWorkspacePackages).toEqual(registeredToolPackageNames)
    expect(workspaceTranspilePackages).toEqual([
      '@pastemorphbox/core',
      '@pastemorphbox/registry',
      ...registeredToolPackageNames,
      '@pastemorphbox/ui',
    ])
  })
})

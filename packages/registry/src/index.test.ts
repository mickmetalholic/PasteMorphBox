import { describe, expect, it } from 'vitest'
import { detectAll, getNoMatchSuggestions, getToolExampleGroups, getToolExamples, getToolModule, toolModules } from './index'

describe('registry', () => {
  it('registers the MVP tool modules in display order', () => {
    expect(toolModules.map((tool) => tool.id)).toEqual(['time', 'color', 'json', 'url', 'base64'])
  })

  it('detects input through the registered modules', () => {
    const [match] = detectAll('{"id":1}')

    expect(match?.toolId).toBe('json')
    expect(match?.confidence).toBeGreaterThan(0.9)
  })

  it('looks up modules by tool id', () => {
    const jsonTool = getToolModule('json')

    expect(jsonTool?.name).toBe('JSON')
    expect(getToolModule('missing')).toBeUndefined()
  })

  it('groups examples from registered tool metadata', () => {
    const groups = getToolExampleGroups()

    expect(groups.length).toBeGreaterThan(1)
    expect(groups.flatMap((group) => group.examples)).toHaveLength(getToolExamples().length)
  })

  it('returns no-match suggestions from example metadata', () => {
    const suggestions = getNoMatchSuggestions()

    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.every((example) => example.suggestWhenNoMatch)).toBe(true)
  })

  it('keeps registered examples detectable by their owning tools', () => {
    for (const tool of toolModules) {
      for (const example of tool.examples ?? []) {
        expect(tool.detect(example.source).length, `${tool.id}:${example.id}`).toBeGreaterThan(0)
      }
    }
  })
})

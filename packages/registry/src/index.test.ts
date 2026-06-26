import { describe, expect, it } from 'vitest'
import { detectAll, getToolModule, toolModules } from './index'

describe('registry', () => {
  it('registers the MVP tool modules in display order', () => {
    expect(toolModules.map((tool) => tool.id)).toEqual(['time', 'color', 'json', 'url', 'base64'])
  })

  it('detects input through the registered modules', () => {
    const [match] = detectAll('{"id":1}')

    expect(match?.toolId).toBe('json')
    expect(match?.confidence).toBeGreaterThan(0.9)
  })

  it('keeps generic Base64 encoding below more specific matches', () => {
    const matches = detectAll('#ff6600')

    expect(matches.map((match) => match.toolId)).toEqual(['color', 'base64'])
    expect(matches[0]?.confidence).toBeGreaterThan(matches[1]?.confidence ?? 0)
  })

  it('looks up modules by tool id', () => {
    const jsonTool = getToolModule('json')

    expect(jsonTool?.name).toBe('JSON')
    expect(getToolModule('missing')).toBeUndefined()
  })
})

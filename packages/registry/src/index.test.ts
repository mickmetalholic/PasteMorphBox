import { describe, expect, it } from 'vitest'
import { detectAll, getNoMatchSuggestions, getToolExampleGroups, getToolExamples, getToolModule, toolModules } from './index'

describe('registry', () => {
  it('registers the MVP tool modules in display order', () => {
    expect(toolModules.map((tool) => tool.id)).toEqual([
      'time',
      'color',
      'json',
      'url',
      'base64',
      'jwt',
      'uuid',
      'hash',
      'html-entities',
      'extract',
      'table',
      'text',
    ])
  })

  it('detects input through the registered modules', () => {
    const [match] = detectAll('{"id":1}')

    expect(match?.toolId).toBe('json')
    expect(match?.confidence).toBeGreaterThan(0.9)
  })

  it('keeps the text tool behind specialized matches', () => {
    const matches = detectAll('{"id":1}')

    expect(matches.map((match) => match.toolId)).toContain('text')
    expect(matches[0]?.toolId).toBe('json')
  })

  it('keeps extraction ahead of generic text cleanup', () => {
    const matches = detectAll('Email mika@example.com about $50')
    const extractIndex = matches.findIndex((match) => match.toolId === 'extract')
    const textIndex = matches.findIndex((match) => match.toolId === 'text')

    expect(extractIndex).toBeGreaterThanOrEqual(0)
    expect(textIndex).toBeGreaterThanOrEqual(0)
    expect(extractIndex).toBeLessThan(textIndex)
  })

  it('keeps table conversion ahead of generic text cleanup', () => {
    const matches = detectAll('name,role\nMika,Admin')
    const tableIndex = matches.findIndex((match) => match.toolId === 'table')
    const textIndex = matches.findIndex((match) => match.toolId === 'text')

    expect(tableIndex).toBeGreaterThanOrEqual(0)
    expect(textIndex).toBeGreaterThanOrEqual(0)
    expect(tableIndex).toBeLessThan(textIndex)
  })

  it('detects split developer utility values', () => {
    const jwtMatches = detectAll('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature')
    const matches = detectAll('550e8400-e29b-41d4-a716-446655440000')
    const hashMatches = detectAll('d41d8cd98f00b204e9800998ecf8427e')
    const htmlMatches = detectAll('Tom &amp; Jerry &lt;3')

    expect(jwtMatches[0]?.toolId).toBe('jwt')
    expect(matches[0]?.toolId).toBe('uuid')
    expect(hashMatches[0]?.toolId).toBe('hash')
    expect(htmlMatches.some((match) => match.toolId === 'html-entities')).toBe(true)
  })

  it('detects JSON from percent-decoded input', () => {
    const matches = detectAll('%7B%22id%22%3A1%7D')
    const jsonMatch = matches.find((match) => match.toolId === 'json')

    expect(jsonMatch?.source).toBe('{"id":1}')
    expect(jsonMatch?.title).toContain('percent-decoded input')
    expect(jsonMatch?.confidence).toBeLessThan(0.92)
  })

  it('keeps specialized derived matches ahead of generic direct matches', () => {
    const matches = detectAll('%7B%22id%22%3A1%7D')
    const jsonIndex = matches.findIndex((match) => match.toolId === 'json')
    const urlIndex = matches.findIndex((match) => match.toolId === 'url')

    expect(jsonIndex).toBeGreaterThanOrEqual(0)
    expect(urlIndex).toBeGreaterThanOrEqual(0)
    expect(jsonIndex).toBeLessThan(urlIndex)
  })

  it('detects JSON from a decoded URL query parameter', () => {
    const matches = detectAll('https://example.com/?payload=%7B%22id%22%3A1%7D')
    const jsonMatch = matches.find((match) => match.toolId === 'json')

    expect(jsonMatch?.source).toBe('{"id":1}')
    expect(jsonMatch?.title).toContain('decoded URL query parameter')
  })

  it('detects JSON from Base64 decoded input', () => {
    const matches = detectAll('eyJpZCI6MX0=')
    const jsonMatch = matches.find((match) => match.toolId === 'json')

    expect(jsonMatch?.source).toBe('{"id":1}')
    expect(jsonMatch?.title).toContain('Base64 decoded input')
  })

  it('detects JSON from Base64URL decoded input', () => {
    const matches = detectAll('eyJpZCI6MX0')
    const jsonMatch = matches.find((match) => match.toolId === 'json')

    expect(jsonMatch?.source).toBe('{"id":1}')
    expect(jsonMatch?.title).toContain('Base64URL decoded input')
  })

  it('detects JSON from a JWT payload', () => {
    const matches = detectAll('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature')
    const jsonMatch = matches.find((match) => match.toolId === 'json')

    expect(jsonMatch?.source).toContain('"name":"Mika"')
    expect(jsonMatch?.title).toContain('JWT payload')
  })

  it('does not duplicate repeated derived sources', () => {
    const matches = detectAll('https://example.com/?a=%7B%22id%22%3A1%7D&b=%7B%22id%22%3A1%7D')
    const jsonMatches = matches.filter((match) => match.toolId === 'json' && match.source === '{"id":1}')

    expect(jsonMatches).toHaveLength(1)
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

  it('keeps registered examples detectable through the full registry', () => {
    for (const example of getToolExamples()) {
      expect(
        detectAll(example.source).some((match) => match.toolId === example.toolId),
        `${example.toolId}:${example.id}`,
      ).toBe(true)
    }
  })
})

import { describe, expect, it } from 'vitest'
import { extractTool } from './index'

describe('extractTool', () => {
  it('does not detect text without supported entities', () => {
    expect(extractTool.detect('plain notes with no structured values')).toEqual([])
  })

  it('extracts contact entities and CSV output', () => {
    const [match] = extractTool.detect('Mika mika@example.com paid $1,240.50 on 2026-06-29. Call +1 (415) 555-0199.')

    if (!match) {
      throw new Error('Expected extraction match')
    }

    const emailGroup = match.state.groups.find((group) => group.key === 'emails')
    const moneyGroup = match.state.groups.find((group) => group.key === 'money')
    const phoneGroup = match.state.groups.find((group) => group.key === 'phones')

    expect(emailGroup?.values).toEqual(['mika@example.com'])
    expect(moneyGroup?.values).toEqual(['$1,240.50'])
    expect(phoneGroup?.values).toEqual(['+1 (415) 555-0199'])
    expect(match.state.csv).toContain('"emails","mika@example.com"')
    expect(extractTool.serializePrimary(match.state)).toBe(match.state.csv)
  })

  it('deduplicates values in first-seen order', () => {
    const [match] = extractTool.detect('a@example.com b@example.com a@example.com')

    if (!match) {
      throw new Error('Expected extraction match')
    }

    expect(match.state.groups.find((group) => group.key === 'emails')?.values).toEqual(['a@example.com', 'b@example.com'])
  })

  it('creates fields for non-empty entity groups', () => {
    const [match] = extractTool.detect('Visit https://example.com/a and tag @ops #launch from 192.168.0.1')

    if (!match) {
      throw new Error('Expected extraction match')
    }

    const fieldIds = extractTool.getFields(match.state).map((field) => field.id)

    expect(fieldIds).toContain('urls')
    expect(fieldIds).toContain('mentions')
    expect(fieldIds).toContain('hashtags')
    expect(fieldIds).toContain('ips')
    expect(fieldIds).toContain('csv')
  })
})

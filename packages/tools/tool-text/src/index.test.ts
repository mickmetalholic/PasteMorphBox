import { describe, expect, it } from 'vitest'
import { textTool } from './index'

describe('textTool', () => {
  it('does not detect empty or one-character input', () => {
    expect(textTool.detect('   ')).toEqual([])
    expect(textTool.detect('x')).toEqual([])
  })

  it('detects plain text as a low-confidence fallback', () => {
    const [match] = textTool.detect('hello world')

    expect(match?.title).toBe('Text cleanup')
    expect(match?.confidence).toBeLessThan(0.5)
    expect(match?.state.stats.words).toBe(2)
  })

  it('cleans duplicate and empty lines', () => {
    const [match] = textTool.detect('  Alice  \n\nBob\nAlice\n  carol  ')

    if (!match) {
      throw new Error('Expected text match')
    }

    expect(match.state.removedEmptyLines).toBe('Alice\nBob\nAlice\ncarol')
    expect(match.state.deduplicatedLines).toBe('Alice\nBob\ncarol')
    expect(match.state.sortedLines).toBe('Alice\nAlice\nBob\ncarol')
    expect(textTool.serializePrimary(match.state)).toBe('Alice\nBob\nAlice\ncarol')
  })

  it('provides case conversion fields', () => {
    const [match] = textTool.detect('quarterly launch CHECKLIST')

    if (!match) {
      throw new Error('Expected text match')
    }

    const fields = textTool.getFields(match.state)

    expect(fields.find((field) => field.id === 'uppercase')?.value).toBe('QUARTERLY LAUNCH CHECKLIST')
    expect(fields.find((field) => field.id === 'lowercase')?.value).toBe('quarterly launch checklist')
    expect(fields.find((field) => field.id === 'title-case')?.value).toBe('Quarterly Launch Checklist')
  })
})

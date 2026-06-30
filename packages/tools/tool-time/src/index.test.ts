import { describe, expect, it } from 'vitest'
import { timeTool } from './index'

describe('timeTool', () => {
  it('detects second timestamps', () => {
    const [match] = timeTool.detect('1700000000')

    expect(match?.state.epochMs).toBe(1700000000000)
    expect(match?.confidence).toBeGreaterThan(0.9)
    expect(timeTool.getFields(match!.state).find((field) => field.id === 'iso')?.value).toBe('2023-11-14T22:13:20.000Z')
    expect(timeTool.serializePrimary(match!.state)).toBe('1700000000')
  })

  it('detects millisecond timestamps', () => {
    const [match] = timeTool.detect('1700000000123')

    expect(match?.state.sourceKind).toBe('milliseconds')
    expect(match?.state.epochMs).toBe(1700000000123)
    expect(match?.confidence).toBeGreaterThan(0.9)
  })

  it('detects ISO date input', () => {
    const [match] = timeTool.detect('2026-06-29T12:00:00Z')

    expect(match?.state.sourceKind).toBe('date')
    expect(match?.state.epochMs).toBe(Date.UTC(2026, 5, 29, 12, 0, 0))
  })

  it('updates linked fields from milliseconds', () => {
    const [match] = timeTool.detect('1700000000')
    const result = timeTool.applyEdit?.(match!.state, 'milliseconds', '1700000001000')

    expect(result?.state.epochMs).toBe(1700000001000)
  })

  it('keeps state and reports errors for invalid edits', () => {
    const [match] = timeTool.detect('1700000000')
    const result = timeTool.applyEdit?.(match!.state, 'iso', 'not a date')

    expect(result?.state).toBe(match!.state)
    expect(result?.error).toBe('Enter a valid timestamp or date.')
  })

  it('ignores implausible timestamps and plain text', () => {
    expect(timeTool.detect('9999999999999999')).toEqual([])
    expect(timeTool.detect('release notes')).toEqual([])
  })
})

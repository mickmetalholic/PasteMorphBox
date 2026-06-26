import { describe, expect, it } from 'vitest'
import { timeTool } from './index'

describe('timeTool', () => {
  it('detects second timestamps', () => {
    const [match] = timeTool.detect('1700000000')

    expect(match?.state.epochMs).toBe(1700000000000)
    expect(match?.confidence).toBeGreaterThan(0.9)
  })

  it('updates linked fields from milliseconds', () => {
    const [match] = timeTool.detect('1700000000')
    const result = timeTool.applyEdit?.(match!.state, 'milliseconds', '1700000001000')

    expect(result?.state.epochMs).toBe(1700000001000)
  })
})

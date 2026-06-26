import { describe, expect, it } from 'vitest'
import { jsonTool } from './index'

describe('jsonTool', () => {
  it('formats valid JSON', () => {
    const [match] = jsonTool.detect('{"id":1}')

    expect(match?.state.valid).toBe(true)
    expect(match?.state.formatted).toContain('"id": 1')
  })

  it('reports invalid JSON-like input', () => {
    const [match] = jsonTool.detect('{"id":}')

    expect(match?.state.valid).toBe(false)
  })
})

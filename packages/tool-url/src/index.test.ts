import { describe, expect, it } from 'vitest'
import { urlTool } from './index'

describe('urlTool', () => {
  it('decodes percent-encoded input', () => {
    const [match] = urlTool.detect('https%3A%2F%2Fexample.com%2Fa%3Fx%3D1')

    expect(match?.state.decoded).toBe('https://example.com/a?x=1')
  })
})

import { describe, expect, it } from 'vitest'
import { getRequiredToolField } from '@pastemorphbox/core'
import { urlTool } from './index'

describe('urlTool', () => {
  it('decodes percent-encoded input', () => {
    const [match] = urlTool.detect('https%3A%2F%2Fexample.com%2Fa%3Fx%3D1')

    expect(match?.state.decoded).toBe('https://example.com/a?x=1')
    expect(urlTool.serializePrimary(match!.state)).toBe('https://example.com/a?x=1')
  })

  it('detects URL-like text and exposes query fields', () => {
    const [match] = urlTool.detect('example.com/orders?id=42&status=ready#details')

    if (!match) {
      throw new Error('Expected URL match')
    }

    const fields = urlTool.getFields(match.state)

    expect(match.confidence).toBeLessThan(0.8)
    expect(getRequiredToolField(fields, 'origin').value).toBe('https://example.com')
    expect(getRequiredToolField(fields, 'path').value).toBe('/orders')
    expect(getRequiredToolField(fields, 'params').value).toBe('id: 42\nstatus: ready')
  })

  it('keeps malformed percent escapes stable', () => {
    const [match] = urlTool.detect('https%3A%2F%2Fexample.com%2Fbad%ZZ')

    if (!match) {
      throw new Error('Expected URL match')
    }

    expect(match.state.decoded).toBe('https%3A%2F%2Fexample.com%2Fbad%ZZ')
    expect(urlTool.serializePrimary(match.state)).toBe(match.state.decoded)
  })

  it('ignores plain text without URL work', () => {
    expect(urlTool.detect('just some notes')).toEqual([])
  })
})

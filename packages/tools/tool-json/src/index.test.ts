import { describe, expect, it } from 'vitest'
import { getRequiredToolField } from '@pastemorphbox/core'
import { jsonTool } from './index'

describe('jsonTool', () => {
  it('formats valid JSON', () => {
    const [match] = jsonTool.detect('{"id":1}')

    expect(match?.state.valid).toBe(true)
    expect(match?.state.formatted).toContain('"id": 1')
    expect(match?.state.compact).toBe('{"id":1}')
    expect(jsonTool.serializePrimary(match!.state)).toBe('{\n  "id": 1\n}')
  })

  it('reports invalid JSON-like input', () => {
    const [match] = jsonTool.detect('{"id":}')

    expect(match?.state.valid).toBe(false)
    expect(jsonTool.getFields(match!.state).map((field) => field.id)).toEqual(['summary', 'error'])
    expect(jsonTool.serializePrimary(match!.state)).toBe('{"id":}')
  })

  it('summarizes JSON arrays', () => {
    const [match] = jsonTool.detect('[{"id":1},{"id":2}]')

    expect(match?.state.summary).toBe('Array with 2 items')
    expect(getRequiredToolField(jsonTool.getFields(match!.state), 'compact').value).toBe('[{"id":1},{"id":2}]')
  })

  it('ignores non-JSON text', () => {
    expect(jsonTool.detect('id: 1')).toEqual([])
  })
})

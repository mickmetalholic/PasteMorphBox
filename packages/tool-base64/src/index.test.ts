import { describe, expect, it } from 'vitest'
import { base64Tool } from './index'

describe('base64Tool', () => {
  it('decodes UTF-8 Base64', () => {
    const [match] = base64Tool.detect('eyJpZCI6MTIzfQ==')

    expect(match?.state.decoded).toBe('{"id":123}')
    expect(match?.state.encoded).toBe('eyJpZCI6MTIzfQ==')
  })

  it('encodes arbitrary text as UTF-8 Base64', () => {
    const [match] = base64Tool.detect('#ff6600')

    expect(match?.state.decoded).toBeUndefined()
    expect(match?.state.encoded).toBe('I2ZmNjYwMA==')
    expect(base64Tool.getFields(match!.state).some((field) => field.id === 'encoded' && field.value === 'I2ZmNjYwMA==')).toBe(true)
    expect(base64Tool.serializePrimary(match!.state)).toBe('I2ZmNjYwMA==')
  })

  it('does not encode empty input', () => {
    expect(base64Tool.detect('   ')).toEqual([])
  })
})

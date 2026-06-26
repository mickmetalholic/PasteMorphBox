import { describe, expect, it } from 'vitest'
import { base64Tool } from './index'

describe('base64Tool', () => {
  it('decodes UTF-8 Base64', () => {
    const [match] = base64Tool.detect('eyJpZCI6MTIzfQ==')

    expect(match?.state.decoded).toBe('{"id":123}')
  })
})

import { describe, expect, it } from 'vitest'
import { jwtTool } from './index'

describe('jwtTool', () => {
  it('decodes JWT header and payload', () => {
    const [match] = jwtTool.detect('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature')

    if (!match) {
      throw new Error('Expected JWT match')
    }

    expect(jwtTool.getFields(match.state).find((field) => field.id === 'header')?.value).toContain('"alg": "HS256"')
    expect(jwtTool.getFields(match.state).find((field) => field.id === 'payload')?.value).toContain('"name": "Mika"')
    expect(jwtTool.serializePrimary(match.state)).toContain('"sub": "123"')
  })

  it('ignores dotted input without JSON header and payload', () => {
    expect(jwtTool.detect('not.a.jwt')).toHaveLength(0)
  })
})

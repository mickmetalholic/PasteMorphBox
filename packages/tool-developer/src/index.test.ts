import { describe, expect, it } from 'vitest'
import { developerTool } from './index'

describe('developerTool', () => {
  it('decodes JWT header and payload', () => {
    const [match] = developerTool.detect('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature')

    if (!match) {
      throw new Error('Expected JWT match')
    }

    expect(match.state.kind).toBe('jwt')
    expect(developerTool.getFields(match.state).find((field) => field.id === 'payload')?.value).toContain('"name": "Mika"')
  })

  it('decodes Base64URL text', () => {
    const [match] = developerTool.detect('SGVsbG8td29ybGQ')

    if (!match) {
      throw new Error('Expected Base64URL match')
    }

    expect(match.state.kind).toBe('base64url')
    expect(developerTool.getFields(match.state).find((field) => field.id === 'decoded')?.value).toBe('Hello-world')
  })

  it('inspects UUIDs and hashes', () => {
    const [uuidMatch] = developerTool.detect('550e8400-e29b-41d4-a716-446655440000')
    const [hashMatch] = developerTool.detect('d41d8cd98f00b204e9800998ecf8427e')

    if (!uuidMatch || !hashMatch) {
      throw new Error('Expected UUID and hash matches')
    }

    expect(uuidMatch.state.kind).toBe('uuid')
    expect(hashMatch.state.kind).toBe('hash')
    expect(developerTool.serializePrimary(hashMatch.state)).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it('converts HTML entities', () => {
    const [match] = developerTool.detect('Tom &amp; Jerry &lt;3')

    if (!match) {
      throw new Error('Expected HTML entity match')
    }

    expect(match.state.kind).toBe('html-entities')
    expect(developerTool.getFields(match.state).find((field) => field.id === 'decoded')?.value).toBe('Tom & Jerry <3')
  })
})

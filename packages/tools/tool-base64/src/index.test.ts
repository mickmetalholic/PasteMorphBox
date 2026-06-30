import { describe, expect, it } from 'vitest'
import { base64Tool } from './index'

describe('base64Tool', () => {
  it('decodes UTF-8 Base64', () => {
    const [match] = base64Tool.detect('eyJpZCI6MTIzfQ==')

    expect(match?.state.decoded).toBe('{"id":123}')
    expect(match?.state.kind).toBe('base64')
    expect(base64Tool.getFields(match!.state).find((field) => field.id === 'encoded')?.label).toBe('Encoded Base64')
  })

  it('decodes standalone Base64URL text', () => {
    const [match] = base64Tool.detect('SGVsbG8td29ybGQ')

    expect(match?.state.kind).toBe('base64url')
    expect(match?.state.decoded).toBe('Hello-world')
    expect(base64Tool.getFields(match!.state).find((field) => field.id === 'encoded')?.label).toBe('Normalized Base64URL')
  })

  it('ignores unreadable payloads', () => {
    expect(base64Tool.detect('////')).toHaveLength(0)
  })

  it('does not claim JWT-shaped input as standalone Base64URL', () => {
    expect(base64Tool.detect('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature')).toHaveLength(0)
  })

  it('ignores natural language with spaces', () => {
    expect(base64Tool.detect('quarterly launch CHECKLIST')).toHaveLength(0)
  })
})

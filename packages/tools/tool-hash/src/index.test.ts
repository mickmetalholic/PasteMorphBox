import { describe, expect, it } from 'vitest'
import { hashTool } from './index'

describe('hashTool', () => {
  it('detects common hash shapes', () => {
    const [match] = hashTool.detect('D41D8CD98F00B204E9800998ECF8427E')

    if (!match) {
      throw new Error('Expected hash match')
    }

    expect(hashTool.getFields(match.state).find((field) => field.id === 'hash-kind')?.value).toBe('MD5')
    expect(hashTool.serializePrimary(match.state)).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it('ignores unsupported hash shapes', () => {
    expect(hashTool.detect('abcdef')).toHaveLength(0)
  })
})

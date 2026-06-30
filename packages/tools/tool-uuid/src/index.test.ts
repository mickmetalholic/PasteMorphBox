import { describe, expect, it } from 'vitest'
import { uuidTool } from './index'

describe('uuidTool', () => {
  it('inspects UUID version and normalized value', () => {
    const [match] = uuidTool.detect('550E8400-E29B-41D4-A716-446655440000')

    if (!match) {
      throw new Error('Expected UUID match')
    }

    expect(uuidTool.getFields(match.state).find((field) => field.id === 'version')?.value).toBe('4')
    expect(uuidTool.serializePrimary(match.state)).toBe('550e8400-e29b-41d4-a716-446655440000')
  })

  it('ignores invalid UUID-like input', () => {
    expect(uuidTool.detect('550e8400-e29b-01d4-a716-446655440000')).toHaveLength(0)
  })
})

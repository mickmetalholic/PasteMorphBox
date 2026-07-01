import { describe, expect, it } from 'vitest'
import { getRequiredToolField } from '@pastemorphbox/core'
import { colorTool } from './index'

describe('colorTool', () => {
  it('detects hex colors and returns linked fields', () => {
    const [match] = colorTool.detect('#ff6600')

    expect(match?.confidence).toBeGreaterThan(0.9)
    expect(colorTool.getFields(match!.state).some((field) => field.value.includes('rgb'))).toBe(true)
    expect(colorTool.serializePrimary(match!.state)).toBe('#ff6600')
  })

  it('updates color state from rgb input', () => {
    const [match] = colorTool.detect('#000000')
    const result = colorTool.applyEdit?.(match!.state, 'rgb', 'rgb(255 255 255)')

    expect(colorTool.serializePrimary(result!.state)).toBe('#ffffff')
  })

  it('preserves alpha in primary and field output', () => {
    const [match] = colorTool.detect('rgb(255 0 0 / 50%)')

    if (!match) {
      throw new Error('Expected color match')
    }

    expect(colorTool.serializePrimary(match.state)).toBe('#ff000080')
    expect(getRequiredToolField(colorTool.getFields(match.state), 'rgb').value).toBe('rgb(255 0 0 / 0.5)')
  })

  it('keeps state and reports errors for invalid edits', () => {
    const [match] = colorTool.detect('#000000')
    const result = colorTool.applyEdit?.(match!.state, 'hex', 'not a color')

    expect(result?.state).toBe(match!.state)
    expect(result?.error).toBe('Enter a valid CSS color.')
  })

  it('ignores non-color text', () => {
    expect(colorTool.detect('brand orange')).toEqual([])
  })
})

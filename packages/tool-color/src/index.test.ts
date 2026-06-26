import { describe, expect, it } from 'vitest'
import { colorTool } from './index'

describe('colorTool', () => {
  it('detects hex colors and returns linked fields', () => {
    const [match] = colorTool.detect('#ff6600')

    expect(match?.confidence).toBeGreaterThan(0.9)
    expect(colorTool.getFields(match!.state).some((field) => field.value.includes('rgb'))).toBe(true)
  })

  it('updates color state from rgb input', () => {
    const [match] = colorTool.detect('#000000')
    const result = colorTool.applyEdit?.(match!.state, 'rgb', 'rgb(255 255 255)')

    expect(colorTool.serializePrimary(result!.state)).toBe('#ffffff')
  })
})

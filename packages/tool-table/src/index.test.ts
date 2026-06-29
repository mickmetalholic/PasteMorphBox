import { describe, expect, it } from 'vitest'
import { tableTool } from './index'

describe('tableTool', () => {
  it('does not detect single-line input', () => {
    expect(tableTool.detect('name,role')).toEqual([])
  })

  it('converts CSV rows to Markdown and TSV', () => {
    const [match] = tableTool.detect('name,role\nMika,Admin\nJon,Support')

    if (!match) {
      throw new Error('Expected table match')
    }

    expect(match.state.kind).toBe('csv')
    expect(match.state.markdown).toContain('| name | role |')
    expect(match.state.tsv).toBe('name\trole\nMika\tAdmin\nJon\tSupport')
    expect(tableTool.serializePrimary(match.state)).toBe(match.state.markdown)
  })

  it('parses quoted CSV cells', () => {
    const [match] = tableTool.detect('name,note\nMika,"Admin, Billing"')

    if (!match) {
      throw new Error('Expected table match')
    }

    expect(match.state.rows[1]).toEqual(['Mika', 'Admin, Billing'])
    expect(match.state.csv).toBe('name,note\nMika,"Admin, Billing"')
  })

  it('normalizes Markdown tables', () => {
    const [match] = tableTool.detect('| Name | Qty |\n| --- | ---: |\n| Apples | 4 |')

    if (!match) {
      throw new Error('Expected table match')
    }

    expect(match.state.kind).toBe('markdown')
    expect(match.state.csv).toBe('Name,Qty\nApples,4')
  })

  it('creates list outputs for plain multi-line text', () => {
    const [match] = tableTool.detect('Alpha\nBeta\nGamma')

    if (!match) {
      throw new Error('Expected list match')
    }

    expect(match.state.kind).toBe('list')
    expect(match.state.numberedList).toBe('1. Alpha\n2. Beta\n3. Gamma')
    expect(match.state.bulletList).toBe('- Alpha\n- Beta\n- Gamma')
  })
})

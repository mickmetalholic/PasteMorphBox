import { describe, expect, it } from 'vitest'
import { runToolDetections, type ToolModule } from './index'

describe('runToolDetections', () => {
  it('sorts matches by confidence and clamps invalid scores', () => {
    const modules: ToolModule[] = [
      {
        id: 'low',
        name: 'Low',
        description: 'Low confidence',
        detect: () => [
          {
            title: 'Low',
            subtitle: 'Low',
            confidence: -1,
            state: null,
            source: 'x',
          },
        ],
        getFields: () => [],
        serializePrimary: () => '',
      },
      {
        id: 'high',
        name: 'High',
        description: 'High confidence',
        detect: () => [
          {
            title: 'High',
            subtitle: 'High',
            confidence: 2,
            state: null,
            source: 'x',
          },
        ],
        getFields: () => [],
        serializePrimary: () => '',
      },
    ]

    const matches = runToolDetections(' value ', modules)

    expect(matches).toHaveLength(2)
    expect(matches[0]?.toolId).toBe('high')
    expect(matches[0]?.confidence).toBe(1)
    expect(matches[1]?.confidence).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import { htmlEntitiesTool } from './index'

describe('htmlEntitiesTool', () => {
  it('decodes and encodes HTML entity text', () => {
    const [match] = htmlEntitiesTool.detect('Tom &amp; Jerry &lt;3')

    if (!match) {
      throw new Error('Expected HTML entity match')
    }

    expect(htmlEntitiesTool.getFields(match.state).find((field) => field.id === 'decoded')?.value).toBe('Tom & Jerry <3')
    expect(htmlEntitiesTool.getFields(match.state).find((field) => field.id === 'encoded')?.value).toBe('Tom &amp;amp; Jerry &amp;lt;3')
    expect(htmlEntitiesTool.serializePrimary(match.state)).toBe('Tom & Jerry <3')
  })

  it('detects raw text that can be entity-encoded', () => {
    const [match] = htmlEntitiesTool.detect('<button title="Save">')

    expect(match?.state.encoded).toBe('&lt;button title=&quot;Save&quot;&gt;')
  })
})

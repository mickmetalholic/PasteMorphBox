import type { ToolModule } from '@pastemorphbox/core'
import type { RgbState } from './types'

export const colorMetadata = {
  id: 'color',
  name: 'Color',
  description: 'Convert CSS color values across common color spaces.',
  category: 'inspect',
  tags: ['color', 'css', 'design'],
  examples: [
    {
      id: 'hex-color',
      label: 'Color value',
      description: 'Convert color formats and preview the swatch.',
      source: '#ff6600',
      suggestWhenNoMatch: true,
      tags: ['css'],
    },
    {
      id: 'rgb-color',
      label: 'RGB color',
      description: 'Inspect a CSS RGB color in other spaces.',
      source: 'rgb(34 197 94)',
      tags: ['css'],
    },
  ],
} satisfies Pick<ToolModule<RgbState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

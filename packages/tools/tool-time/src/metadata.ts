import type { ToolModule } from '@pastemorphbox/core'
import type { TimeState } from './types'

export const timeMetadata = {
  id: 'time',
  name: 'Time',
  description: 'Convert Unix timestamps, local dates, UTC, and ISO time.',
  category: 'convert',
  tags: ['timestamp', 'date', 'utc'],
  examples: [
    {
      id: 'timestamp-seconds',
      label: 'Timestamp',
      description: 'Read Unix timestamps across local and UTC time.',
      source: '1700000000',
      suggestWhenNoMatch: true,
      tags: ['timestamp'],
    },
    {
      id: 'iso-date',
      label: 'ISO date',
      description: 'Convert an ISO date into timestamp formats.',
      source: '2026-06-29T12:00:00Z',
      tags: ['date'],
    },
  ],
} satisfies Pick<ToolModule<TimeState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

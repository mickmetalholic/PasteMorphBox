import type { ToolModule } from '@pastemorphbox/core'
import type { JwtState } from './types'

export const jwtMetadata = {
  id: 'jwt',
  name: 'JWT',
  description: 'Decode JWT header and payload without verifying the signature.',
  category: 'developer',
  tags: ['jwt', 'token', 'base64url'],
  examples: [
    {
      id: 'jwt',
      label: 'JWT',
      description: 'Decode JWT header and payload without verification.',
      source: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWlrYSJ9.signature',
      suggestWhenNoMatch: true,
      tags: ['jwt'],
    },
  ],
} satisfies Pick<ToolModule<JwtState>, 'id' | 'name' | 'description' | 'category' | 'tags' | 'examples'>

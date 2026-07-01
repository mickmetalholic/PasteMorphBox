import type { ToolModule } from '@pastemorphbox/core'
import { getJwtFields } from './fields'
import { parseJwt } from './jwt-state'
import type { JwtState } from './types'

export type { JwtState } from './types'
export { decodeJwtPayloadText } from './jwt-state'

export const jwtTool: ToolModule<JwtState> = {
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
  detect(input) {
    const source = input.trim()
    const state = parseJwt(source)

    if (!state) {
      return []
    }

    return [
      {
        title: 'JWT inspection',
        subtitle: 'Decoded JWT header and payload without verifying the signature',
        confidence: 0.88,
        state,
        source,
      },
    ]
  },
  getFields: getJwtFields,
  serializePrimary(state) {
    return state.payload
  },
}

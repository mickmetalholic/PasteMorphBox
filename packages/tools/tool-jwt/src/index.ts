import type { ToolModule } from '@pastemorphbox/core'
import { parseJwt } from './jwt-state'
import type { JwtState } from './types'

export type { JwtState } from './types'

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
  getFields(state) {
    return [
      { id: 'header', label: 'Header JSON', value: state.header, monospace: true, wide: true },
      { id: 'payload', label: 'Payload JSON', value: state.payload, monospace: true, wide: true },
      { id: 'signature', label: 'Signature', value: state.signature, monospace: true, wide: true },
    ]
  },
  serializePrimary(state) {
    return state.payload
  },
}

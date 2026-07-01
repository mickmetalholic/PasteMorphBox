import type { ToolModule } from '@pastemorphbox/core'
import { getJwtFields } from './fields'
import { parseJwt } from './jwt-state'
import { jwtMetadata } from './metadata'
import type { JwtState } from './types'

export type { JwtState } from './types'
export { decodeJwtPayloadText } from './jwt-state'

export const jwtTool: ToolModule<JwtState> = {
  ...jwtMetadata,
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

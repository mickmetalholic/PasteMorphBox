import type { ToolModule } from '@pastemorphbox/core'
import { decodeBase64, decodeBase64Url, detectBase64Kind, encodeBase64, encodeBase64Url, isMostlyPrintable } from './codec'
import { getBase64Fields } from './fields'
import { base64Metadata } from './metadata'
import type { Base64State } from './types'

export type { Base64State } from './types'
export { decodePrintableBase64, decodePrintableBase64Url } from './codec'

export const base64Tool: ToolModule<Base64State> = {
  ...base64Metadata,
  detect(input) {
    const source = input.trim()
    const kind = detectBase64Kind(source)

    if (!kind) {
      return []
    }

    const decoded = kind === 'base64' ? decodeBase64(source) : decodeBase64Url(source)

    if (decoded === null || !isMostlyPrintable(decoded)) {
      return []
    }

    return [
      {
        title: 'Base64 conversion',
        subtitle: kind === 'base64' ? 'Decoded as UTF-8 Base64 text' : 'Decoded as URL-safe Base64 text',
        confidence: kind === 'base64' ? 0.76 : 0.66,
        state: {
          kind,
          raw: source,
          decoded,
          encoded: kind === 'base64' ? encodeBase64(decoded) : encodeBase64Url(decoded),
        },
        source,
      },
    ]
  },
  getFields: getBase64Fields,
  serializePrimary(state) {
    return state.decoded
  },
}

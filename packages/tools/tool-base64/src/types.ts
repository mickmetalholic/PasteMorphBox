export type Base64State = {
  kind: 'base64' | 'base64url'
  raw: string
  decoded: string
  encoded: string
}

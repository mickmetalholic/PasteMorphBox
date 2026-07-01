export function hashKindForLength(length: number): string | null {
  if (length === 32) {
    return 'MD5'
  }

  if (length === 40) {
    return 'SHA-1'
  }

  if (length === 64) {
    return 'SHA-256'
  }

  return null
}

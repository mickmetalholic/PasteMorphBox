export function hasEscapes(input: string): boolean {
  return /%[0-9a-f]{2}/i.test(input)
}

export function decodePercentText(input: string): string | null {
  if (!hasEscapes(input)) {
    return null
  }

  try {
    return decodeURIComponent(input)
  } catch {
    return null
  }
}

export function safeDecode(input: string): string {
  return decodePercentText(input) ?? input
}

export function decodeUrlParameterValue(input: string): string | null {
  if (!/%[0-9a-f]{2}|\+/i.test(input)) {
    return null
  }

  try {
    return decodeURIComponent(input.replace(/\+/g, '%20'))
  } catch {
    return null
  }
}

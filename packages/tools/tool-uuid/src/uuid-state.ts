export function parseUuidVersion(input: string): string | null {
  const match = input.match(/^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  return match?.[1] ?? null
}

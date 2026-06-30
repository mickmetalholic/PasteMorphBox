export type FieldInputKind = 'text' | 'number' | 'textarea' | 'datetime-local'

export type ToolCategory = 'clean' | 'extract' | 'convert' | 'inspect' | 'table' | 'developer'

export type ToolExample = {
  id: string
  label: string
  description: string
  source: string
  suggestWhenNoMatch?: boolean
  tags?: string[]
}

export type ToolField = {
  id: string
  label: string
  value: string
  copyValue?: string
  editable?: boolean
  inputKind?: FieldInputKind
  monospace?: boolean
  wide?: boolean
  colorSwatch?: string
  hint?: string
}

export type ToolMatch<TState = unknown> = {
  toolId: string
  matchId: string
  title: string
  subtitle: string
  confidence: number
  state: TState
  source: string
}

export type ToolEditResult<TState> = {
  state: TState
  error?: string
}

export type ToolModule<TState = unknown> = {
  id: string
  name: string
  description: string
  category?: ToolCategory
  tags?: string[]
  examples?: ToolExample[]
  detect(input: string): Array<Omit<ToolMatch<TState>, 'toolId' | 'matchId'>>
  getFields(state: TState): ToolField[]
  applyEdit?: (state: TState, fieldId: string, value: string) => ToolEditResult<TState>
  serializePrimary: (state: TState) => string
}

export type AnyToolModule = ToolModule<any>
export type AnyToolMatch = ToolMatch<unknown>

export function normalizeInput(input: string): string {
  return input.trim()
}

export function runToolDetections(input: string, modules: AnyToolModule[]): AnyToolMatch[] {
  const source = normalizeInput(input)

  if (!source) {
    return []
  }

  return modules
    .flatMap((module) =>
      module.detect(source).map((match, index) => ({
        ...match,
        toolId: module.id,
        matchId: `${module.id}:${index}:${hashMatchSource(source)}`,
        confidence: clampConfidence(match.confidence),
        source,
      })),
    )
    .sort((a, b) => b.confidence - a.confidence)
}

export function clampConfidence(confidence: number): number {
  if (Number.isNaN(confidence)) {
    return 0
  }

  return Math.max(0, Math.min(1, confidence))
}

function hashMatchSource(source: string): string {
  let hash = 0

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0
  }

  return hash.toString(36)
}

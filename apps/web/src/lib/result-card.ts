import type { AnyToolMatch, ToolField } from '@pastemorphbox/core'
import { getToolModule } from '@pastemorphbox/registry'
import type { CardState } from '../types/card-state'
import type { ResolvedToolCard } from '../types/resolved-card'

export function resolveToolCard({
  match,
  rank,
  cardState,
  onApplyInput,
  onStateChange,
}: {
  match: AnyToolMatch
  rank: number
  cardState: CardState
  onApplyInput: (value: string) => void
  onStateChange: (state: CardState) => void
}): ResolvedToolCard | null {
  const module = getToolModule(match.toolId)

  if (!module) {
    return null
  }

  const fields = module.getFields(cardState.state)
  const primaryValue = module.serializePrimary(cardState.state)

  return {
    matchId: match.matchId,
    rank,
    title: match.title,
    subtitle: match.subtitle,
    confidencePercent: Math.round(match.confidence * 100),
    dirty: cardState.dirty,
    error: cardState.error,
    fields,
    primaryValue,
    applyPrimary: () => onApplyInput(primaryValue),
    editField: (fieldId, value) => {
      if (!module.applyEdit) {
        return
      }

      const result = module.applyEdit(cardState.state, fieldId, value)
      onStateChange({
        state: result.state,
        dirty: true,
        error: result.error,
      })
    },
  }
}

export function formatCardFieldsCopyText(fields: ToolField[]): string {
  return fields.map((field) => `${field.label}\n${field.copyValue ?? field.value}`).join('\n\n')
}

import type { ToolField } from '@pastemorphbox/core'

export type ResolvedToolCard = {
  matchId: string
  rank: number
  title: string
  subtitle: string
  confidencePercent: number
  dirty: boolean
  error?: string
  fields: ToolField[]
  primaryValue: string
  applyPrimary: () => void
  editField: (fieldId: string, value: string) => void
}

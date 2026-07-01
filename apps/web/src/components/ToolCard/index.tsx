import { useState } from 'react'
import { Clipboard, CornerDownLeft } from 'lucide-react'
import type { AnyToolMatch } from '@pastemorphbox/core'
import { getToolModule } from '@pastemorphbox/registry'
import type { CardState } from '../../types/card-state'
import { FieldRow } from './FieldRow'

export function ToolCard({
  match,
  rank,
  cardState,
  onStateChange,
  onApplyInput,
}: {
  match: AnyToolMatch
  rank: number
  cardState: CardState
  onStateChange: (state: CardState) => void
  onApplyInput: (value: string) => void
}) {
  const module = getToolModule(match.toolId)
  const [copiedAll, setCopiedAll] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!module) {
    return null
  }

  const fields = module.getFields(cardState.state)
  const shouldFold = fields.length > 6
  const visibleFields = shouldFold && !expanded ? fields.slice(0, 6) : fields
  const primaryValue = module.serializePrimary(cardState.state)

  function editField(fieldId: string, value: string) {
    if (!module?.applyEdit) {
      return
    }

    const result = module.applyEdit(cardState.state, fieldId, value)
    onStateChange({
      state: result.state,
      dirty: true,
      error: result.error,
    })
  }

  async function copyAllFields() {
    await navigator.clipboard.writeText(fields.map((field) => `${field.label}\n${field.copyValue ?? field.value}`).join('\n\n'))
    setCopiedAll(true)
    window.setTimeout(() => setCopiedAll(false), 1200)
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">#{rank}</span>
            <h2 className="text-lg font-semibold text-slate-950">{match.title}</h2>
            <span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700">{Math.round(match.confidence * 100)}%</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {match.subtitle}. Detected from the pasted input with {Math.round(match.confidence * 100)}% confidence
            {cardState.dirty ? ' · Edited inside this card' : ''}
          </p>
          {cardState.error ? <p className="mt-2 text-sm text-red-600">{cardState.error}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyAllFields}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            {copiedAll ? <span className="text-xs font-semibold text-cyan-700">OK</span> : <Clipboard className="size-4" />}
            Copy all
          </button>
          <button
            type="button"
            onClick={() => onApplyInput(primaryValue)}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <CornerDownLeft className="size-4" />
            Apply to input
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-2">
        {visibleFields.map((field) => (
          <FieldRow key={field.id} field={field} onEdit={editField} />
        ))}
        {shouldFold ? (
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex h-9 items-center justify-center rounded-md border border-slate-300 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 md:col-span-2"
          >
            {expanded ? 'Show fewer fields' : `Show ${fields.length - visibleFields.length} more field${fields.length - visibleFields.length === 1 ? '' : 's'}`}
          </button>
        ) : null}
      </div>
    </article>
  )
}

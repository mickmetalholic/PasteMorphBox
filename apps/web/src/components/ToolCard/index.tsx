import { useState } from 'react'
import { Clipboard, CornerDownLeft } from 'lucide-react'
import { formatCardFieldsCopyText } from '../../lib/result-card'
import { useClipboardFeedback } from '../../lib/use-clipboard-feedback'
import type { ResolvedToolCard } from '../../types/resolved-card'
import { FieldRow } from './FieldRow'

export function ToolCard({ card }: { card: ResolvedToolCard }) {
  const { copied: copiedAll, copyText } = useClipboardFeedback()
  const [expanded, setExpanded] = useState(false)

  const shouldFold = card.fields.length > 6
  const visibleFields = shouldFold && !expanded ? card.fields.slice(0, 6) : card.fields

  async function copyAllFields() {
    await copyText(formatCardFieldsCopyText(card.fields))
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">#{card.rank}</span>
            <h2 className="text-lg font-semibold text-slate-950">{card.title}</h2>
            <span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700">{card.confidencePercent}%</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {card.subtitle}. Detected from the pasted input with {card.confidencePercent}% confidence
            {card.dirty ? ' · Edited inside this card' : ''}
          </p>
          {card.error ? <p className="mt-2 text-sm text-red-600">{card.error}</p> : null}
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
            onClick={card.applyPrimary}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <CornerDownLeft className="size-4" />
            Apply to input
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-2">
        {visibleFields.map((field) => (
          <FieldRow key={field.id} field={field} onEdit={card.editField} />
        ))}
        {shouldFold ? (
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex h-9 items-center justify-center rounded-md border border-slate-300 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 md:col-span-2"
          >
            {expanded ? 'Show fewer fields' : `Show ${card.fields.length - visibleFields.length} more field${card.fields.length - visibleFields.length === 1 ? '' : 's'}`}
          </button>
        ) : null}
      </div>
    </article>
  )
}

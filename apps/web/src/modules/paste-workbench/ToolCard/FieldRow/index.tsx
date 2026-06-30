import { useEffect, useState } from 'react'
import { Clipboard } from 'lucide-react'
import type { ToolField } from '@pastemorphbox/core'
import { cn } from '@pastemorphbox/ui'
import { EditableValue } from '../EditableValue'

export function FieldRow({ field, onEdit }: { field: ToolField; onEdit: (fieldId: string, value: string) => void }) {
  const [draft, setDraft] = useState(field.value)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setDraft(field.value)
  }, [field.value])

  async function copyValue() {
    await navigator.clipboard.writeText(field.copyValue ?? field.value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className={cn('rounded-md border border-slate-200 bg-slate-50 p-3', field.wide ? 'md:col-span-2' : '')}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {field.colorSwatch ? <span className="size-5 shrink-0 rounded border border-slate-300" style={{ background: field.colorSwatch }} /> : null}
          <span className="truncate text-sm font-medium text-slate-600">{field.label}</span>
        </div>
        <button
          type="button"
          onClick={copyValue}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-950"
          title={`Copy ${field.label}`}
        >
          {copied ? <span className="text-xs font-semibold text-cyan-700">OK</span> : <Clipboard className="size-4" />}
        </button>
      </div>
      {field.editable ? (
        <EditableValue field={field} draft={draft} setDraft={setDraft} onEdit={onEdit} />
      ) : (
        <pre className={cn('whitespace-pre-wrap break-words text-sm text-slate-950', field.monospace ? 'font-mono' : 'font-sans')}>{field.value}</pre>
      )}
    </div>
  )
}

import type { ToolField } from '@pastemorphbox/core'
import { cn } from '@pastemorphbox/ui'

export function EditableValue({
  field,
  draft,
  setDraft,
  onEdit,
}: {
  field: ToolField
  draft: string
  setDraft: (value: string) => void
  onEdit: (fieldId: string, value: string) => void
}) {
  const sharedClass = cn(
    'w-full rounded border border-slate-300 bg-white px-2 py-2 text-sm text-slate-950 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100',
    field.monospace ? 'font-mono' : '',
  )

  if (field.inputKind === 'textarea') {
    return (
      <textarea
        value={draft}
        rows={6}
        onChange={(event) => {
          setDraft(event.target.value)
          onEdit(field.id, event.target.value)
        }}
        className={sharedClass}
        spellCheck={false}
      />
    )
  }

  return (
    <input
      value={draft}
      type={field.inputKind ?? 'text'}
      onChange={(event) => {
        setDraft(event.target.value)
        onEdit(field.id, event.target.value)
      }}
      className={sharedClass}
      spellCheck={false}
    />
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Clipboard, CornerDownLeft, Sparkles } from 'lucide-react'
import type { AnyToolMatch, ToolField } from '@pastemorphbox/core'
import { detectAll, getToolModule } from '@pastemorphbox/registry'
import { cn } from '@pastemorphbox/ui'
import { Route } from './router'
import { useInputStore } from './store'

type CardState = {
  state: unknown
  dirty: boolean
  error?: string
}

export function App() {
  const search = Route.useSearch()
  const input = useInputStore((store) => store.input)
  const setInput = useInputStore((store) => store.setInput)

  useEffect(() => {
    setInput(search.q === undefined ? '' : String(search.q))
  }, [search.q, setInput])

  const matches = useMemo(() => detectAll(input), [input])

  function updateInput(next: string) {
    setInput(next)
    replaceQueryInput(next)
  }

  return (
    <main className="min-h-svh bg-[--app-bg] text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">PasteMorphBox</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Paste once. Convert instantly.</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm sm:flex">
            <Sparkles className="size-4 text-cyan-600" />
            Local-only MVP
          </div>
        </header>

        <section className="space-y-3">
          <label htmlFor="smart-input" className="text-sm font-medium text-slate-700">
            Smart input
          </label>
          <textarea
            id="smart-input"
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="Paste a timestamp, color, JSON, URL, or Base64 text..."
            rows={5}
            className="min-h-36 w-full resize-y rounded-lg border border-slate-300 bg-white p-4 font-mono text-base leading-6 text-slate-950 shadow-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
            spellCheck={false}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span>{matches.length ? `${matches.length} possible conversion${matches.length === 1 ? '' : 's'} detected` : 'No input leaves the workspace.'}</span>
            {input ? (
              <button type="button" className="text-slate-600 underline-offset-4 hover:text-slate-950 hover:underline" onClick={() => updateInput('')}>
                Clear
              </button>
            ) : null}
          </div>
        </section>

        {matches.length ? <ResultList matches={matches} onApplyInput={updateInput} /> : <EmptyState />}
      </div>
    </main>
  )
}

function replaceQueryInput(value: string) {
  const url = new URL(window.location.href)

  if (value) {
    url.searchParams.set('q', value)
  } else {
    url.searchParams.delete('q')
  }

  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

function ResultList({ matches, onApplyInput }: { matches: AnyToolMatch[]; onApplyInput: (value: string) => void }) {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({})

  useEffect(() => {
    setCardStates((current) => {
      const next: Record<string, CardState> = {}

      for (const match of matches) {
        next[match.matchId] = current[match.matchId] ?? {
          state: match.state,
          dirty: false,
        }
      }

      return next
    })
  }, [matches])

  return (
    <section className="grid gap-4">
      {matches.map((match, index) => (
        <ToolCard
          key={match.matchId}
          match={match}
          rank={index + 1}
          cardState={cardStates[match.matchId] ?? { state: match.state, dirty: false }}
          onApplyInput={onApplyInput}
          onStateChange={(state) =>
            setCardStates((current) => ({
              ...current,
              [match.matchId]: state,
            }))
          }
        />
      ))}
    </section>
  )
}

function ToolCard({
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

  if (!module) {
    return null
  }

  const fields = module.getFields(cardState.state)
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
            {match.subtitle}
            {cardState.dirty ? ' · Edited inside this card' : ''}
          </p>
          {cardState.error ? <p className="mt-2 text-sm text-red-600">{cardState.error}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => onApplyInput(primaryValue)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <CornerDownLeft className="size-4" />
          Apply to input
        </button>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-2">
        {fields.map((field) => (
          <FieldRow key={field.id} field={field} onEdit={editField} />
        ))}
      </div>
    </article>
  )
}

function FieldRow({ field, onEdit }: { field: ToolField; onEdit: (fieldId: string, value: string) => void }) {
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

function EditableValue({
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

function EmptyState() {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
      Try values like <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-slate-900">#ff6600</code>,{' '}
      <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-slate-900">1700000000</code>, or{' '}
      <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-slate-900">{'{"id":123}'}</code>.
    </section>
  )
}

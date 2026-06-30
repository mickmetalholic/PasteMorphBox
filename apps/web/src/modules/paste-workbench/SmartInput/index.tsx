import { HelpCircle } from 'lucide-react'

type SmartInputProps = {
  input: string
  matchesCount: number
  examplesOpen: boolean
  onInputChange: (value: string) => void
  onToggleExamples: () => void
  onClear: () => void
}

export function SmartInput({ input, matchesCount, examplesOpen, onInputChange, onToggleExamples, onClear }: SmartInputProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="smart-input" className="text-sm font-medium text-slate-700">
          Smart input
        </label>
        <button
          type="button"
          onClick={onToggleExamples}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          aria-expanded={examplesOpen}
        >
          <HelpCircle className="size-4" />
          Examples
        </button>
      </div>
      <textarea
        id="smart-input"
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Paste JSON, URLs, JWTs, tables, Base64, timestamps, colors, IDs, hashes, or messy notes..."
        rows={5}
        className="min-h-36 w-full resize-y rounded-lg border border-slate-300 bg-white p-4 font-mono text-base leading-6 text-slate-950 shadow-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
        spellCheck={false}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>
          {matchesCount
            ? `${matchesCount} possible conversion${matchesCount === 1 ? '' : 's'} detected`
            : 'Paste content stays local and is not stored in the URL.'}
        </span>
        {input ? (
          <button type="button" className="text-slate-600 underline-offset-4 hover:text-slate-950 hover:underline" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
    </section>
  )
}

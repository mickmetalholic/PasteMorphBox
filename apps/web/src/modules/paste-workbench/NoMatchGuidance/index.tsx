import { getNoMatchSuggestions, type RegisteredToolExample } from '@pastemorphbox/registry'
import { ExampleButton } from '../ExamplesPanel/ExampleButton'

export function NoMatchGuidance({ onTryExample }: { onTryExample: (example: RegisteredToolExample) => void }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-950">No strong match yet</h2>
        <p className="mt-1 text-sm text-slate-500">Try a known paste shape or simplify the input.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {getNoMatchSuggestions().map((example) => (
          <ExampleButton key={example.id} example={example} onTryExample={onTryExample} />
        ))}
      </div>
    </section>
  )
}

import { Wand2 } from 'lucide-react'
import { getStarterExamples, type RegisteredToolExample } from '@pastemorphbox/registry'
import { ExampleButton } from '../ExamplesPanel/ExampleButton'

export function EmptyState({ onTryExample }: { onTryExample: (example: RegisteredToolExample) => void }) {
  const highlightedExamples = getStarterExamples()

  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
        <Wand2 className="size-4 text-cyan-600" />
        Try a paste scenario
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {highlightedExamples.map((example) => (
          <ExampleButton key={example.id} example={example} onTryExample={onTryExample} />
        ))}
      </div>
    </section>
  )
}

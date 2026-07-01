import { getToolExamplePreviewGroups, type RegisteredToolExample } from '@pastemorphbox/registry'
import { ExampleButton } from './ExampleButton'

export function ExamplesPanel({ onTryExample }: { onTryExample: (example: RegisteredToolExample) => void }) {
  return (
    <section aria-label="Examples" className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {getToolExamplePreviewGroups(2).map((group) => (
          <div key={group.category} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-950">{group.label}</h2>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">{group.totalExamples}</span>
            </div>
            <div className="grid gap-2">
              {group.examples.map((example) => (
                <ExampleButton key={example.id} example={example} onTryExample={onTryExample} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

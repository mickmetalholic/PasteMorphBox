import type { RegisteredToolExample } from '@pastemorphbox/registry'

export function ExampleButton({
  example,
  onTryExample,
}: {
  example: RegisteredToolExample
  onTryExample: (example: RegisteredToolExample) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onTryExample(example)}
      className="min-h-24 rounded-md border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
    >
      <span className="block text-sm font-semibold text-slate-950">{example.label}</span>
      <span className="mt-1 block text-sm leading-5 text-slate-600">{example.description}</span>
      <code className="mt-2 block truncate rounded bg-white px-2 py-1 font-mono text-xs text-slate-500">{example.source}</code>
    </button>
  )
}

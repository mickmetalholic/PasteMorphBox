'use client'

import { useEffect, useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { detectAll, type RegisteredToolExample } from '@pastemorphbox/registry'
import { useInputStore } from '../../store/input-store'
import { EmptyState } from './EmptyState'
import { ExamplesPanel } from './ExamplesPanel'
import { NoMatchGuidance } from './NoMatchGuidance'
import { ResultList } from './ResultList'
import { SmartInput } from './SmartInput'
import { clearQueryInput } from './query-input'

export function PasteWorkbench() {
  const searchParams = useSearchParams()
  const queryInput = searchParams.get('q')
  const input = useInputStore((store) => store.input)
  const setInput = useInputStore((store) => store.setInput)
  const [examplesOpen, setExamplesOpen] = useState(false)

  useEffect(() => {
    setInput(queryInput ?? '')
  }, [queryInput, setInput])

  const matches = useMemo(() => detectAll(input), [input])

  function updateInput(next: string) {
    setInput(next)
    clearQueryInput()
  }

  function tryExample(example: RegisteredToolExample) {
    updateInput(example.source)
    setExamplesOpen(false)
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

        <SmartInput
          input={input}
          matchesCount={matches.length}
          examplesOpen={examplesOpen}
          onInputChange={updateInput}
          onToggleExamples={() => setExamplesOpen((current) => !current)}
          onClear={() => updateInput('')}
        />

        {examplesOpen ? <ExamplesPanel onTryExample={tryExample} /> : null}

        {matches.length ? (
          <ResultList matches={matches} onApplyInput={updateInput} />
        ) : input ? (
          <NoMatchGuidance onTryExample={tryExample} />
        ) : (
          <EmptyState onTryExample={tryExample} />
        )}
      </div>
    </main>
  )
}

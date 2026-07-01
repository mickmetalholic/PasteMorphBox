import { Suspense } from 'react'
import { PasteConverter } from '../PasteConverter'

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-svh bg-[--app-bg]" />}>
      <PasteConverter />
    </Suspense>
  )
}

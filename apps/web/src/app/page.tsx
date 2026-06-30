import { Suspense } from 'react'
import { App } from '../App'

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-svh bg-[--app-bg]" />}>
      <App />
    </Suspense>
  )
}

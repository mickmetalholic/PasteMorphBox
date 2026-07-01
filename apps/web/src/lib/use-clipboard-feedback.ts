import { useEffect, useRef, useState } from 'react'

const copiedResetMs = 1200

export function useClipboardFeedback() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value)
    setCopied(true)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => setCopied(false), copiedResetMs)
  }

  return { copied, copyText }
}

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

// oxlint-disable-next-line react/only-export-components -- Next app layouts export metadata alongside the component.
export const metadata: Metadata = {
  title: 'PasteMorphBox',
  description: 'Paste-first local conversion toolbox.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

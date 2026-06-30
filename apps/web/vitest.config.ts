import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '../..',
  oxc: false,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['apps/web/src/**/*.test.{ts,tsx}'],
    setupFiles: ['apps/web/src/test/setup.ts'],
  },
})

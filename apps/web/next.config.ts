import type { NextConfig } from 'next'
import { workspaceTranspilePackages } from './workspace-packages'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  transpilePackages: [...workspaceTranspilePackages],
}

export default nextConfig

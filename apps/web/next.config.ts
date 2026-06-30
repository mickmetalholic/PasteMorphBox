import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@pastemorphbox/core',
    '@pastemorphbox/registry',
    '@pastemorphbox/tool-base64',
    '@pastemorphbox/tool-color',
    '@pastemorphbox/tool-extract',
    '@pastemorphbox/tool-hash',
    '@pastemorphbox/tool-html-entities',
    '@pastemorphbox/tool-json',
    '@pastemorphbox/tool-jwt',
    '@pastemorphbox/tool-table',
    '@pastemorphbox/tool-text',
    '@pastemorphbox/tool-time',
    '@pastemorphbox/tool-url',
    '@pastemorphbox/tool-uuid',
    '@pastemorphbox/ui',
  ],
}

export default nextConfig

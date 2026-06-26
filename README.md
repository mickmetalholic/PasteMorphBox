# PasteMorphBox

PasteMorphBox is a paste-first conversion toolbox. Paste text once, let the app detect likely meanings, and work with editable result cards.

## MVP scope

- Smart input with URL-shareable `q` search param.
- Multiple detected result cards sorted by confidence.
- Time, color, JSON, URL, and Base64 tools.
- Editable linked fields for time and color cards.
- Local-only processing with a static frontend deployment path.

## Stack

- React 19 + TypeScript + Vite
- TanStack Router
- Tailwind CSS
- Zustand
- pnpm workspace + Turborepo
- Vitest

## Commands

```bash
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm build
```

## Deployment

The web app builds to `apps/web/dist` and can be deployed to any static host.

### Cloudflare Pages

Use the repository root as the project root.

```txt
Build command: pnpm build
Build output directory: apps/web/dist
```

Recommended build environment variables:

```txt
NODE_VERSION=24
PNPM_VERSION=11.9.0
```

The checked-in `wrangler.toml` sets the Pages project name and output directory for Wrangler-based deploys.

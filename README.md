# PasteMorphBox

PasteMorphBox is a paste-first conversion toolbox. Paste text once, let the app detect likely meanings, and work with editable result cards.

## MVP scope

- Smart input with URL-shareable `q` search param.
- Multiple detected result cards sorted by confidence.
- Time, color, JSON, URL, and Base64 tools.
- Editable linked fields for time and color cards.
- Local-only processing with a static frontend deployment path.

## Stack

- Next.js static export + React 19 + TypeScript
- Tailwind CSS
- Zustand
- pnpm workspace + Turborepo
- Vitest

## Source layout

- `apps/web`: Next.js route entries, app state, layout, and rendering.
- `apps/web/src/components`: paste experience UI components, with each component organized by directory.
- `apps/web/src/lib`: web app local utilities.
- `apps/web/src/types`: web app local shared types.
- `packages/shared`: shared contracts and UI helpers.
- `packages/platform`: cross-tool orchestration such as the registry.
- `packages/tools/tool-*`: independent conversion capabilities.
- `packages/config`: shared TypeScript and lint configuration.

Tool packages expose their `ToolModule` from `src/index.ts`. Keep `index.ts` focused on public exports and module assembly; move non-trivial types, parsing, formatting, state building, and field helpers into focused package-local files.

The web route layer stays thin: `apps/web/src/app` should delegate to the paste converter composition instead of owning workflow implementation.

Package behavior tests live beside package source in each package `src` tree. Web app interaction, discovery, and route workflow tests live under `apps/web/src/test`.

## Commands

Use Node 24, as declared in `.nvmrc`, with the pnpm version declared by `packageManager` in `package.json`.

```bash
pnpm install
pnpm dev
```

Before considering changes complete, run the same local checks expected by CI:

```bash
pnpm test
pnpm typecheck
pnpm build
```

If `pnpm test` fails before running tests with an error like `node: not found`, fix the shell runtime first so `node --version` resolves to Node 24, then rerun the checks.

## Deployment

The Next.js web app builds to static assets in `apps/web/dist` and can be deployed to any static host.

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

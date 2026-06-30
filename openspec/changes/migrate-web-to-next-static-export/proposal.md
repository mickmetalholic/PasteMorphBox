## Why

The web app is currently a Vite single-page React app, while the project wants to move the web subproject onto Next.js as the frontend foundation. This change should make that migration without changing PasteMorphBox's MVP behavior: a local-only, paste-first conversion toolbox that can still deploy as static assets.

## What Changes

- Replace the `apps/web` Vite build/runtime shell with a Next.js app configured for static export.
- Replace TanStack Router usage in the web app with Next.js App Router primitives for the root page and `q` query initialization.
- Preserve the existing paste-first UI behavior, result card behavior, local card edits, copy actions, and local-only conversion flow.
- Preserve static-only deployment with no Next.js server runtime, API routes, middleware, or backend service.
- Update web app tests, type checking, build scripts, and documentation to reflect Next.js.
- Update project technical guidance that currently names Vite and TanStack Router as the web stack.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `project`: Update the project technical rules so the web app frontend foundation is Next.js static export instead of Vite/TanStack Router.
- `deployment`: Preserve static deployability while allowing the Next.js static export output layout used by the migrated web app.

## Impact

- Affects `apps/web` package dependencies, scripts, routing entrypoints, test setup, and build configuration.
- Affects deployment configuration and documentation if the static output directory changes from the current Vite `dist` convention.
- Does not change `packages/core`, `packages/registry`, or `packages/tool-*` conversion contracts.
- Does not introduce server-rendered data dependencies, runtime APIs, account systems, analytics, or storage.

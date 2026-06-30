## Context

`apps/web` is currently a Vite React single-page app. The app has one root experience, uses TanStack Router only for `/` and the optional `q` search parameter, and performs all tool detection/conversion locally through workspace packages. The product direction remains pure frontend and paste-first, with no backend runtime.

The repository also has a Cloudflare Pages deployment change in progress that assumes Vite emits static assets to `apps/web/dist`. The Next.js migration must either preserve that static output location or update the deployment contract in the same change.

## Goals / Non-Goals

**Goals:**

- Move `apps/web` to Next.js while keeping the app deployable as static files.
- Preserve the current smart input, detection, result card, copy, edit, and apply-to-input behavior.
- Keep `packages/core`, `packages/registry`, `packages/tool-*`, and `packages/ui` as shared workspace packages with unchanged public contracts.
- Keep root commands (`pnpm test`, `pnpm typecheck`, `pnpm build`) as the completion checks.
- Keep Cloudflare Pages deployment static-only.

**Non-Goals:**

- Introduce SSR data dependencies, API routes, middleware, server actions, Pages Functions, Workers, databases, accounts, or analytics.
- Redesign the UI or add traditional tool navigation.
- Change detector ranking, converter behavior, or tool module contracts.
- Split result cards into a new package during this migration.

## Decisions

- Configure Next.js for static export.
  - Rationale: PasteMorphBox must remain deployable without a backend service, and the current app does not require request-time server rendering.
  - Alternative considered: Use the default Next.js server output. That would complicate Cloudflare Pages deployment and violate the pure static MVP constraint.

- Preserve `apps/web/dist` as the production static output if Next.js supports the configured output path cleanly.
  - Rationale: Existing deployment specs and the Cloudflare Pages proposal already point to `apps/web/dist`; keeping the path reduces deployment churn.
  - Alternative considered: Use Next.js's default `out` static export directory and update deployment specs/config. This is acceptable if `dist` introduces brittle tooling, but it should be an explicit implementation decision.

- Keep the migrated page as a client component at first.
  - Rationale: The existing app depends on React state, Zustand, `window.history`, search params, and `navigator.clipboard`. Keeping the interactive app together minimizes behavior changes.
  - Alternative considered: Split a server-rendered shell from client-only controls immediately. That can be done later, but it adds migration complexity without product benefit.

- Replace TanStack Router with Next.js App Router only at the app shell boundary.
  - Rationale: The app currently has no meaningful route tree beyond the root page, so TanStack Router is unnecessary after adopting Next.js.
  - Alternative considered: Keep TanStack Router inside a Next page. That preserves code shape but adds redundant routing and increases bundle/framework complexity.

- Configure Next.js to transpile the PasteMorphBox workspace packages consumed by `apps/web`.
  - Rationale: Workspace packages currently export TypeScript source files, which Vite handles directly. Next.js must be configured so those packages compile reliably.
  - Alternative considered: Prebuild every package and consume compiled `dist` entrypoints. That is a broader packaging change and should not be required for the web migration.

- Use Next-compatible Tailwind CSS setup instead of the Vite Tailwind plugin.
  - Rationale: The current CSS imports Tailwind through a Vite plugin. Next.js should use the Tailwind/PostCSS integration supported by its build pipeline.
  - Alternative considered: Keep Vite only for CSS processing. That defeats the purpose of replacing the web build shell.

- Adapt web tests around the app component behavior, not the old router implementation.
  - Rationale: Existing tests cover product behavior and should survive the routing implementation change. Tests should mock Next navigation/search-param hooks or isolate query handling behind a thin component boundary.
  - Alternative considered: Rewrite tests as end-to-end-only coverage. That would lose fast feedback for result card interactions and clipboard behavior.

## Risks / Trade-offs

- Next.js static export does not support every Next feature -> Keep the change limited to static-compatible App Router features and verify `pnpm build` emits static files.
- Workspace TypeScript source imports may fail under Next.js -> Use `transpilePackages` for all `@pastemorphbox/*` packages consumed by `apps/web`.
- Output directory differences can break Cloudflare Pages configuration -> Verify whether static export can emit to `apps/web/dist`; if not, update deployment specs and config to `apps/web/out`.
- Query param behavior can regress when removing TanStack Router -> Preserve tests for `?q=` initialization and stale query clearing after input edits.
- Test environment can become coupled to Next internals -> Prefer testing the interactive client component with a small mocked navigation boundary.

## Migration Plan

1. Replace Vite-specific files and dependencies in `apps/web` with Next.js configuration, app entry files, and scripts.
2. Move global CSS into the Next app structure and configure the supported Tailwind CSS build path.
3. Move the current interactive `App` into a client component and replace `Route.useSearch()` with Next search-param handling.
4. Remove TanStack Router from the web app after equivalent `q` behavior is tested.
5. Update web tests and test setup for the Next app/component structure.
6. Update deployment and project documentation to match the final static output directory.
7. Run `pnpm test`, `pnpm typecheck`, and `pnpm build`; verify static host metadata is present in the generated output.

Rollback is straightforward before release: revert the web package and deployment/doc changes to the Vite configuration because this migration does not change shared tool contracts or persisted data.

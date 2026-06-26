## Context

PasteMorphBox is a pure frontend Vite application in a pnpm/Turborepo monorepo. The existing deployment contract requires `pnpm build` to emit static assets in `apps/web/dist`, but the repository does not yet include Cloudflare Pages-specific configuration or static host metadata.

The first deployment target should preserve the MVP direction: no backend service, no server runtime, and no application behavior changes.

## Goals / Non-Goals

**Goals:**

- Make Cloudflare Pages deployment repeatable from the repository root.
- Keep the deployment path static-only.
- Document the exact Pages build command, output directory, and recommended runtime versions.
- Add host-level headers that improve browser security and asset caching without requiring application code.

**Non-Goals:**

- Introduce Cloudflare Workers, Pages Functions, or backend APIs.
- Change routing, state management, detection behavior, or tool output behavior.
- Add account, database, analytics, or runtime environment configuration.

## Decisions

- Use `wrangler.toml` at the repository root for Pages configuration.
  - Rationale: The repo is a monorepo and Cloudflare Pages can consume `pages_build_output_dir` from Wrangler configuration, keeping the output path versioned with the code.
  - Alternative considered: Only document the Pages dashboard fields. This is still documented, but a checked-in config reduces setup drift.

- Keep the build command as `pnpm build`.
  - Rationale: The root script already runs the full Turborepo build and matches the repository completion criteria.
  - Alternative considered: Build only `@pastemorphbox/web`. That is faster, but it bypasses the root production command the project already standardizes on.

- Add `_headers` under `apps/web/public`.
  - Rationale: Vite copies public files into `apps/web/dist`, so Cloudflare Pages receives the header rules as part of the static build output.
  - Alternative considered: Configure headers outside the repo in the Cloudflare dashboard. That would be harder to review and reproduce.

## Risks / Trade-offs

- Cloudflare build runtime drift could break installs or builds if defaults change. Mitigation: document explicit `NODE_VERSION` and `PNPM_VERSION` values.
- Aggressive caching could serve stale app bundles. Mitigation: apply immutable caching only to `/assets/*`, where Vite emits content-hashed filenames.
- Future client-side routes may need SPA fallback rules. Mitigation: defer `_redirects` until the app introduces non-root routes.

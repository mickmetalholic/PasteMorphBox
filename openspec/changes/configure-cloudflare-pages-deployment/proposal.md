## Why

PasteMorphBox is ready for its first static deployment, but the repository only states that static assets are produced. Cloudflare Pages needs explicit project/output configuration and deploy guidance so the app can be published repeatably from the monorepo without backend infrastructure.

## What Changes

- Add repository-level Cloudflare Pages configuration for the static Vite build output.
- Document the Cloudflare Pages build command, output directory, and recommended Node/pnpm versions.
- Add static response headers for basic browser security and long-lived caching of hashed assets.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `deployment`: Define Cloudflare Pages as the first supported static deployment target and require deployable static headers/configuration.

## Impact

- Adds Cloudflare Pages configuration at the repository root.
- Adds static host metadata under `apps/web/public`.
- Updates repository deployment documentation.
- No runtime API, backend service, or app behavior changes.

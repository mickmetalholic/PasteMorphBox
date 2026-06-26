## Why

Pull requests need repository-owned checks for tests, type checking, and production builds before they are merged. Cloudflare Pages preview deployments validate deployability, but they do not replace the project's required local quality gates.

## What Changes

- Add a GitHub Actions CI workflow for pull requests and pushes to `main`.
- Run `pnpm test`, `pnpm typecheck`, and `pnpm build` in CI.
- Use the repository package manager version and Node.js runtime expected by the deployment setup.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `developer-workflow`: Add automated CI checks for pull requests and main branch updates.

## Impact

- Adds `.github/workflows/ci.yml`.
- No application runtime behavior changes.
- Enables GitHub branch protection to require CI checks before merging.

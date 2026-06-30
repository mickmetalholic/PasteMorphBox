## Why

The web app and workspace configuration have a few small drift points: web TypeScript allows `.ts` and `.tsx` extension imports even though the app does not need them, the browser TypeScript lib override drops `DOM.Iterable`, oxlint schema paths depend on installed `node_modules`, and CI repeats the pnpm version declared in `package.json`. Tightening these now keeps local and CI validation aligned with the project metadata.

## What Changes

- Remove `allowImportingTsExtensions` from the web app TypeScript configs.
- Preserve `DOM.Iterable` in the web browser TypeScript config when overriding shared libs.
- Point oxlint config schemas at a stable schema URL instead of workspace-local `node_modules` paths.
- Read the CI pnpm version from `package.json#packageManager` instead of hardcoding the same value in the workflow.
- Keep the existing shared strict TypeScript config and `noEmit` behavior unchanged.
- Preserve all runtime behavior and production build output.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `developer-workflow`: Require web TypeScript validation to reject `.ts` and `.tsx` extension imports unless a future config explicitly justifies that behavior, preserve browser iterable DOM types, keep lint config metadata independent of installed dependencies, and keep CI package manager activation sourced from package metadata.

## Impact

- Affects `.github/workflows/ci.yml`, `.oxlintrc.json`, `apps/web/.oxlintrc.json`, `apps/web/tsconfig.app.json`, and `apps/web/tsconfig.node.json`.
- No product UI, routing, tool conversion, dependencies, or public API changes.

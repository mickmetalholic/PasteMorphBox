## Why

The project already has useful root scripts and package boundaries, but several engineering checks are only documented or locally implied. Tightening the workspace configuration now makes future tool-package changes safer, more reproducible, and easier to validate in CI.

## What Changes

- Add a CI quality gate that runs install, lint, tests, typecheck, and production build on pull requests and pushes.
- Pin the runtime expectations for Node and pnpm so local and CI behavior use the same toolchain.
- Declare Turbo build outputs so the web production build can be cached and restored correctly.
- Consolidate shared TypeScript and oxlint configuration so packages do not drift.
- Add coverage for the registry aggregation path and remove no-test pass-through where a test is expected.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `project`: Strengthen workspace and toolchain requirements for reproducible local and CI execution.
- `developer-workflow`: Require automated quality gates for pull requests and pushes.
- `deployment`: Require the static build output to be declared as a build artifact for workspace caching.

## Impact

- Adds GitHub Actions workflow and Node/pnpm runtime configuration.
- Updates root Turbo, TypeScript, oxlint, and package scripts.
- Adds focused registry tests.
- No product UI or tool conversion behavior changes.

## Why

The workspace now has many packages in a single flat `packages/` directory. Tool packages, shared contracts, UI helpers, registry orchestration, and config packages all sit at the same level, which makes the package list harder to scan as the repo grows.

## What Changes

- Group physical package directories by role under `packages/shared`, `packages/tools`, `packages/platform`, and `packages/config`.
- Keep existing package names such as `@pastemorphbox/tool-color` unchanged.
- Update workspace globs and relative lint config paths for nested packages.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `project`: Clarify monorepo package directory organization without changing package APIs.

## Impact

- Affects package physical paths and workspace configuration.
- No intended import specifier, package name, runtime behavior, or dependency changes.

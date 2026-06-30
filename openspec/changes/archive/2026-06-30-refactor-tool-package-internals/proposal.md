## Why

Several tool packages now keep parsing, state building, formatting, field generation, examples, and `ToolModule` definitions in a single `src/index.ts`. The package boundaries are good, but the internals need smaller files so converter logic can grow without turning each tool into a large mixed-responsibility module.

## What Changes

- Split the largest tool packages into focused internal files.
- Keep each package exposing its `ToolModule` through `src/index.ts`.
- Preserve detector and converter behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `tool-modules`: Clarify tool package internal layout while preserving the shared `ToolModule` contract.

## Impact

- Affects internal source layout for selected `packages/tool-*` packages.
- No intended package API, detection, conversion, field, or edit behavior changes.

## Why

Tool packages have clear workspace boundaries, but several still keep parsing, formatting, field building, and `ToolModule` assembly in a single `src/index.ts`. As more tools are added, the repo needs a repeatable package-internal layout so tool behavior can grow without making each package hard to review.

## What Changes

- Define a standard `tool-*` package layout for module assembly, state types, parsing, formatting, and field helpers.
- Document that tool package tests should exercise the public package entrypoint instead of internal helper files.
- Continue the layout cleanup by splitting Base64, URL, JSON, and JWT tool internals.
- Keep every tool package exporting its `ToolModule` through `src/index.ts`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `tool-modules`: Require a maintainable internal layout for independent tool packages while preserving the shared `ToolModule` contract.

## Impact

- Affects selected `packages/tools/tool-*` internals and repository contributor guidance.
- No intended behavior, package-name, dependency, or public import changes.

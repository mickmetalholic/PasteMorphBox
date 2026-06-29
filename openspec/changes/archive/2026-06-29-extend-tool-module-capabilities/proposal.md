## Why

PasteMorphBox is expanding from a small developer conversion set into broad paste-first cleanup, extraction, table, and advanced developer scenarios. The tool contract needs richer metadata so the web app can discover, group, and suggest tool capabilities without hardcoding every tool in app code.

## What Changes

- Extend the `ToolModule` contract with optional category, examples, tags, and fallback suggestion metadata.
- Add shared types for tool categories and examples in `packages/core`.
- Migrate existing tool packages to provide metadata while preserving their current detection and conversion behavior.
- Expose registry helpers for grouped examples and fallback suggestions.
- Update the web app discovery UI to consume registry/tool metadata instead of local hardcoded examples.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `tool-modules`: Tool modules may describe discovery metadata in addition to detection, fields, and serialization behavior.
- `web-app`: The examples surface and no-match guidance are backed by registered tool metadata.

## Impact

- `packages/core` type definitions.
- Existing `packages/tool-*` module exports.
- `packages/registry` helper APIs and tests.
- `apps/web` discovery data source and focused tests.
- No new runtime dependencies.

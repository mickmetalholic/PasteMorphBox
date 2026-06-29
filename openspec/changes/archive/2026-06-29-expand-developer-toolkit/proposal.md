## Why

PasteMorphBox should keep its developer base while broadening to non-developer workflows. Common debugging values such as JWTs, Base64URL, UUIDs, hashes, and HTML entities should produce useful cards without forcing users into separate tools.

## What Changes

- Add a new `packages/tool-developer` package exposing a `ToolModule`.
- Detect and inspect JWTs, Base64URL text, UUIDs, common hash-shaped values, and HTML entity text.
- Provide copyable decoded/encoded fields where deterministic synchronous browser-native behavior is practical.
- Register the developer toolkit with existing tools.
- Add tests for detector and converter behavior.

## Capabilities

### New Capabilities

- `developer-tool`: Developer-oriented inspection and conversion for JWT, Base64URL, UUID, hash-shaped values, and HTML entities.

### Modified Capabilities

- `tool-modules`: The registry includes additional developer utility matches alongside existing specialized converters.

## Impact

- New `packages/tool-developer` workspace package.
- `packages/registry` registration and tests.
- Root workspace lockfile/package graph may update after install.
- No new external runtime dependencies.

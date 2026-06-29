## Why

Paste-first value increases when the app can detect useful data inside encoded or wrapped values. Users commonly paste URL-encoded JSON, Base64/Base64URL JSON, or JWTs and expect the useful inner payload to appear without manually decoding step by step.

## What Changes

- Add registry-level composed detection for one layer of derived text.
- Derive candidate text from percent decoding, URL query parameter values, Base64/Base64URL decoding, and JWT payload decoding.
- Run existing tool detectors against derived candidates and label derived result cards.
- Deduplicate direct and derived matches.
- Add tests for composed detection behavior.

## Capabilities

### New Capabilities

- `smart-detection-composition`: One-layer nested detection from encoded/wrapped pasted input.

### Modified Capabilities

- `tool-modules`: Registry detection includes direct and derived matches while preserving confidence sorting.

## Impact

- `packages/registry` detection orchestration and tests.
- No new runtime dependencies.
- No changes to individual tool conversion packages.

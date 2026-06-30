## Why

`packages/registry/src/index.ts` currently owns tool imports, module ordering, example aggregation, starter/no-match discovery helpers, derived input decoding, deduplication, and ranking. Those concerns are all registry-owned, but keeping them in one file makes future detection and discovery changes harder to review.

## What Changes

- Split registry internals into focused source files.
- Keep `@pastemorphbox/registry` public exports stable through `src/index.ts`.
- Preserve existing detection, ranking, examples, and discovery behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `smart-detection-composition`: Clarify registry implementation boundaries without changing matching behavior.

## Impact

- Affects `packages/registry/src` file organization.
- No intended package API, result ordering, confidence, or discovery helper behavior changes.

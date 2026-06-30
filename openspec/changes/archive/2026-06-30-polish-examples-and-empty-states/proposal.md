## Why

The app already has multiple tool families, but the first screen still relies on a single smart input and a lightly exposed examples panel. Users need clearer, paste-first discovery cues so they can understand available workflows without adding traditional tool navigation.

## What Changes

- Add a curated starter example set for the empty state instead of using the first registered examples.
- Limit and group the examples panel so it reads as a compact capability map across tool categories.
- Refresh the smart input placeholder to mention the broader current input shapes.
- Improve no-match guidance so it suggests stable registered examples without stale copy.
- Add discovery tests for curated starter examples, grouped examples, and no-match suggestions.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `web-app`: Refine the smart-input discovery surfaces for empty, examples, and no-match states.

## Impact

- Affects `packages/registry` discovery helper APIs and tests.
- Affects `apps/web` rendering of placeholder copy, empty state, examples panel, and no-match guidance.
- No new runtime dependencies, routes, or traditional navigation.

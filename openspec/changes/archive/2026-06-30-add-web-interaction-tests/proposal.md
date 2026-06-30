## Why

The web app contains the MVP workflows that preserve the pasted input, edit result cards independently, copy outputs, and explicitly apply card values back to the input. These behaviors are only indirectly protected today, so regressions can pass package-level converter tests.

## What Changes

- Add a jsdom-based React test setup for `apps/web`.
- Add interaction tests for smart input detection, URL search param initialization/clearing, examples, card editing, applying values to input, and clipboard actions.
- Keep tests focused on user-visible behavior rather than CSS implementation details.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `developer-workflow`: Require automated web interaction regression coverage for core paste-first workflows.

## Impact

- Affects `apps/web` test dependencies, test configuration, and tests.
- No intended runtime behavior changes.

## Why

Base64, Base64URL, URL decoding, and JWT payload detection currently overlap across codec and developer utilities. As developer tools are split into smaller modules, the codec boundary needs to be explicit so future improvements do not create duplicate matches, inconsistent labels, or fragile detection order.

## What Changes

- Clarify that URL, Base64, and Base64URL are codec responsibilities, with consistent decoded/encoded/normalized fields.
- Define when Base64URL text should be handled as a standalone codec versus when a dotted JWT should be handled by the JWT tool.
- Refine smart derived detection for percent-decoded input, URL query parameters, Base64, Base64URL, and JWT payloads.
- Add dedupe and confidence rules so derived matches supplement direct matches instead of creating noisy duplicate cards.
- Add focused tests for codec boundary cases and derived candidate composition.

## Capabilities

### New Capabilities

### Modified Capabilities

- `text-codecs`: Expand codec requirements to include Base64URL behavior and clearer URL/Base64 boundaries.
- `smart-detection-composition`: Refine derived detection requirements for decoded candidates, JWT payloads, confidence adjustments, and duplicate suppression.

## Impact

- Affected packages: `packages/tool-base64`, `packages/tool-url`, `packages/registry`, and the JWT package introduced by `split-developer-toolkit`.
- Affected behavior: encoded or wrapped inputs should produce fewer duplicate cards and clearer match titles/subtitles.
- Affected tests: codec package tests and registry composition tests should cover Base64URL, JWT-shaped inputs, URL query parameter values, and derived decoded payloads.

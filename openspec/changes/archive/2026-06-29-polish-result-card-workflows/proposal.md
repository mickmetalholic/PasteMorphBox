## Why

With many more tools and derived detections, result cards can become dense and pasted data may be sensitive. The web app needs result workflow polish so broader coverage stays usable and local-first privacy remains clear.

## What Changes

- Stop writing smart input changes to the URL query string by default.
- Clear an existing `q` query parameter when the user edits, clears, applies, or tries an example.
- Add per-card "Copy all" for visible result fields.
- Collapse cards with many fields and allow explicit expansion.
- Update privacy/status copy to clarify that paste content stays local and is not stored in the URL.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `web-app`: Result cards support bulk copy and field folding; smart input no longer syncs user edits to URL by default.
- `smart-input`: Input updates from explicit actions preserve local-first behavior and remove stale shared query values.

## Impact

- `apps/web` smart input URL handling and result card rendering.
- Existing route `q` loading remains supported.
- No new runtime dependencies.

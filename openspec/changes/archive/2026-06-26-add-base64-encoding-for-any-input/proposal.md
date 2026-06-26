## Why

Users expect Base64 to work as a general text codec, not only as a detector for already-encoded input. When a pasted value is primarily detected as another type, such as a CSS color, the app should still offer a copyable Base64 encoding result without requiring the user to switch tools or rewrite the main input.

## What Changes

- Extend the Base64 tool so any non-empty input can produce a Base64-encoded UTF-8 result.
- Preserve the existing Base64 decode behavior for inputs that look like Base64 and decode to printable text.
- Keep the generic Base64 encoding match lower confidence than more specific conversions so domain-specific result cards remain first.
- Add tests covering generic text encoding and continued Base64 decoding.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `text-codecs`: Base64 codecs now include encoding arbitrary non-empty text, not only detecting already-encoded Base64 text.

## Impact

- Affects `packages/tool-base64` detector behavior and tests.
- Affects result card ordering through confidence scores, but does not change the shared `ToolModule` contract.
- No new runtime dependencies or app routing changes are expected.

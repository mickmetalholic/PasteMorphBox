## 1. Base64 Tool Behavior

- [x] 1.1 Update `packages/tool-base64` so valid printable Base64 input keeps the current decode match behavior.
- [x] 1.2 Add a generic fallback match for arbitrary non-empty input that exposes the original text encoded as UTF-8 Base64.
- [x] 1.3 Assign the generic encoding match a lower confidence score than specific tool detections so it sorts after more relevant cards.

## 2. Tests

- [x] 2.1 Add a test proving ordinary text such as a color string returns an encoded Base64 field.
- [x] 2.2 Keep or extend the existing test proving printable Base64 input decodes correctly.
- [x] 2.3 Add a registry or detection-order test if needed to confirm generic Base64 does not outrank specific matches.

## 3. Verification

- [x] 3.1 Run `pnpm test`.
- [x] 3.2 Run `pnpm typecheck`.
- [x] 3.3 Run `pnpm build`.

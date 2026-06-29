## 1. Codec Boundaries

- [x] 1.1 Update `packages/tool-base64` to expose Base64 and standalone Base64URL codec behavior with clear decoded and normalized fields.
- [x] 1.2 Ensure dotted three-part JWT-shaped input is excluded from standalone Base64URL codec detection.
- [x] 1.3 Keep URL codec behavior focused on percent decoding, URL encoding, and URL part inspection.

## 2. Registry Derived Detection

- [x] 2.1 Refine derived candidate generation for percent-decoded input and URL query parameter values.
- [x] 2.2 Refine derived candidate generation for Base64 and Base64URL decoded text.
- [x] 2.3 Refine JWT payload derived detection so decoded payloads can produce inner matches without replacing direct JWT inspection.
- [x] 2.4 Enforce one-layer derived detection and avoid recursively deriving from derived candidates.

## 3. Ranking and Deduplication

- [x] 3.1 Apply a consistent confidence reduction to derived matches.
- [x] 3.2 Label derived matches with their derivation source in title or subtitle.
- [x] 3.3 Deduplicate repeated derived sources before running detectors.
- [x] 3.4 Deduplicate final matches by tool and source so direct and derived cards do not repeat the same result.

## 4. Tests

- [x] 4.1 Add Base64 package tests for regular Base64, standalone Base64URL, unreadable payloads, and JWT-shaped exclusions.
- [x] 4.2 Add registry tests for percent-decoded input, URL query parameter values, Base64/Base64URL decoded payloads, and JWT payload derived matches.
- [x] 4.3 Add registry tests confirming duplicate derived sources and duplicate final matches are suppressed.

## 5. Verification

- [x] 5.1 Run `pnpm test`.
- [x] 5.2 Run `pnpm typecheck`.
- [x] 5.3 Run `pnpm build`.
- [x] 5.4 Run `pnpm lint`.

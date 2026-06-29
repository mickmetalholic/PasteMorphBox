## Context

PasteMorphBox already detects URL, Base64, Base64URL, and JWT-related inputs, and the registry can run tools against one layer of derived decoded text. The current behavior works, but the responsibility split is implicit: Base64URL appears in developer utilities, Base64 appears in codec utilities, JWT payload decoding appears in both tool-level and registry-level logic, and derived matches can compete with direct matches. This becomes riskier after `split-developer-toolkit`, where JWT moves into its own tool.

## Goals / Non-Goals

**Goals:**

- Make URL, Base64, and Base64URL codec behavior explicit and testable.
- Keep JWT inspection separate from standalone Base64URL conversion.
- Ensure derived detection adds useful cards for wrapped payloads without creating noisy duplicates.
- Preserve paste-first behavior and existing result card controls.

**Non-Goals:**

- Add cryptographic verification, JWT signature validation, or JWK support.
- Add binary Base64 file decoding or non-text payload rendering.
- Add recursive multi-layer decoding beyond one derived layer.
- Redesign result cards or examples layout.

## Decisions

- Treat standalone Base64 and Base64URL as codec work, but treat dotted three-part JWT input as JWT work.
  - Rationale: users expect Base64URL strings to decode like codec values, while JWTs need semantic header/payload fields.
  - Alternative considered: keep Base64URL only in developer tools. That blurs the codec boundary and makes URL-safe Base64 harder to evolve with regular Base64.

- Keep derived detection in the registry, not inside individual tools.
  - Rationale: URL query parameters, percent decoding, Base64 decoding, and JWT payload extraction are wrappers around many possible inner tools.
  - Alternative considered: make each tool inspect wrappers itself. That duplicates wrapper parsing and creates inconsistent labels.

- Limit derived detection to one layer.
  - Rationale: one layer covers common paste cases such as encoded URL params and JWT payloads while keeping detection predictable.
  - Alternative considered: recursive decoding. That increases false positives and makes result ranking harder to explain.

- Lower confidence for derived matches and label the derivation source.
  - Rationale: direct matches should rank first, and users need to understand why a card appeared.
  - Alternative considered: use the inner tool's original confidence unchanged. That can make hidden payloads outrank the pasted value.

## Risks / Trade-offs

- Some Base64URL strings can also look like other identifiers. Mitigation: keep confidence conservative and add boundary tests.
- One-layer decoding will miss deeply nested payloads. Mitigation: keep MVP predictable and revisit recursion only with explicit UX support.
- Moving Base64URL from developer utilities to codec tools can affect Examples order. Mitigation: retain `developer` or codec-relevant metadata carefully and test grouped examples.
- JWT payload derived detection can duplicate direct JWT inspection. Mitigation: dedupe by tool/source and keep JWT direct detection responsible for the original token.

## Migration Plan

1. Apply after `split-developer-toolkit` so JWT has a dedicated module.
2. Update `packages/tool-base64` to own Base64 and Base64URL codec behavior.
3. Update registry derived candidate generation and labels for URL params, percent decoding, Base64, Base64URL, and JWT payloads.
4. Add boundary tests for Base64URL, JWT-shaped input, URL query params, and duplicate decoded sources.
5. Run `pnpm test`, `pnpm typecheck`, `pnpm build`, and `pnpm lint`.

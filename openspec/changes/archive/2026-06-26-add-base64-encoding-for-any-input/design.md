## Context

PasteMorphBox routes pasted input through all registered tool modules and renders every returned match as a result card. The Base64 tool currently behaves only as a decoder detector: it returns a match when the input looks like Base64, decodes successfully as UTF-8, and is mostly printable. That leaves ordinary text values, including values already detected by other tools such as colors or JSON, without a Base64 encoding result.

The existing architecture already supports multiple matches per input and independent tool packages, so this change can stay inside `packages/tool-base64` without changing the registry, core contracts, or web layout.

## Goals / Non-Goals

**Goals:**

- Return a Base64 result for any non-empty normalized input.
- Preserve decoded-text output when the input is valid printable Base64.
- Keep generic Base64 encoding lower ranked than more specific tool matches.
- Cover both generic encoding and valid Base64 decoding with tests.

**Non-Goals:**

- Do not add a global tool picker or manual navigation.
- Do not recursively detect decoded Base64 content as another tool.
- Do not add binary file Base64 handling.
- Do not change the shared `ToolModule` contract.

## Decisions

- Keep the capability in `packages/tool-base64`.
  - Rationale: Base64 remains a text codec, and the existing package already owns UTF-8 Base64 encode/decode helpers.
  - Alternative considered: add a separate always-on text encoding package. That would split one codec across packages and add unnecessary registry surface.

- Return a generic encoding match for any non-empty input that is not already handled as printable Base64 decode.
  - Rationale: this gives users a predictable Base64 encoding card while avoiding duplicate Base64 cards for the common encoded-input case.
  - Alternative considered: return both decode and encode matches for valid Base64 input. The current Base64 card already includes both decoded and encoded fields, so a second card would be redundant.

- Use a lower confidence score for generic encoding than domain-specific detections.
  - Rationale: color, JSON, URL, and timestamp cards should remain the primary result when the input clearly belongs to those domains.
  - Alternative considered: make generic Base64 high confidence because it always applies. That would push less useful generic output above more relevant conversions.

## Risks / Trade-offs

- More inputs will show one extra result card -> mitigate by using low confidence so it appears after specific matches.
- Very short or accidental input will still produce Base64 output -> mitigate by following the app's paste-first model and keeping the behavior copyable but non-destructive.
- Valid Base64 strings will not produce a separate "encode this literal string" card -> mitigate by keeping the existing card's encoded field, which preserves normalized Base64 for the decoded text.

## Migration Plan

No data migration is needed. Deploying the package change updates detection behavior immediately; rollback is the removal of the generic encoding fallback.

## Open Questions

- None.

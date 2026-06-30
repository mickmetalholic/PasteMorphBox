## Why

PasteMorphBox now detects many paste shapes from the same input, so a useful first result depends on ranking quality more than raw tool coverage. Weak generic matches such as text cleanup, HTML entity encoding, or broad date/number extraction must not outrank strong structured matches like JSON, JWT, URL, table, or color conversions.

## What Changes

- Add a registry-level ranking policy that adjusts detector confidence by match intent, tool specificity, and direct-versus-derived source.
- Keep direct specialized matches ahead of generic cleanup/extraction matches when both apply to the same paste.
- Keep derived matches labeled and useful, but avoid letting hidden payload matches outrank a strong direct interpretation unless their adjusted score is clearly higher.
- Add ranking regression tests for realistic paste scenarios: JSON, URL with query payload, JWT, tables, contact notes, HTML entity text, and plain messy text.

## Capabilities

### New Capabilities

### Modified Capabilities

- `smart-detection-composition`: Add explicit ranked-result behavior for direct and derived matches across specialized and generic tools.

## Impact

- Affected package: `packages/registry`.
- Affected behavior: result card order changes for inputs with multiple plausible matches.
- Affected tests: registry ranking tests will encode expected first-card behavior for common paste scenarios.

## Why

Many non-developer users paste messy customer, recruiting, support, sales, or operations text and need the useful entities pulled out quickly. Extraction broadens PasteMorphBox from conversion into practical text organization while preserving the paste-first card model.

## What Changes

- Add a new `packages/tool-extract` package exposing a `ToolModule`.
- Detect extractable entities in pasted text: emails, URLs, phone-like numbers, dates, money amounts, numbers, domains, hashtags, mentions, and IP addresses.
- Provide copyable fields for each detected entity class plus a CSV export field.
- Deduplicate extracted values while preserving first-seen order.
- Register the extraction tool after specialized converters and before broad text cleanup.
- Add detector/converter tests for extraction behavior.

## Capabilities

### New Capabilities

- `extract-tool`: Entity extraction from messy pasted text with list and CSV outputs.

### Modified Capabilities

- `tool-modules`: The registry includes extraction before generic text cleanup so entity-rich text gets a stronger card.

## Impact

- New `packages/tool-extract` workspace package.
- `packages/registry` registration and tests.
- Root workspace lockfile/package graph may update after install.
- No new external runtime dependencies.

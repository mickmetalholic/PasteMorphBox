## Why

PasteMorphBox needs a broadly useful non-developer entry point. Plain and messy text is the most common pasted input, and users should receive useful cleanup, counting, and list transformation cards even when no specialized converter matches.

## What Changes

- Add a new `packages/tool-text` package exposing a `ToolModule`.
- Detect ordinary text and multi-line lists as low-confidence fallback matches.
- Provide cleanup outputs: trimmed lines, removed empty lines, normalized whitespace, deduplicated lines, sorted lines, joined lines, uppercase, lowercase, title case, and word/character/line counts.
- Register the text tool after specialized tools so it does not outrank explicit JSON, URL, time, color, or Base64 matches.
- Add detector/converter tests for text cleanup behavior.

## Capabilities

### New Capabilities

- `text-tool`: Plain text cleanup, list transformation, case conversion, and text statistics.

### Modified Capabilities

- `tool-modules`: The registry includes a low-confidence fallback text tool without changing specialized tool ordering.

## Impact

- New `packages/tool-text` workspace package.
- `packages/registry` registration and tests.
- Root workspace lockfile/package graph may update after install.
- No new external runtime dependencies.

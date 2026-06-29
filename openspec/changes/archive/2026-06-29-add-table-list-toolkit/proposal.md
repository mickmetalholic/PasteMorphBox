## Why

Office, operations, and content users often paste semi-structured rows that need to become CSV, TSV, Markdown tables, numbered lists, or bullet lists. Adding a table/list toolkit makes PasteMorphBox useful for spreadsheet and document cleanup without a traditional tool picker.

## What Changes

- Add a new `packages/tool-table` package exposing a `ToolModule`.
- Detect CSV, TSV, Markdown table, pipe-delimited rows, and multi-line lists.
- Convert detected rows into Markdown table, CSV, TSV, numbered list, and bullet list outputs.
- Register the table tool before generic text cleanup.
- Add tests for table detection, conversion, and registry ordering.

## Capabilities

### New Capabilities

- `table-tool`: Table and list conversion for delimited rows and multi-line lists.

### Modified Capabilities

- `tool-modules`: The registry includes table/list matches before generic text cleanup when applicable.

## Impact

- New `packages/tool-table` workspace package.
- `packages/registry` registration and tests.
- Root workspace lockfile/package graph may update after install.
- No new external runtime dependencies.

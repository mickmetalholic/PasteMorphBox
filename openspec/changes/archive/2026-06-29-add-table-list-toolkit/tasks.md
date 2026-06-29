## 1. Package Setup

- [x] 1.1 Create `packages/tool-table` package, tsconfig, and package scripts.
- [x] 1.2 Add the package to the workspace lockfile/package graph as needed.

## 2. Table Tool Implementation

- [x] 2.1 Implement table/list detection and row normalization.
- [x] 2.2 Implement Markdown, CSV, TSV, numbered list, and bullet list outputs.
- [x] 2.3 Add table tool discovery metadata and examples.

## 3. Registry Integration

- [x] 3.1 Register the table tool before generic text cleanup.
- [x] 3.2 Update registry tests for display order and table-over-text ranking.

## 4. Tests

- [x] 4.1 Add detector and converter tests for table/list behavior.
- [x] 4.2 Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.

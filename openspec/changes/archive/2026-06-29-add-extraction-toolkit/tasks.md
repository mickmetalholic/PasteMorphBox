## 1. Package Setup

- [x] 1.1 Create `packages/tool-extract` package, tsconfig, and package scripts.
- [x] 1.2 Add the package to the workspace lockfile/package graph as needed.

## 2. Extract Tool Implementation

- [x] 2.1 Implement extraction state and supported entity regexes.
- [x] 2.2 Implement deduplicated entity fields and CSV output.
- [x] 2.3 Add extract tool discovery metadata and examples.

## 3. Registry Integration

- [x] 3.1 Register extraction after specialized converters and before text cleanup.
- [x] 3.2 Update registry tests for display order and extraction-over-text ranking.

## 4. Tests

- [x] 4.1 Add detector and converter tests for extraction behavior.
- [x] 4.2 Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.

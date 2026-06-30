## 1. OpenSpec Artifacts

- [x] 1.1 Create proposal, design, and task artifacts for tool internals split.

## 2. Tool Package Splits

- [x] 2.1 Split `tool-color` parsing, formatting, and types from the module definition.
- [x] 2.2 Split `tool-table` state building and types from the module definition.
- [x] 2.3 Split `tool-time` timestamp parsing/formatting and types from the module definition.
- [x] 2.4 Split `tool-text` state building and types from the module definition.
- [x] 2.5 Split `tool-extract` state building and types from the module definition.
- [x] 2.6 Keep each affected package exporting its `ToolModule` from `src/index.ts`.

## 3. Verification

- [x] 3.1 Run `pnpm test`.
- [x] 3.2 Run `pnpm typecheck`.
- [x] 3.3 Run `pnpm build`.

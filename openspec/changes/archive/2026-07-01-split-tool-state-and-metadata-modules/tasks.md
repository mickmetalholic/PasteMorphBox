## 1. Metadata Extraction

- [x] 1.1 Add `metadata.ts` to each tool package with descriptive metadata and examples.
- [x] 1.2 Refactor each tool `src/index.ts` to assemble `ToolModule` from imported metadata and helper functions.
- [x] 1.3 Verify registry example aggregation still reads every tool example through public module metadata.

## 2. Focused Internal Splits

- [x] 2.1 Split table parsing and formatting helpers out of `tool-table/src/table-state.ts`.
- [x] 2.2 Split extract patterns and CSV formatting helpers out of `tool-extract/src/extract-state.ts`.
- [x] 2.3 Split URL decode/parse helpers out of `tool-url/src/url-state.ts`.
- [x] 2.4 Review Base64 codec helpers and split only if a clear focused boundary remains useful.

## 3. Verification

- [x] 3.1 Run `pnpm test` and fix regressions.
- [x] 3.2 Run `pnpm typecheck` and fix type errors.
- [x] 3.3 Run `pnpm build` and fix production build errors.
- [x] 3.4 Review changed files for unnecessary tiny modules, large functions, or behavior drift.

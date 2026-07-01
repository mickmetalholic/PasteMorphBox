## 1. Baseline and Regression Tests

- [x] 1.1 Add or update registry tests for URL query values containing embedded separators, Base64/Base64URL derived payloads, JWT payload derivation, and one-layer-only derived detection.
- [x] 1.2 Add or update registry tests for semantic deduplication so equivalent direct/derived matches collapse while distinct same-tool same-source matches are preserved.
- [x] 1.3 Add or update registry tests that prove every registered tool has an explicit ranking policy or manifest-backed default.
- [x] 1.4 Add or update web interaction tests for card-local edits, apply-to-input, field copy, card bulk copy, and retained card state after match updates.
- [x] 1.5 Add lightweight reusable tool contract test helpers or shared test patterns where existing tool tests repeat field identity, editability, copy value, or serialization assertions.

## 2. Tool Helper Extraction

- [x] 2.1 Extract focused Base64/Base64URL decode helpers from `tool-base64` so registry derivation can reuse them without duplicating decoder logic.
- [x] 2.2 Extract focused URL query parameter and percent-decoding helpers from `tool-url` or a tool-adjacent module, using `URLSearchParams` for query parsing.
- [x] 2.3 Extract focused JWT payload decode helper from `tool-jwt` so registry derivation can reuse it without duplicating payload decoding.
- [x] 2.4 Move non-trivial field-building logic out of tool `src/index.ts` files into package-local `fields.ts` files where branching or repeated field construction exists.
- [x] 2.5 Move any remaining non-trivial parser, formatter, state, or edit helpers out of tool `src/index.ts` files while keeping public tests importing through `./index`.

## 3. Registry Refactor

- [x] 3.1 Refactor `derived-candidates` into small candidate producer functions for percent decoding, URL query parameters, Base64/Base64URL payloads, and JWT payloads.
- [x] 3.2 Update derived candidate production to reuse exported tool helpers and dedupe candidate sources before detector execution.
- [x] 3.3 Move ranking bias into manifest-backed metadata or a focused manifest-adjacent policy module.
- [x] 3.4 Refactor deduplication to use a semantic match key that preserves distinct same-tool same-source matches.
- [x] 3.5 Keep the public registry API stable while splitting orchestration into focused modules for derivation, ranking policy, deduplication, manifest access, and detection.

## 4. Web Result Card Refactor

- [x] 4.1 Add an app-local resolved card model/helper that maps registry matches plus card state into render fields, primary value, edit action, copy payloads, and display metadata.
- [x] 4.2 Move card state reconciliation from `ResultList` into a focused `useCardStates` hook or utility.
- [x] 4.3 Move repeated clipboard success timer behavior into a focused `useClipboardFeedback` hook or utility.
- [x] 4.4 Refactor `ResultList`, `ToolCard`, `FieldRow`, and `EditableValue` so presentational components do not perform registry module lookup.
- [x] 4.5 Verify card edits remain local until explicit apply-to-input and that result card copy actions continue to use visible field values.

## 5. Workspace and Manifest Inventory

- [x] 5.1 Consolidate or mechanically connect the registered tool manifest and web workspace transpilation inventory so adding a tool has one clear update path.
- [x] 5.2 Add a focused test or static assertion that the registry manifest and workspace transpilation inventory remain consistent where they overlap.
- [x] 5.3 Keep static imports and static manifest ordering inspectable for the frontend bundle.

## 6. Verification

- [x] 6.1 Run `pnpm test` and fix any regressions.
- [x] 6.2 Run `pnpm typecheck` and fix any type errors.
- [x] 6.3 Run `pnpm build` and fix any production build errors.
- [x] 6.4 Review changed files for large new modules, broad functions, or presentation components that still mix orchestration with rendering.

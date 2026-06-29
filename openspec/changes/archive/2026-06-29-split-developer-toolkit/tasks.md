## 1. Package Structure

- [x] 1.1 Create `packages/tool-jwt` with package metadata, TypeScript config, source entry, and test entry following existing tool package conventions.
- [x] 1.2 Create `packages/tool-uuid` with package metadata, TypeScript config, source entry, and test entry following existing tool package conventions.
- [x] 1.3 Create `packages/tool-hash` with package metadata, TypeScript config, source entry, and test entry following existing tool package conventions.
- [x] 1.4 Create `packages/tool-html-entities` with package metadata, TypeScript config, source entry, and test entry following existing tool package conventions.

## 2. Capability Migration

- [x] 2.1 Move JWT detection, header/payload decoding, field generation, examples, serialization, and tests into `packages/tool-jwt`.
- [x] 2.2 Move UUID detection, version inspection, field generation, examples, serialization, and tests into `packages/tool-uuid`.
- [x] 2.3 Move hash shape detection, field generation, examples, serialization, and tests into `packages/tool-hash`.
- [x] 2.4 Move HTML entity detection, encode/decode logic, field generation, examples, serialization, and tests into `packages/tool-html-entities`.

## 3. Registry Integration

- [x] 3.1 Update workspace dependencies so the registry can import the new specialized packages.
- [x] 3.2 Replace `developerTool` registration with direct registration of `jwtTool`, `uuidTool`, `hashTool`, and `htmlEntitiesTool`.
- [x] 3.3 Add or update registry tests covering representative inputs for each split developer-category module.

## 4. Aggregate Package Removal

- [x] 4.1 Remove `@pastemorphbox/tool-developer` from active workspace references after behavior has been migrated.
- [x] 4.2 Delete or retire `packages/tool-developer` files so no aggregate developer module remains registered.
- [x] 4.3 Confirm the Examples panel still groups the split tools under Developer through module metadata.

## 5. Verification

- [x] 5.1 Run `pnpm test`.
- [x] 5.2 Run `pnpm typecheck`.
- [x] 5.3 Run `pnpm build`.
- [x] 5.4 Run `pnpm lint`.

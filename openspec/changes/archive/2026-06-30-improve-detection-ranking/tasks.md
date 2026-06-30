## 1. Ranking Policy

- [x] 1.1 Add a registry ranking function that applies deterministic adjustments before final sorting.
- [x] 1.2 Calibrate structured tools, developer utilities, extraction, tables, and text cleanup so broad fallback tools rank behind higher-intent matches.
- [x] 1.3 Preserve direct and derived match labels and confidence display semantics.

## 2. Ranking Tests

- [x] 2.1 Add registry tests that keep JSON, URL, JWT, table, and color inputs ahead of generic text cleanup.
- [x] 2.2 Add registry tests that keep extraction ahead of text cleanup for contact or payment notes.
- [x] 2.3 Add registry tests that prevent weak HTML entity/time-like matches from outranking stronger interpretations.
- [x] 2.4 Add registry tests that derived payload matches remain visible but are ranked behind strong direct interpretations.
- [x] 2.5 Add registry tests that plain text still returns text cleanup.

## 3. Verification

- [x] 3.1 Run `pnpm test`.
- [x] 3.2 Run `pnpm typecheck`.
- [x] 3.3 Run `pnpm build`.
- [x] 3.4 Run `pnpm lint`.

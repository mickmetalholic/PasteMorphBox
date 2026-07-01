## Context

Tool packages now have `fields.ts` and focused state helpers, but `src/index.ts` still contains repeated metadata and example arrays. The largest remaining internals are state/codec files such as table parsing/formatting, extraction patterns/CSV formatting, URL parsing/decoding, and Base64 encoding/decoding.

## Goals / Non-Goals

**Goals:**

- Move metadata and examples into `metadata.ts` files for every tool package.
- Split large state/codec files only where there is a clear responsibility boundary.
- Keep `index.ts` readable and consistent across tools.
- Preserve all public behavior and keep tests importing through public `./index`.

**Non-Goals:**

- No new tool behavior.
- No registry API redesign.
- No dynamic plugin discovery.
- No broad test rewrite.

## Decisions

### 1. Add `metadata.ts` per tool package

Each tool package will export a package-local metadata object containing `id`, `name`, `description`, `category`, `tags`, and `examples`. `index.ts` will spread or reference that metadata when assembling the `ToolModule`.

Alternative considered: central metadata manifest in the registry. This was rejected because tool examples and tool descriptions are capability-owned behavior and should live with the tool package.

### 2. Split only genuinely multi-responsibility internals

Large files will be split when names map clearly to responsibilities:

- table parsing/formatting can become `parse.ts` and `format.ts`
- extraction patterns and CSV formatting can become `patterns.ts` and `format.ts`
- URL parsing/decoding can be separated from state assembly
- Base64 text encoding/decoding helpers can be grouped without changing public behavior

Tiny tools should not gain extra files just for symmetry beyond metadata extraction.

### 3. Keep tests public and behavior-oriented

Existing package tests should continue importing the public `./index` module. New helper files are verified through existing behavior tests unless a helper has intentionally exported behavior.

## Risks / Trade-offs

- [Risk] Too many tiny files reduce local readability. -> Mitigation: split only metadata and clear multi-responsibility internals.
- [Risk] Metadata extraction can accidentally change examples. -> Mitigation: keep registry tests for registered examples and no-match suggestions.
- [Risk] Parser/formatter splits can introduce import cycles. -> Mitigation: keep helpers pure and one-directional.

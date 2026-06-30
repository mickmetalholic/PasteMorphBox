## Context

Tool packages are independent and expose `ToolModule`. Most packages currently put all internals in `src/index.ts`, which kept early development fast but now makes larger tools harder to scan. The most affected packages are color, table, time, text, and extract.

## Goals / Non-Goals

**Goals:**

- Reduce large tool `index.ts` files to package API/module definitions.
- Move state types, parsing, state building, and formatting into focused files.
- Keep tests colocated with package behavior and unchanged unless imports need a stable public path.

**Non-Goals:**

- Change tool behavior or confidence values.
- Add shared abstractions across tools before duplication proves costly.
- Move package directories; workspace grouping is handled separately.

## Decisions

- Keep `src/index.ts` as the public export file for each tool package.
- Use simple local file names such as `types.ts`, `parse-color.ts`, `format.ts`, `table-state.ts`, `time-format.ts`, `text-state.ts`, and `extract-state.ts`.
- Export only what the package-level module needs; avoid introducing cross-tool shared utilities in this change.

## Risks / Trade-offs

- Internal exports can become too broad. Mitigation: keep helpers package-local and only export functions used across files.
- Mechanical moves can introduce subtle import mistakes. Mitigation: run full tests, typecheck, and build after the split.

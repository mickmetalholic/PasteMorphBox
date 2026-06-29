## Context

The first discovery upgrade introduced app-local paste examples. That is acceptable for the initial UI, but it will not scale as new tool packages are added. Tool capabilities already live in independent `packages/tool-*` packages, so discoverability metadata should live with those modules and be composed by the registry.

## Goals / Non-Goals

**Goals:**

- Add optional discovery metadata without breaking existing tool behavior.
- Keep `ToolModule` as the single capability export for each tool package.
- Let the registry provide grouped examples and fallback suggestions for app rendering.
- Migrate current tools to the new metadata so app-local example definitions can be removed.

**Non-Goals:**

- Add the text cleanup, extraction, table, or advanced developer tools themselves.
- Change match confidence sorting.
- Add user-specific personalization or persistence.
- Introduce a server or external catalog.

## Decisions

- Add optional fields to `ToolModule` instead of wrapping modules in a second registry-only data structure. This keeps capability ownership inside tool packages and avoids a parallel metadata map.
- Use a small category union (`clean`, `extract`, `convert`, `inspect`, `table`, `developer`) to support broad grouping while avoiding premature taxonomy complexity.
- Represent examples as source text plus label/description. The app can feed `source` into the existing smart input path, preserving original input semantics.
- Represent fallback suggestions with a boolean `suggestWhenNoMatch` on examples. The registry can return suggestions without deciding UI copy.
- Keep metadata optional. Future tools can be added incrementally, and tests will ensure registered examples remain valid.

## Risks / Trade-offs

- Category names may evolve as the product broadens -> keep them small and centralized in core types.
- Examples can become stale when tool detection changes -> registry tests will assert every example produces at least one match for its owning tool.
- Registry helpers add app-facing API surface -> keep them read-only and derived from `toolModules`.

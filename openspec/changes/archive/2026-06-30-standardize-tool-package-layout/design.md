## Context

PasteMorphBox keeps conversion capabilities in independent `packages/tools/tool-*` packages. The first package-level refactor split the largest tools, but Base64, URL, JSON, and JWT still mix domain logic and module assembly in their `index.ts` files. Contributor guidance also still describes the older flat package paths.

## Goals / Non-Goals

**Goals:**

- Establish a tool package layout convention that scales to future tools.
- Keep `src/index.ts` as the public package entrypoint and `ToolModule` assembly file.
- Split Base64, URL, JSON, and JWT logic into focused internal files.
- Update contributor guidance to use the current grouped package paths.

**Non-Goals:**

- Change detector confidence, field output, serialization, or example behavior.
- Add a generator or CLI for creating tool packages in this change.
- Introduce shared cross-tool abstractions before duplication becomes concrete.

## Decisions

- Tool packages should use `types.ts` for state/domain types and add focused files such as `codec.ts`, `*-state.ts`, `parse.ts`, `format.ts`, or `fields.ts` as complexity requires.
- Tests should import from `./index` so they verify public package behavior rather than internal file names.
- `index.ts` should remain the public export surface and should not carry large parser/formatter implementations.
- The convention is documented in AGENTS and README so both Codex and contributors have the same source-level expectations.

## Risks / Trade-offs

- More files can make very small tools feel verbose. Mitigation: the layout allows optional helper files; tiny tools can stay compact until complexity appears.
- Mechanical extraction can change behavior accidentally. Mitigation: keep logic equivalent and run tool, registry, and full repository checks.

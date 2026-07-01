## Why

The previous registry/card refactor made tool entrypoints thinner, but most tool `src/index.ts` files still mix module metadata, examples, detector wiring, and public exports. A second focused pass can make tool packages easier to scan and safer to extend without changing user-visible behavior.

## What Changes

- Move tool metadata and examples out of tool `src/index.ts` files into package-local `metadata.ts` modules.
- Split the largest tool state modules into focused parser, formatter, pattern, or codec helpers where the existing files already contain multiple responsibilities.
- Keep every tool package public entrypoint focused on exports and `ToolModule` assembly.
- Preserve current detection, fields, serialization, examples, and registry behavior.
- Add or adjust tests only where needed to prove behavior remains stable.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `tool-modules`: Tighten tool package layout expectations for metadata/example modules and multi-responsibility state files.
- `developer-workflow`: Preserve public-entrypoint tests while allowing package-local helper modules to be refactored.
- `project`: Reinforce the small-module guardrail for follow-up refactors.

## Impact

- Affected packages:
  - `packages/tools/tool-*`
  - `packages/platform/registry` only if metadata exports affect registry aggregation
  - `openspec/specs/*` for archived and new architectural requirements
- No runtime dependency changes are expected.
- No user-visible product behavior changes are intended.

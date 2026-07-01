## Why

PasteMorphBox has a clean package split, but the current implementation still has several growth points that will become harder to maintain as more tools are added: duplicated decoding logic in the registry, hardcoded ranking policy, duplicated registration inventory, and web result cards that reach back into the registry at render time.

This change tightens the architecture before the toolbox grows further, with an explicit emphasis on small modules, focused functions, and avoiding large files, large components, and broad orchestration functions.

## What Changes

- Refactor derived detection so decoding and wrapper extraction logic is shared with tool/package capabilities instead of duplicated inside the registry.
- Refactor registry result composition so web rendering can consume a resolved card/render model without ad hoc `toolId` module lookups inside card components.
- Move ranking and deduplication policy into a clearer registry policy layer or manifest-backed metadata, with tests that protect ordering and duplicate behavior.
- Reduce duplicated workspace/tool inventory where practical, while preserving the static manifest requirement for the MVP.
- Continue thinning tool package `src/index.ts` files by moving non-trivial field-building, parsing, formatting, and state logic into focused package-local files.
- Extract web card state, clipboard feedback, and result rendering helpers into small hooks/utilities so result components remain presentational and manageable.
- Add reusable contract-oriented test helpers or patterns for tool modules, registry orchestration, and result card workflows.
- Preserve current user-facing behavior: paste-first input, local-only conversions, ranked result cards, copy actions, card-local edits, and explicit apply-to-input.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `tool-modules`: Clarify that tool packages should expose reusable focused helpers for non-trivial detection, derivation, field-building, and serialization work while keeping `index.ts` as assembly.
- `smart-detection-composition`: Refine derived detection, ranking, deduplication, and static manifest behavior so orchestration remains modular and avoids duplicated conversion logic.
- `web-app`: Refine result card composition so card rendering uses resolved tool/card data and small local hooks instead of registry lookups embedded in presentation components.
- `developer-workflow`: Add expectations for reusable contract/regression tests when changing tool modules, registry orchestration, and web result-card interactions.
- `project`: Tighten workspace inventory and architecture conventions so shared configuration and tool lists avoid unnecessary duplication while retaining static imports.

## Impact

- Affected packages:
  - `packages/shared/core`
  - `packages/platform/registry`
  - `packages/tools/tool-*`
  - `apps/web`
  - `packages/shared/ui` only if small reusable UI helpers are needed
- Affected tests:
  - Tool package behavior tests under each package `src` tree
  - Registry orchestration tests in `packages/platform/registry/src`
  - Web interaction tests under `apps/web/src/test`
- No expected runtime dependency changes unless a small mature helper is justified by existing conversion logic.
- No breaking user-facing behavior is intended.

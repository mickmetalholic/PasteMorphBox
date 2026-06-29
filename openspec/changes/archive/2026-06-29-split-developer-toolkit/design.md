## Context

PasteMorphBox currently exposes several unrelated developer utilities through one `packages/tool-developer` module. That package detects JWTs, Base64URL strings, UUIDs, hash-shaped values, and HTML entities, then branches internally for fields and serialization. This conflicts with the project rule that tool capabilities should live in independent `packages/tool-*` packages, and it makes future improvements harder because each capability shares one detector surface and one test suite.

## Goals / Non-Goals

**Goals:**

- Split developer utilities into focused packages with one primary capability per `ToolModule`.
- Preserve the paste-first UI and keep the Examples grouping under the existing `developer` category.
- Preserve current detection and output behavior for JWT, UUID, hash, and HTML entity inputs.
- Make each capability independently testable and iteratable.

**Non-Goals:**

- Add new JWT verification, hash generation, UUID generation, or HTML sanitization features.
- Add a traditional tool navigation or change the smart input interaction model.
- Redesign the result card UI.
- Change Base64/Base64URL codec policy beyond the boundary decisions handled by `refine-codec-tools`.

## Decisions

- Create dedicated packages: `packages/tool-jwt`, `packages/tool-uuid`, `packages/tool-hash`, and `packages/tool-html-entities`.
  - Rationale: each capability owns its detector, examples, field generation, serialization, and tests.
  - Alternative considered: keep one `tool-developer` package with multiple exported modules. That reduces package count but still keeps unrelated logic colocated, so future changes remain coupled.

- Keep `category: 'developer'` on each split module.
  - Rationale: code boundaries improve without changing the user's mental model or adding tool navigation.
  - Alternative considered: add more categories such as `security` or `encoding`. That creates product taxonomy work outside this refactor.

- Register split modules directly in `packages/registry`.
  - Rationale: registry ordering and detection dedupe should operate on real capabilities instead of a catch-all module.
  - Alternative considered: preserve `developerTool` as a compatibility wrapper. That would hide the architectural split and risks duplicate matches.

- Remove `@pastemorphbox/tool-developer` from the registry after the split.
  - Rationale: the aggregate package should not remain an active capability after its behavior is migrated.
  - Alternative considered: leave it as deprecated but registered. That would duplicate user-facing matches.

## Risks / Trade-offs

- Match ordering may shift because one aggregate detector becomes several modules. Mitigation: keep confidence scores equivalent to current behavior and add registry tests for representative inputs.
- Internal imports may break if they reference `@pastemorphbox/tool-developer`. Mitigation: update workspace references and run `pnpm typecheck`.
- More packages add maintenance overhead. Mitigation: keep package structure identical to existing tool packages and share only the existing `ToolModule` contract.
- Removing the aggregate package may affect historical docs. Mitigation: update OpenSpec and package references in the same change.

## Migration Plan

1. Create split packages with tests copied from the current developer coverage.
2. Move each capability's detector and field logic into its package.
3. Update registry imports and module order.
4. Remove or stop publishing `packages/tool-developer` in the workspace.
5. Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.

Rollback: restore the registry import of `developerTool` and the old package if the split creates unexpected detection regressions.

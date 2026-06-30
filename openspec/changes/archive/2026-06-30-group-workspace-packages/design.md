## Context

PasteMorphBox has independent tool packages, shared contracts, UI utilities, registry orchestration, and shared config packages. A flat `packages/*` layout worked early, but it no longer communicates package roles clearly.

## Goals / Non-Goals

**Goals:**

- Group packages by role while preserving package names.
- Keep source imports stable for app and package consumers.
- Update workspace discovery and package-local scripts.

**Non-Goals:**

- Rename packages or npm scopes.
- Merge tool packages.
- Change tool or registry behavior.

## Decisions

- Use `packages/shared` for `core` and `ui`.
- Use `packages/tools` for all `tool-*` packages.
- Use `packages/platform` for `registry`.
- Use `packages/config` for shared config packages.
- Change `pnpm-workspace.yaml` to match `packages/*/*`.
- Update nested package lint scripts from `../../.oxlintrc.json` to `../../../.oxlintrc.json`.

## Risks / Trade-offs

- Some tooling can assume flat package paths. Mitigation: run full `pnpm test`, `pnpm typecheck`, and `pnpm build`.
- Physical moves make diffs larger. Mitigation: keep package names, exports, and source imports unchanged.

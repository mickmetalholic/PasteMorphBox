## Context

PasteMorphBox is a pure frontend, paste-first toolbox built as a pnpm/Turborepo monorepo. The current package boundaries are already useful: conversion behavior lives in `packages/tools/tool-*`, shared contracts live in `packages/shared/core`, registry orchestration lives in `packages/platform/registry`, and `apps/web` owns routing, state, layout, and rendering.

The next maintenance risk is not the top-level split, but repeated and widening implementation details inside those boundaries:

- `packages/platform/registry/src/derived-candidates.ts` duplicates URL/Base64/JWT decoding logic that already belongs near tool capabilities.
- `packages/platform/registry/src/ranking.ts` keeps ranking bias as a hardcoded table separate from the static tool manifest.
- `apps/web/src/components/ToolCard` performs registry module lookup during rendering, which couples presentational components to registry internals.
- Some tool package `src/index.ts` files still contain non-trivial field-building, parsing, or state logic.
- Web card state and clipboard feedback are simple today, but they are mixed into render components and will grow as editable tools grow.

The refactor should preserve current user-facing behavior while making the code easier to extend with more tools.

## Goals / Non-Goals

**Goals:**

- Keep modules small and focused, with no new large files, large components, or broad orchestration functions.
- Prefer pure functions for detection, derivation, ranking, field-building, and model projection.
- Reuse decoding/extraction helpers across tool modules and derived registry detection.
- Make registry ranking and deduplication policy explicit and covered by tests.
- Provide web components with resolved card data/actions so presentation components do not need to perform registry lookups.
- Keep tool package public `index.ts` files focused on exports and `ToolModule` assembly.
- Add or reuse focused tests that protect tool contracts, registry orchestration, and result-card workflows.

**Non-Goals:**

- No change to the paste-first MVP product model.
- No traditional tool navigation.
- No dynamic runtime plugin/package discovery.
- No server-side conversion pipeline.
- No broad visual redesign.
- No large dependency addition unless an existing conversion concern clearly needs a small mature library.

## Decisions

### 1. Keep the static tool manifest, but attach local policy metadata

The registry should continue using statically imported tools. The tool list remains inspectable and deterministic, which fits the MVP and avoids bundler/runtime complexity.

The ranking bias and any registry-only metadata should live alongside the manifest entry or in a small policy module keyed from the manifest. This removes the separate hardcoded ranking table as an untracked second source of truth.

Alternative considered: dynamic workspace package discovery. This was rejected because it adds build-time and bundler complexity without solving a current product need.

### 2. Share derived candidate helpers with tool-adjacent codec logic

Derived detection should be implemented as a pipeline of small candidate producers. Candidate producers should call focused helpers from relevant tool packages or shared codec modules instead of duplicating Base64, URL, and JWT payload decoding in the registry.

The candidate pipeline should remain one layer deep. It should dedupe candidates before running detectors and keep labels explicit so derived result cards explain their source.

Alternative considered: make every tool expose a generic derivation hook immediately. That can work later, but this refactor can start with small exported helpers for the existing wrappers to avoid expanding the `ToolModule` contract too early.

### 3. Introduce a resolved result card model for the web app

The web app should convert registry matches into a local resolved card model before rendering result cards. That model should include display metadata, current state, fields, copy payloads, edit action, and primary serialization action.

This keeps `ToolCard` and its children focused on rendering and local UI events. The lookup from `toolId` to module should happen once in a composition/helper layer, not inside the presentational card component.

Alternative considered: pass the `ToolModule` as a separate prop from `ResultList`. This would improve lookup locality, but still leaks module internals into card rendering. A resolved model gives a cleaner UI boundary.

### 4. Extract small web hooks/utilities instead of adding a card controller component

Card state reconciliation and clipboard feedback should move into focused hooks such as `useCardStates` and `useClipboardFeedback`, plus small pure utilities for field copy text. This avoids growing `ResultList`, `ToolCard`, or `FieldRow` into coordination-heavy components.

Alternative considered: introduce a single result-card controller component. This was rejected because it risks becoming another large component that mixes state, registry, and rendering concerns.

### 5. Keep tool package internals package-local and function-oriented

Each tool package should move non-trivial work out of `src/index.ts` into package-local files such as `types.ts`, `detect.ts`, `fields.ts`, `format.ts`, `parse.ts`, or `<tool>-state.ts`. Field construction should be pure and testable where it contains branching or formatting logic.

The public entrypoint should still export the tool module and any intentionally public helper types/functions. Internal helpers should stay unexported unless the registry needs them for shared derived candidate behavior.

Alternative considered: centralize all field-building in a shared tool UI package. This was rejected because field content is tool-specific domain behavior and belongs with each tool package.

### 6. Add contract tests without overbuilding a framework

Introduce lightweight shared test helpers only where they remove repeated assertions and clarify expected behavior. The tests should remain close to the packages they protect:

- tool package tests for detector/converter behavior
- registry tests for derived detection, ranking, and dedupe policy
- web tests for card interactions and paste-first workflows

Alternative considered: a full custom test framework for tools. This was rejected as unnecessary for the current codebase size.

## Risks / Trade-offs

- [Risk] Moving helper exports from tool packages can accidentally widen public APIs. → Mitigation: export only focused helpers needed by registry derivation, keep package exports named and documented by tests.
- [Risk] Resolved card model may duplicate some `ToolModule` concepts. → Mitigation: keep it app-local and derive it from the module contract rather than creating a competing shared contract.
- [Risk] Manifest-backed ranking metadata can obscure ordering if too abstract. → Mitigation: keep a single readable manifest/policy module and test all registered tool IDs have explicit policy.
- [Risk] Splitting files can create many tiny files with weak cohesion. → Mitigation: split only non-trivial logic and use names that map to real responsibilities: `fields`, `state`, `parse`, `format`, `derive`, `policy`.
- [Risk] Refactoring card state may change edit/apply behavior. → Mitigation: preserve existing web interaction tests and add focused coverage for edited cards staying local until apply-to-input.

## Migration Plan

1. Add or adjust registry tests that describe the intended dedupe, ranking, and derived candidate behavior before changing internals.
2. Extract shared decode/derive helpers from existing tool logic or package-local codec modules.
3. Refactor registry candidate derivation into small producers and update tests.
4. Move ranking policy into manifest-backed metadata or a manifest-adjacent policy module.
5. Introduce web resolved card model helpers and migrate `ResultList`/`ToolCard` to use them.
6. Extract web hooks/utilities for card state and clipboard feedback.
7. Thin remaining tool `index.ts` files that contain non-trivial internals.
8. Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.

Rollback is straightforward because this is an internal refactor: revert the change set and restore the previous registry/web composition.

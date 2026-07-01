# PasteMorphBox Agent Guide

## Product direction

PasteMorphBox is a pure frontend, paste-first conversion toolbox. The main input preserves the original user input. Result cards explain and transform that input. Card edits must not automatically rewrite the main input; users can explicitly apply a card value back to the input.

## Architecture rules

- Keep tool capabilities in independent `packages/tools/tool-*` packages.
- Keep shared contracts in `packages/shared/core`.
- Keep detection orchestration in `packages/platform/registry`.
- Keep `apps/web` focused on routing, state, layout, and rendering.
- Keep `apps/web/src/app` as thin route entries; put the main paste converter composition outside `app`, components under `apps/web/src/components`, utilities under `apps/web/src/lib`, and app-local shared types under `apps/web/src/types`.
- Prefer browser-native APIs first, then small mature libraries. Do not hand-roll complex standards when a native API or trusted library exists.
- Every tool package should expose a `ToolModule`.
- Keep each tool package `src/index.ts` focused on public exports and `ToolModule` assembly; move non-trivial state types, parsing, formatting, and field-building into focused package-local files such as `types.ts`, `parse.ts`, `format.ts`, `fields.ts`, or `<tool>-state.ts`.
- Add tests for detector and converter behavior when changing a tool package.
- Keep package behavior tests colocated in the package `src` tree, and keep web app interaction, discovery, and route workflow tests under `apps/web/src/test`.

## Commands

Run these before considering work complete:

```bash
pnpm test
pnpm typecheck
pnpm build
```

## UX rules

- Do not add a traditional tool navigation for MVP.
- Keep the first screen focused on the smart input and result cards.
- Every copyable result field should have a copy action.
- Keep the visual design restrained and usable; defer brand polish.

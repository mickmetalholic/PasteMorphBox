# PasteMorphBox Agent Guide

## Product direction

PasteMorphBox is a pure frontend, paste-first conversion toolbox. The main input preserves the original user input. Result cards explain and transform that input. Card edits must not automatically rewrite the main input; users can explicitly apply a card value back to the input.

## Architecture rules

- Keep tool capabilities in independent `packages/tool-*` packages.
- Keep shared contracts and detection orchestration in `packages/core`.
- Keep `apps/web` focused on routing, state, layout, and rendering.
- Prefer browser-native APIs first, then small mature libraries. Do not hand-roll complex standards when a native API or trusted library exists.
- Every tool package should expose a `ToolModule`.
- Add tests for detector and converter behavior when changing a tool package.

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

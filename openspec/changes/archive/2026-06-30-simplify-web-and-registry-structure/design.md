# Design: Simplify web and registry structure

## Web App

The app route imports `PasteConverter` directly. `PasteConverter` owns the paste-first screen composition and imports focused component directories from `apps/web/src/components`.

Small local utilities live in `apps/web/src/lib`, and app-local shared types live in `apps/web/src/types`. This keeps component directories focused on rendering while avoiding an artificial feature/module layer for the only MVP workflow.

## Registry

The registry keeps static imports for all tool packages so the frontend bundle remains deterministic. The ordered list moves to `tool-manifest.ts`; `modules.ts` keeps the public `toolModules` and `getToolModule` API.

## Web Build Config

The Next `transpilePackages` list moves to `workspace-packages.ts` so the workspace package inventory can be updated without editing the rest of the Next config.

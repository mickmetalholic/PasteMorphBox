## Why

`apps/web/src/App.tsx` has grown into a single file that owns route-adjacent setup, smart input rendering, result list state, result cards, field editing, examples, and empty states. This makes the paste-first UI harder to evolve because unrelated component changes happen in the same file.

The Next `app/` directory should remain focused on route entries, while product UI should live in a clear module structure with self-contained component directories.

## What Changes

- Split the paste-first UI into an `apps/web/src/modules/paste-workbench` module.
- Use `ComponentName/index.tsx` directories for non-trivial components so local subcomponents, helpers, and styles have an obvious home.
- Keep `apps/web/src/app` focused on Next route and layout files.
- Move app-level input state into `apps/web/src/store`.
- Preserve user-facing behavior and public package APIs.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `web-app`: Clarify the frontend source layout for the paste-first workbench without changing runtime behavior.

## Impact

- Affects `apps/web/src` file organization and imports.
- No intended UI behavior, package API, route, dependency, or styling changes.

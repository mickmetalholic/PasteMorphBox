## Why

The current `Developer` tool bundles unrelated debugging utilities into one package, so each new capability increases detection coupling, test complexity, and future iteration risk. Splitting it now keeps the paste-first UI intact while giving each developer utility a clear ownership boundary.

## What Changes

- Replace the monolithic developer utility module with dedicated tool modules for JWT, UUID, hash-shaped values, and HTML entity conversion.
- Keep all split tools discoverable under the existing `developer` category so the user-facing Examples grouping does not become traditional navigation.
- Move each detector, converter, examples, and tests into its owning `packages/tool-*` package.
- Update the registry to register the specialized modules directly and remove dependency on a catch-all developer module.
- Preserve existing result behavior for current inputs while making future JWT, UUID, hash, and HTML entity improvements independently shippable.
- **BREAKING**: Internal package/module boundaries change; code that imports `@pastemorphbox/tool-developer` must move to the specialized packages.

## Capabilities

### New Capabilities

- `jwt-tool`: JWT detection and unverified header/payload decoding.
- `uuid-tool`: UUID detection, version inspection, and normalized UUID output.
- `hash-tool`: Common digest-shape detection and normalized hash output.
- `html-entities-tool`: HTML entity decoding and encoding.

### Modified Capabilities

- `developer-tool`: Retire the monolithic developer utility contract in favor of specialized developer-category tools.

## Impact

- Affected packages: `packages/tool-developer`, new `packages/tool-jwt`, `packages/tool-uuid`, `packages/tool-hash`, `packages/tool-html-entities`, and `packages/registry`.
- Affected specs: developer utility behavior moves from one aggregate spec into dedicated capability specs.
- Affected tests: detector and field tests move from the aggregate package to the specialized packages, with registry tests updated for the new module list.

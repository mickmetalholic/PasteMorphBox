## Context

The registry is the orchestration point between independent tool modules and the web app. It composes direct detections, derived detections, deduplication, ranking, module lookup, and example discovery helpers. These are separate concerns even though they currently share one file.

## Goals / Non-Goals

**Goals:**

- Move registry internals into cohesive modules.
- Keep `src/index.ts` as the package API barrel and `detectAll` orchestration entry.
- Make ranking and derived-candidate logic independently readable.
- Keep tests and downstream imports unchanged.

**Non-Goals:**

- Change tool order, ranking weights, derived-source penalty, or helper return shapes.
- Add dynamic registry loading.
- Move package directories; that is handled separately.

## Decisions

- Put static tool imports and `toolModules` in `modules.ts`.
- Put registered example types and helper functions in `examples.ts`.
- Put percent/Base64/JWT/query parameter derivation in `derived-candidates.ts`.
- Put dedupe and confidence adjustments in `ranking.ts`.
- Re-export public types and helpers from `index.ts` so consumers keep importing from `@pastemorphbox/registry`.

## Risks / Trade-offs

- Splitting can accidentally change initialization order. Mitigation: keep the `toolModules` array identical and run registry plus full tests.
- More files require clearer naming. Mitigation: each file maps to one registry concern.

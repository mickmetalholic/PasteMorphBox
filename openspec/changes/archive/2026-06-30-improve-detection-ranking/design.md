## Context

The registry currently sorts matches by raw detector confidence after applying a fixed derived penalty. That makes each tool responsible for global ordering, which is fragile now that PasteMorphBox has specialized tools, generic text cleanup, extraction, and derived payload detection. A weak but broad detector can appear too early, and future tools will need a shared policy to avoid repeating this problem.

## Goals / Non-Goals

**Goals:**

- Introduce a single registry ranking function for direct and derived matches.
- Prefer strong specialized interpretations over generic cleanup cards.
- Keep broad fallback tools visible but behind higher-intent cards.
- Preserve the existing `ToolMatch.confidence` surface so the UI does not need new ranking data.

**Non-Goals:**

- Add user-configurable ranking controls.
- Hide matching tools completely.
- Redesign result cards.
- Change individual tool conversion outputs.

## Decisions

- Apply ranking adjustments in `packages/registry`, after detection and before final sorting.
  - Rationale: the registry is the only layer with visibility across tools and derived sources.
  - Alternative considered: manually tune every tool's confidence. That spreads product ranking policy across packages and makes future changes harder.

- Use small, deterministic tool-specific adjustments plus source adjustments.
  - Rationale: the current confidence values are useful but need calibration across tool families.
  - Alternative considered: replace confidence entirely with fixed priority ordering. That would ignore useful detector certainty.

- Keep generic tools visible.
  - Rationale: text cleanup and extraction are still valuable secondary cards.
  - Alternative considered: suppress generic tools when specialized tools match. That would remove useful transformations from multi-purpose pastes.

## Risks / Trade-offs

- Ranking policy can become another hard-coded table. Mitigation: keep the table small, named, and covered by scenario tests.
- Some inputs legitimately benefit from extraction first. Mitigation: rank extraction above text cleanup, but below strong structured tools.
- Derived payloads may be the user's real goal. Mitigation: only apply a modest derived penalty and assert useful derived matches still appear.

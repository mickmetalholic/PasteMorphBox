## Context

The registry currently runs each tool against only the normalized user input. As new tools cover encoded and structured values, users benefit from one extra layer of inspection: decode the obvious wrapper, then reuse existing detectors on the decoded value.

## Goals / Non-Goals

**Goals:**

- Add one-layer composed detection in the registry.
- Reuse existing tool detectors for derived candidates.
- Label derived cards so users understand the source.
- Deduplicate repeated direct/derived matches.

**Non-Goals:**

- Add arbitrary recursive pipelines.
- Add visual dependency graphs between cards.
- Add user-controlled recipes.
- Change individual tool packages.

## Decisions

- Keep composition in `packages/registry` because it orchestrates registered tools and already owns `detectAll`.
- Limit composition to one derived layer to avoid noisy result explosions.
- Reduce derived confidence slightly so direct matches remain dominant when applicable.
- Deduplicate by tool id and source text.

## Risks / Trade-offs

- Derived results can increase card count -> only derive from clear decoders and cap to one layer.
- Some decoded text may be sensitive -> all processing remains local and reuses existing in-browser detection.
- Confidence adjustment may need tuning -> start with a small penalty and keep tests focused on ordering.

## Context

The web app currently opens to the smart input and can show examples grouped by tool category. The empty state selects the first four registered examples, and the no-match message still implies broader tools are pending even though text cleanup and extraction now exist.

The product constraint remains paste-first: discovery surfaces must help users understand available workflows without becoming a traditional tool navigation.

## Goals / Non-Goals

**Goals:**

- Make the empty state show a curated cross-section of high-value paste scenarios.
- Keep the examples panel compact while still representing every active category.
- Keep no-match suggestions backed by registered tool metadata and free of stale roadmap copy.
- Put discovery selection rules in the registry so web rendering stays simple.

**Non-Goals:**

- No route-level tool navigation, sidebar, command palette, or landing page.
- No new tool packages or converter behavior changes.
- No visual redesign beyond the discovery surfaces.

## Decisions

- Add registry helpers for starter examples and preview example groups. This keeps ordering and density policy next to registered tool metadata instead of scattering selection logic through the web app.
- Keep the full registered example list available. The new helpers are additive so future surfaces can still use all examples.
- Limit the examples panel per category. This preserves the "capability map" feel without turning the panel into a long catalog.
- Use existing example metadata for actions. Empty and no-match states continue to populate the smart input with real examples, so discovery remains executable rather than explanatory only.

## Risks / Trade-offs

- Curated starter examples can drift when tools change. Mitigation: tests assert starter examples are backed by registered metadata and detect successfully.
- Limiting category previews may hide a useful secondary example. Mitigation: category coverage is prioritized for MVP, and future refinement can add expand controls if usage data justifies it.
- Placeholder copy can become too dense. Mitigation: mention representative input shapes only, leaving detailed discovery to examples.

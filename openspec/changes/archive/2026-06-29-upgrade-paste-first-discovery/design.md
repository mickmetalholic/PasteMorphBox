## Context

The current web app opens to a smart input and renders ranked cards after detection. Empty state guidance is limited to a few literal values, and unrecognized text has no product-level suggestions. This makes the paste-first model clean but hard to discover, especially for non-developer text cleanup and extraction use cases planned after this change.

## Goals / Non-Goals

**Goals:**

- Keep the first screen centered on the smart input.
- Make supported paste scenarios visible before a user knows what to paste.
- Let examples and suggestions populate the existing input flow through explicit user actions.
- Explain detected result cards with concise reason text.
- Provide helpful suggestions when input is present but no tool returns a match.

**Non-Goals:**

- Add a traditional tool navigation, side rail, or separate tool pages.
- Add new conversion engines or tool packages.
- Change tool detection confidence rules or card edit semantics.
- Add server-side processing or analytics.

## Decisions

- Use static example metadata in the web app for this change. Tool-owned examples will be considered in a later contract change, but hardcoding a small curated set keeps this interaction upgrade independent of tool package APIs.
- Present examples as paste scenarios, not as a navigation menu. Example buttons write sample input into the smart input and then reuse the existing detection/rendering flow.
- Add a lightweight examples panel controlled by local component state. This avoids routing changes and keeps the main URL behavior unchanged for now.
- Render no-match suggestions from the app layer. They are intentionally generic and non-converting until later toolkit changes provide real fallback cards.
- Derive card explanation copy from existing match metadata (`subtitle` and confidence) rather than adding new fields to `ToolModule`.

## Risks / Trade-offs

- Static examples can drift from real tool capabilities -> keep examples limited to currently supported conversions plus clearly labeled upcoming text scenarios only when backed by suggestions.
- More first-screen content can make the UI feel less focused -> show examples in compact groups and keep the textarea as the dominant element.
- No-match suggestions are not full tools yet -> make them suggestion actions that provide sample inputs or clear guidance, not fake conversion results.

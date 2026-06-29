## Why

PasteMorphBox currently hides most of its value behind an empty text box: users must already know what kinds of data are supported before they can discover useful result cards. As the product expands beyond developer-only conversions, the first-screen experience needs lightweight discovery that preserves the paste-first interaction model.

## What Changes

- Add first-screen example prompts that demonstrate supported paste scenarios without introducing traditional tool navigation.
- Add an examples/help surface that groups pasteable scenarios by user intent and lets users try samples directly in the smart input.
- Differentiate empty input, detected input, and unrecognized input states so users always have an obvious next action.
- Improve result card context so each detected card explains why it appeared.
- Keep the main input as the source of truth; examples and suggestions write to the input only through explicit user actions.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `web-app`: The first-screen app experience includes paste examples, an examples surface, and fallback suggestions for unrecognized input.
- `smart-input`: Smart input updates may come from explicit example/suggestion actions while preserving original input semantics and card edit isolation.

## Impact

- `apps/web` main screen layout, empty state, and result card rendering.
- No new runtime dependencies.
- No changes to tool package conversion contracts in this change.

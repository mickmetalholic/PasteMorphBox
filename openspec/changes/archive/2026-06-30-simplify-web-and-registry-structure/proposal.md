# Change: Simplify web and registry structure

## Why

The web app still has an extra `paste-workbench` module layer and an `App.tsx` forwarding component after the broader source layout split. That indirection makes the main paste experience harder to locate. Registry and Next workspace package lists are also embedded in implementation entrypoints instead of being explicit structure declarations.

## What Changes

- Remove the `paste-workbench` layer and expose the main paste experience as `PasteConverter`.
- Move paste experience components under `apps/web/src/components`, with small shared helpers under `lib` and shared local types under `types`.
- Make the Next workspace transpile list explicit in a dedicated config file.
- Move the ordered registry tool list into a static tool manifest.

## Impact

- No user-facing behavior changes.
- Import paths change for web app composition and tests.
- Registry ordering remains unchanged.

## Context

The app now has many more result cards and fields. The original MVP URL synchronization wrote every input change into `?q=`, which is convenient but risky for tokens, customer data, and pasted operational text. Result cards also need compact controls for high-field tools.

## Goals / Non-Goals

**Goals:**

- Keep `q` route loading for shared/example URLs.
- Avoid writing new user input into the URL automatically.
- Add bulk copy per result card.
- Fold large field sets without hiding the primary card summary.

**Non-Goals:**

- Build a full share-link workflow.
- Add persistent recent actions.
- Add analytics or telemetry.
- Redesign card visual language.

## Decisions

- On any explicit input update, remove an existing `q` query param rather than replacing it. This avoids stale URL content while preserving initial route loading.
- Copy all fields as plain text with field labels and values. This is broadly useful and avoids inventing a table format per card.
- Show the first six fields by default for large cards, with a simple expand/collapse button.

## Risks / Trade-offs

- Removing automatic URL sync changes share behavior -> this is intentional for privacy; explicit sharing can be added later.
- Copy all may include long field values -> users explicitly trigger it, and each field remains individually copyable.
- Field folding can hide useful lower fields -> show the control only when folding occurs and make expansion one click.

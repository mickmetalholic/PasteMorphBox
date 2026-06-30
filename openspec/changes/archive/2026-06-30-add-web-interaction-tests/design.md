## Context

`apps/web` owns the paste-first page, result card rendering, URL search param handling, example selection, copy actions, and explicit apply-to-input behavior. Current web tests only validate discovery metadata; they do not render the React app or exercise user workflows.

## Goals / Non-Goals

**Goals:**

- Add a lightweight DOM test setup for React interactions.
- Cover the MVP behaviors most likely to regress during UI refactors.
- Keep tests deterministic with mocked clipboard and fake timers where needed.

**Non-Goals:**

- Add Playwright or full browser E2E coverage in this change.
- Assert Tailwind class names or visual layout details.
- Change product behavior to fit tests.

## Decisions

- Use Vitest with jsdom and Testing Library because the repo already uses Vitest and the target behaviors are component-level interactions.
- Render through the TanStack router so search param behavior is exercised instead of mocking the route hook.
- Keep clipboard interactions behind a test mock so tests do not depend on browser permissions.

## Risks / Trade-offs

- DOM tests can become brittle if they query implementation details. Mitigation: query labels, button names, and visible user text.
- Adding jsdom and Testing Library increases dev dependencies. Mitigation: scope dependencies to `apps/web`.

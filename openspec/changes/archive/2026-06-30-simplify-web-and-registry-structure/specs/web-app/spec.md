## ADDED Requirements

### Requirement: Web source composition

The web app SHALL keep route entries thin and place the primary paste conversion experience outside `apps/web/src/app`.

#### Scenario: Route renders paste experience

- **WHEN** the root app route renders
- **THEN** it SHALL delegate to the paste converter composition component rather than embedding workflow implementation in the route file.

#### Scenario: Paste experience components

- **WHEN** components, helpers, or local types support the paste conversion experience
- **THEN** components SHALL live under `apps/web/src/components`, local utilities under `apps/web/src/lib`, and app-local shared types under `apps/web/src/types`.

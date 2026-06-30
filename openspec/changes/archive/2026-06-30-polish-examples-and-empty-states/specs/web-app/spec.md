## ADDED Requirements

### Requirement: Curated starter examples

The app SHALL use a curated set of registered examples for the empty state so the first screen shows a representative range of supported paste workflows.

#### Scenario: Empty starter examples

- **WHEN** the app loads with no input
- **THEN** it SHALL show starter example actions selected from registered tool metadata.

#### Scenario: Starter example coverage

- **WHEN** starter examples are rendered
- **THEN** they SHALL include examples from multiple tool categories rather than only the first registered tools.

### Requirement: Compact examples map

The app SHALL render the examples surface as a compact grouped map of supported paste scenarios.

#### Scenario: Group previews

- **WHEN** the user opens the examples surface
- **THEN** each shown category SHALL display a limited preview of registered examples for that category.

#### Scenario: Category-backed examples

- **WHEN** examples are rendered in the examples surface
- **THEN** every rendered example SHALL come from registered tool metadata.

### Requirement: Current no-match guidance

The app SHALL provide no-match guidance that reflects current capabilities and offers executable suggestions.

#### Scenario: Unrecognized input suggestions

- **WHEN** non-empty input produces no detected result cards
- **THEN** the app SHALL show a concise no-match message and suggestion actions from registered tool metadata.

#### Scenario: Suggestion activation

- **WHEN** the user activates a no-match suggestion
- **THEN** the app SHALL populate the smart input with that registered example source.

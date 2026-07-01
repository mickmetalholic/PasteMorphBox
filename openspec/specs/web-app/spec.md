# Web App Spec

## Purpose

Define the paste-first web experience, including smart input discovery, result cards, copy actions, and no-match guidance.

## Requirements

### Requirement: Smart input first screen

The app SHALL open directly to a smart input experience with paste examples and suggestion affordances instead of a landing page or tool navigation.

#### Scenario: Empty app

- **WHEN** the app loads with no query
- **THEN** it SHALL show the smart input and grouped example paste scenarios from registered tool metadata.

#### Scenario: Try example

- **WHEN** the user activates an example paste scenario
- **THEN** the app SHALL populate the smart input with the example source and render matching result cards without writing the source into the URL query.

#### Scenario: View examples

- **WHEN** the user opens the examples surface
- **THEN** the app SHALL show grouped paste scenarios without navigating away from the smart input.

### Requirement: Field copy

Each visible result field SHALL provide a copy action.

#### Scenario: Copy field

- **WHEN** the user clicks a field copy button
- **THEN** the app SHALL copy that field value to the clipboard.

### Requirement: Result card bulk copy

Each result card SHALL provide a bulk copy action for its result fields.

#### Scenario: Copy all card fields

- **WHEN** the user activates a card bulk copy action
- **THEN** the app SHALL copy the card field labels and values to the clipboard.

### Requirement: Result field folding

Cards with many result fields SHALL be folded by default with an explicit expansion control.

#### Scenario: Many fields

- **WHEN** a result card has more than six fields
- **THEN** the app SHALL initially show a subset of fields and provide a control to show all fields.

### Requirement: No-match guidance

The app SHALL provide useful next-step suggestions when non-empty input does not produce detected result cards.

#### Scenario: Unrecognized input

- **WHEN** the user enters non-empty text and no tool detects a match
- **THEN** the app SHALL show suggestion actions from registered tool metadata rather than only an empty state.

### Requirement: Result card explanation

Each result card SHALL include concise context explaining why the card appeared.

#### Scenario: Detected result

- **WHEN** a result card is shown
- **THEN** it SHALL display detection context based on the match metadata.

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

### Requirement: Web source composition

The web app SHALL keep route entries thin and place the primary paste conversion experience outside `apps/web/src/app`.

#### Scenario: Route renders paste experience

- **WHEN** the root app route renders
- **THEN** it SHALL delegate to the paste converter composition component rather than embedding workflow implementation in the route file.

#### Scenario: Paste experience components

- **WHEN** components, helpers, or local types support the paste conversion experience
- **THEN** components SHALL live under `apps/web/src/components`, local utilities under `apps/web/src/lib`, and app-local shared types under `apps/web/src/types`.

### Requirement: Resolved result card rendering boundary
The web app SHALL resolve registry matches into card render data and card actions before passing data into presentational result card components.

#### Scenario: Result card renders
- **WHEN** a result card component renders a detected match
- **THEN** it SHALL receive the fields, primary value action, edit action, copy payloads, and display metadata needed for rendering without performing registry module lookup inside the presentational component.

#### Scenario: Missing tool module
- **WHEN** a registry match cannot be resolved to a tool module
- **THEN** the composition layer SHALL omit or handle that card before presentational card rendering.

### Requirement: Result card state hook
The web app SHALL manage result card state reconciliation in a focused hook or utility rather than inside broad render components.

#### Scenario: Matches change
- **WHEN** detection results change after smart input updates
- **THEN** card state reconciliation SHALL preserve existing card-local edits for retained match IDs and initialize state for new match IDs.

#### Scenario: Card edit remains local
- **WHEN** the user edits a field inside a result card
- **THEN** the edit SHALL update only that card state until the user explicitly applies the card value back to the smart input.

### Requirement: Clipboard feedback helper
The web app SHALL centralize repeated clipboard feedback behavior in a focused hook or utility.

#### Scenario: Copy field or card
- **WHEN** a user copies a field value or all card fields
- **THEN** the component SHALL use the shared clipboard feedback helper or utility rather than duplicating timer state logic in each component.

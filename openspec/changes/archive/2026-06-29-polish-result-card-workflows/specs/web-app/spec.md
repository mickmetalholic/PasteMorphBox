## ADDED Requirements

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

## MODIFIED Requirements

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

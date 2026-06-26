# Web App Spec

## Requirements

### Requirement: Smart input first screen

The app SHALL open directly to a smart input experience instead of a landing page or tool navigation.

#### Scenario: Empty app

- **WHEN** the app loads with no query
- **THEN** it SHALL show the smart input and example values.

### Requirement: Field copy

Each visible result field SHALL provide a copy action.

#### Scenario: Copy field

- **WHEN** the user clicks a field copy button
- **THEN** the app SHALL copy that field value to the clipboard.

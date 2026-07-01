## ADDED Requirements

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

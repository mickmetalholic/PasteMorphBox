## MODIFIED Requirements

### Requirement: Original input preservation

The app SHALL preserve the smart input as the original user source while cards are edited, and SHALL only replace the smart input from explicit user actions such as applying a card value or trying an example/suggestion.

#### Scenario: Edit inside a card

- **WHEN** a user edits a card field
- **THEN** the main input SHALL remain unchanged unless the user clicks apply to input.

#### Scenario: Try an example

- **WHEN** a user activates an example or suggestion action
- **THEN** the main input SHALL update to that action's source text.

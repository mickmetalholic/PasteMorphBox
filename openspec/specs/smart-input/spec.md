# Smart Input Spec

## Purpose

Define smart input source preservation, explicit apply behavior, and URL query handling for the paste-first experience.

## Requirements

### Requirement: Original input preservation

The app SHALL preserve the smart input as the original user source while cards are edited, SHALL only replace the smart input from explicit user actions such as applying a card value or trying an example/suggestion, and SHALL NOT write user input changes into the URL query by default.

#### Scenario: Edit inside a card

- **WHEN** a user edits a card field
- **THEN** the main input SHALL remain unchanged unless the user clicks apply to input.

#### Scenario: Try an example

- **WHEN** a user activates an example or suggestion action
- **THEN** the main input SHALL update to that action's source text without writing it into the URL query.

#### Scenario: Edit shared query input

- **WHEN** the app loads from a `q` query and the user changes the smart input
- **THEN** the app SHALL remove the stale `q` query value from the URL.

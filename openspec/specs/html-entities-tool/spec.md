# HTML Entities Tool Spec

## Purpose

Define HTML entity encoding and decoding behavior for pasted text.

## Requirements

### Requirement: HTML entity detection
The HTML entities tool SHALL detect text containing HTML entities or raw characters that can be entity-encoded.

#### Scenario: Entity text input
- **WHEN** the user pastes text containing supported HTML entities
- **THEN** the HTML entities tool SHALL return an HTML entity conversion match.

#### Scenario: Raw HTML character input
- **WHEN** the user pastes text containing raw HTML-sensitive characters
- **THEN** the HTML entities tool SHALL return an HTML entity conversion match.

### Requirement: HTML entity fields
The HTML entities tool SHALL expose copyable decoded and encoded text fields.

#### Scenario: Convert HTML entities
- **WHEN** HTML entity text is detected
- **THEN** the result SHALL include decoded text and encoded entity text fields.

#### Scenario: Apply HTML entity primary value
- **WHEN** the user applies the HTML entity result back to the smart input
- **THEN** the applied value SHALL be the decoded text.

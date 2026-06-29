# Extract Tool Spec

## Requirements

### Requirement: Entity extraction detection

The extract tool SHALL detect pasted text containing extractable entity values.

#### Scenario: Text with entities

- **WHEN** the user pastes text containing emails, URLs, phone-like values, dates, money, numbers, domains, hashtags, mentions, or IP addresses
- **THEN** the extract tool SHALL return an extraction match.

#### Scenario: Text without entities

- **WHEN** the user pastes text without supported extractable values
- **THEN** the extract tool SHALL return no matches.

### Requirement: Entity fields

The extract tool SHALL provide copyable fields for each detected entity class.

#### Scenario: Extract entity lists

- **WHEN** the pasted text contains multiple entity classes
- **THEN** the result card SHALL show a field for each non-empty entity class.

#### Scenario: Deduplicate entities

- **WHEN** an entity value appears multiple times in the pasted text
- **THEN** the output list for that class SHALL include the value once in first-seen order.

### Requirement: CSV export

The extract tool SHALL provide a copyable CSV field containing all extracted values.

#### Scenario: Copy CSV

- **WHEN** entities are extracted
- **THEN** the CSV field SHALL include a header and one row per extracted value with its entity type.

## ADDED Requirements

### Requirement: Text cleanup detection

The text tool SHALL detect ordinary non-empty text as a low-confidence fallback conversion.

#### Scenario: Plain text input

- **WHEN** the user pastes ordinary non-empty text
- **THEN** the text tool SHALL return a cleanup match with lower confidence than specialized converters.

#### Scenario: Empty input

- **WHEN** the user provides empty or whitespace-only input
- **THEN** the text tool SHALL return no matches.

### Requirement: Cleanup outputs

The text tool SHALL provide copyable cleanup outputs for common text and list transformations.

#### Scenario: Multi-line cleanup

- **WHEN** the user pastes multi-line text with duplicate and empty lines
- **THEN** the text tool SHALL provide trimmed, empty-line-removed, deduplicated, sorted, and joined outputs.

#### Scenario: Case conversion

- **WHEN** the user pastes text
- **THEN** the text tool SHALL provide uppercase, lowercase, and title case outputs.

### Requirement: Text statistics

The text tool SHALL provide basic statistics for the pasted text.

#### Scenario: Count text

- **WHEN** the user pastes text
- **THEN** the text tool SHALL show character, word, and line counts.

# Smart Detection Composition Spec

## Requirements

### Requirement: Derived detection

The registry SHALL run registered detectors against one layer of derived text from supported wrappers.

#### Scenario: Percent-decoded input

- **WHEN** pasted input contains percent-encoded structured text
- **THEN** registry detection SHALL include matches for the decoded text.

#### Scenario: Encoded payload

- **WHEN** pasted input contains Base64, Base64URL, or JWT payload text that decodes to a supported format
- **THEN** registry detection SHALL include matches for the decoded payload.

### Requirement: Derived result labeling

Derived matches SHALL explain that they came from decoded or extracted input.

#### Scenario: Show derived card

- **WHEN** a derived match is returned
- **THEN** its title or subtitle SHALL include the derivation source.

### Requirement: Derived deduplication

The registry SHALL avoid duplicate direct and derived matches for the same tool and source.

#### Scenario: Duplicate candidate

- **WHEN** a derived candidate duplicates an existing match source for the same tool
- **THEN** the registry SHALL return only one match for that tool and source.

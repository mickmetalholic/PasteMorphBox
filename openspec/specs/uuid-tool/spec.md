# UUID Tool Spec

## Purpose

Define UUID inspection behavior for version detection and normalized output.

## Requirements

### Requirement: UUID detection
The UUID tool SHALL detect RFC 4122-style UUID values and identify their version.

#### Scenario: UUID input
- **WHEN** the user pastes a UUID value with a valid version and variant nibble
- **THEN** the UUID tool SHALL return a UUID inspection match.

#### Scenario: Invalid UUID-like input
- **WHEN** the user pastes a UUID-shaped value with an invalid version or variant nibble
- **THEN** the UUID tool SHALL NOT return a UUID inspection match.

### Requirement: UUID fields
The UUID tool SHALL expose copyable inspection fields for detected UUID values.

#### Scenario: Inspect UUID
- **WHEN** a UUID is detected
- **THEN** the result SHALL include the UUID version and a lower-case normalized UUID field.

#### Scenario: Apply UUID primary value
- **WHEN** the user applies the UUID result back to the smart input
- **THEN** the applied value SHALL be the lower-case normalized UUID.

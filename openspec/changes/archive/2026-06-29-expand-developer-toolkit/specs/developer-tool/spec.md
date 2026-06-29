## ADDED Requirements

### Requirement: Developer value detection

The developer tool SHALL detect common developer debugging values.

#### Scenario: JWT input

- **WHEN** the user pastes a syntactically valid JWT
- **THEN** the developer tool SHALL return a JWT inspection match.

#### Scenario: Utility values

- **WHEN** the user pastes Base64URL text, a UUID, a common hash-shaped value, or HTML entity text
- **THEN** the developer tool SHALL return a relevant developer utility match.

### Requirement: Developer fields

The developer tool SHALL provide copyable fields for detected values.

#### Scenario: Decode JWT

- **WHEN** a JWT is detected
- **THEN** the result SHALL include decoded header and payload fields.

#### Scenario: Decode Base64URL

- **WHEN** Base64URL text is detected
- **THEN** the result SHALL include decoded UTF-8 text and normalized Base64URL fields.

#### Scenario: Inspect identifiers

- **WHEN** a UUID or hash-shaped value is detected
- **THEN** the result SHALL include type and normalized value fields.

#### Scenario: Convert HTML entities

- **WHEN** HTML entity text is detected
- **THEN** the result SHALL include decoded and encoded text fields.

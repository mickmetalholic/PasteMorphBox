## ADDED Requirements

### Requirement: JWT detection
The JWT tool SHALL detect syntactically valid JSON Web Tokens with decodable JSON header and payload segments.

#### Scenario: JWT input
- **WHEN** the user pastes a token with three Base64URL segments whose first two segments decode to JSON
- **THEN** the JWT tool SHALL return a JWT inspection match.

#### Scenario: Non-JWT dotted input
- **WHEN** the user pastes dotted text that does not contain a decodable JSON header and payload
- **THEN** the JWT tool SHALL NOT return a JWT inspection match.

### Requirement: JWT fields
The JWT tool SHALL expose copyable JWT inspection fields without verifying the signature.

#### Scenario: Decode JWT fields
- **WHEN** a JWT is detected
- **THEN** the result SHALL include decoded header JSON, decoded payload JSON, and signature fields.

#### Scenario: Apply JWT primary value
- **WHEN** the user applies the JWT result back to the smart input
- **THEN** the applied value SHALL be the decoded payload JSON.

# Hash Tool Spec

## Purpose

Define hash-shaped value inspection behavior without claiming cryptographic verification.

## Requirements

### Requirement: Hash shape detection
The hash tool SHALL detect common hexadecimal digest shapes without claiming cryptographic verification.

#### Scenario: Common hash input
- **WHEN** the user pastes a hexadecimal value with a length matching MD5, SHA-1, or SHA-256
- **THEN** the hash tool SHALL return a hash inspection match that names the detected digest shape.

#### Scenario: Unsupported hash shape
- **WHEN** the user pastes a hexadecimal value with an unsupported digest length
- **THEN** the hash tool SHALL NOT return a hash inspection match.

### Requirement: Hash fields
The hash tool SHALL expose copyable fields for detected hash-shaped values.

#### Scenario: Inspect hash
- **WHEN** a hash-shaped value is detected
- **THEN** the result SHALL include the detected hash shape and a lower-case normalized value.

#### Scenario: Apply hash primary value
- **WHEN** the user applies the hash result back to the smart input
- **THEN** the applied value SHALL be the lower-case normalized value.

# Smart Detection Composition Spec

## Purpose

Define how the registry composes direct detections with one layer of decoded or extracted derived text.

## Requirements

### Requirement: Derived detection

The registry SHALL run registered detectors against one layer of derived text from supported wrappers.

#### Scenario: Percent-decoded input

- **WHEN** pasted input contains percent-encoded structured text
- **THEN** registry detection SHALL include matches for the decoded text.

#### Scenario: URL query parameter value

- **WHEN** pasted input contains URL query parameter values
- **THEN** registry detection SHALL include matches for each non-empty parameter value and its decoded form.

#### Scenario: Encoded payload

- **WHEN** pasted input contains Base64 or Base64URL text that decodes to a supported text format
- **THEN** registry detection SHALL include matches for the decoded payload.

#### Scenario: JWT payload

- **WHEN** pasted input contains a JWT whose payload decodes to a supported text format
- **THEN** registry detection SHALL include matches for the decoded JWT payload.

#### Scenario: One derived layer

- **WHEN** a derived candidate itself contains another supported wrapper
- **THEN** registry detection SHALL NOT recursively derive additional candidates from that derived candidate.

### Requirement: Derived result labeling

Derived matches SHALL explain that they came from decoded or extracted input and SHALL rank below equivalent direct matches.

#### Scenario: Show derived card

- **WHEN** a derived match is returned
- **THEN** its title or subtitle SHALL include the derivation source.

#### Scenario: Derived confidence

- **WHEN** a direct detector match is produced from derived text
- **THEN** the registry SHALL reduce the derived match confidence relative to the detector's direct confidence.

### Requirement: Derived deduplication

The registry SHALL avoid duplicate direct and derived matches for the same tool and source.

#### Scenario: Duplicate candidate

- **WHEN** a derived candidate duplicates an existing match source for the same tool
- **THEN** the registry SHALL return only one match for that tool and source.

#### Scenario: Duplicate derived source

- **WHEN** multiple wrappers derive the same source text
- **THEN** the registry SHALL run detectors against that derived source at most once.

### Requirement: Ranked detection results

The registry SHALL return direct and derived matches in an order that favors strong, specific interpretations over generic fallback interpretations.

#### Scenario: Structured input outranks text cleanup

- **WHEN** pasted input directly matches a structured tool and the text cleanup tool
- **THEN** the structured tool match SHALL be ranked ahead of the text cleanup match.

#### Scenario: Extraction outranks text cleanup

- **WHEN** pasted input contains extractable entities and also matches text cleanup
- **THEN** the extraction match SHALL be ranked ahead of the text cleanup match.

#### Scenario: Weak developer utility does not outrank stronger structured input

- **WHEN** pasted input produces a weak developer utility match and a stronger structured or extraction match
- **THEN** the stronger structured or extraction match SHALL be ranked ahead of the weak developer utility match.

#### Scenario: Derived payload remains secondary to strong direct interpretation

- **WHEN** pasted input has a strong direct interpretation and also produces derived payload matches
- **THEN** the strong direct interpretation SHALL remain ranked ahead unless a derived match has a higher adjusted confidence.

#### Scenario: Plain text fallback

- **WHEN** pasted input only produces generic text cleanup
- **THEN** the text cleanup match SHALL still be returned.

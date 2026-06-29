## MODIFIED Requirements

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

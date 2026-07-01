## ADDED Requirements

### Requirement: Derived candidate producers

The registry SHALL compose derived detection from small candidate producer functions that each perform one wrapper extraction or decoding responsibility.

#### Scenario: Percent decoding candidate

- **WHEN** the registry derives a percent-decoded candidate
- **THEN** the derivation SHALL be implemented through a focused candidate producer with explicit labeling for the decoded source.

#### Scenario: URL parameter candidate

- **WHEN** the registry derives candidates from URL query parameters
- **THEN** query parsing SHALL preserve complete parameter values and SHALL NOT rely on ad hoc string splitting that loses embedded separators.

#### Scenario: Base64 or JWT candidate

- **WHEN** the registry derives candidates from Base64, Base64URL, or JWT payload wrappers
- **THEN** the derivation SHALL reuse focused decoding helpers rather than duplicating decoder implementations inside the registry orchestration file.

### Requirement: Explicit ranking policy

The registry SHALL keep match ranking policy explicit and aligned with the registered tool manifest.

#### Scenario: Registered tool has ranking policy

- **WHEN** a tool is registered in the static manifest
- **THEN** the registry SHALL have an explicit ranking policy or manifest-backed default for that tool.

#### Scenario: Ranking policy changes

- **WHEN** ranking bias or ordering policy changes
- **THEN** registry tests SHALL cover the affected ordering behavior.

### Requirement: Semantic deduplication

The registry SHALL deduplicate equivalent matches without dropping distinct semantic matches from the same tool and source.

#### Scenario: Equivalent direct and derived match

- **WHEN** direct and derived detection produce the same semantic match for the same tool and source
- **THEN** the registry SHALL return one match for that semantic result.

#### Scenario: Distinct same-source matches

- **WHEN** one tool produces multiple distinct semantic matches for the same source
- **THEN** deduplication SHALL preserve those distinct matches.

### Requirement: Small registry orchestration modules

Registry orchestration SHALL be split into focused modules for manifest registration, derived candidate production, ranking policy, deduplication, examples, and public detection APIs.

#### Scenario: Detection orchestration grows

- **WHEN** detection orchestration needs new ranking, derivation, or deduplication behavior
- **THEN** the behavior SHALL be added to the focused registry module for that responsibility instead of expanding a broad all-in-one detection function.

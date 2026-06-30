## ADDED Requirements

### Requirement: Tool contract regression coverage
The project SHALL include automated tests for detector and converter behavior when a tool package is changed.

#### Scenario: Tool detector behavior changes
- **WHEN** a tool package detector is added or changed
- **THEN** tests SHALL cover at least one supported match and at least one unsupported non-match.

#### Scenario: Tool converter output changes
- **WHEN** a tool package field output, primary serialization, or editable conversion changes
- **THEN** tests SHALL cover the affected field, serialized value, or edit result.

#### Scenario: Detection orchestration changes
- **WHEN** registry detection ordering, derived-source detection, or deduplication changes
- **THEN** registry tests SHALL cover the affected orchestration behavior.

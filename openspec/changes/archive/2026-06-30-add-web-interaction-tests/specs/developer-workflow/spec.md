## ADDED Requirements

### Requirement: Web interaction regression coverage
The project SHALL include automated tests for core web app interactions that protect paste-first workflows.

#### Scenario: Smart input workflow changes
- **WHEN** smart input, example selection, result card rendering, or URL search handling changes
- **THEN** web tests SHALL cover the affected user-visible behavior.

#### Scenario: Result card action changes
- **WHEN** result card editing, copy actions, field expansion, or apply-to-input behavior changes
- **THEN** web tests SHALL cover the affected interaction without requiring a real browser permission prompt.

#### Scenario: Web test suite runs
- **WHEN** the repository test suite runs
- **THEN** web interaction tests SHALL run through the existing package test command.

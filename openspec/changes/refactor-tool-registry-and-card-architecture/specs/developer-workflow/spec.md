## ADDED Requirements

### Requirement: Reusable contract test helpers

The project SHALL provide lightweight reusable test helpers or shared test patterns for common tool module contract assertions when they reduce duplication and clarify expected behavior.

#### Scenario: Tool contract helper is used

- **WHEN** a tool package adds or changes detector, field, edit, or serialization behavior
- **THEN** tests SHALL use the reusable helper or pattern where it applies and SHALL still cover tool-specific behavior directly.

#### Scenario: Tool field contract changes

- **WHEN** shared field contract expectations change
- **THEN** tests SHALL cover field identity, copy values, editability, and primary serialization behavior affected by the change.

### Requirement: Architecture refactor regression coverage

Architecture refactors SHALL preserve behavior through focused regression tests at the package boundary being changed.

#### Scenario: Registry orchestration refactor

- **WHEN** registry derivation, deduplication, ranking policy, or manifest behavior is refactored
- **THEN** registry tests SHALL cover the changed orchestration behavior through the public registry API.

#### Scenario: Web result card refactor

- **WHEN** result card state, rendering, copy actions, or apply-to-input composition is refactored
- **THEN** web interaction tests SHALL cover the affected user-visible workflow.

#### Scenario: Tool package internal split

- **WHEN** a tool package moves logic out of `src/index.ts`
- **THEN** existing public behavior tests SHALL continue importing through the package's public entrypoint.

## ADDED Requirements

### Requirement: Follow-up refactor scope control
Follow-up architecture refactors SHALL keep each commit focused on a bounded module-boundary improvement and SHALL avoid mixing unrelated product behavior changes into structural cleanup.

#### Scenario: Tool package cleanup
- **WHEN** tool package internals are reorganized
- **THEN** the change SHALL preserve existing user-visible behavior and limit edits to package-local organization, tests, and directly affected imports.

#### Scenario: Large helper split
- **WHEN** a helper file is split because it has multiple responsibilities
- **THEN** the resulting modules SHALL have responsibility-oriented names such as `metadata`, `parse`, `format`, `patterns`, `codec`, or `state`.

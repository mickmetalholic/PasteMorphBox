## ADDED Requirements

### Requirement: Static tool manifest

The registry SHALL compose detection from a static ordered manifest of registered tool modules.

#### Scenario: Registry loads tools

- **WHEN** the registry initializes registered tools
- **THEN** it SHALL use a statically imported ordered tool manifest rather than dynamic runtime package discovery.

#### Scenario: Tool order is inspected

- **WHEN** detection ordering behavior is reviewed
- **THEN** the ordered registered tool list SHALL be available in one manifest file.

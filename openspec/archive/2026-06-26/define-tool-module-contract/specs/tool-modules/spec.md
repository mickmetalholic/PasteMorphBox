# Tool Module Spec Delta

## ADDED Requirements

### Requirement: Tool module contract

Each conversion capability SHALL expose a `ToolModule` with detect, getFields, and serializePrimary behavior.

#### Scenario: Detect all tools

- **WHEN** the app passes input to the registry
- **THEN** registered tool modules SHALL return sorted matches with confidence scores.

## MODIFIED Requirements

### Requirement: Tool module contract

Each conversion capability SHALL expose a `ToolModule` with detect, getFields, and serializePrimary behavior, and MAY expose discovery metadata for category, tags, examples, and fallback suggestions.

#### Scenario: Detect all tools

- **WHEN** the app passes input to the registry
- **THEN** registered tool modules SHALL return sorted matches with confidence scores.

#### Scenario: Tool metadata

- **WHEN** a tool module provides discovery metadata
- **THEN** the metadata SHALL be available through the registry without requiring app-local tool maps.

#### Scenario: Tool example

- **WHEN** a registered tool provides a paste example
- **THEN** the example source SHALL be suitable for the smart input and produce a match for that tool.

## MODIFIED Requirements

### Requirement: Tool module contract

Each conversion capability SHALL expose a `ToolModule` with detect, getFields, and serializePrimary behavior, and MAY expose discovery metadata for category, tags, examples, and fallback suggestions.

#### Scenario: Detect all tools

- **WHEN** the app passes input to the registry
- **THEN** registered tool modules SHALL return sorted direct and derived matches with confidence scores.

#### Scenario: Tool metadata

- **WHEN** a tool module provides discovery metadata
- **THEN** the metadata SHALL be available through the registry without requiring app-local tool maps.

#### Scenario: Tool example

- **WHEN** a registered tool provides a paste example
- **THEN** the example source SHALL be suitable for the smart input and produce a match for that tool.

### Requirement: Tool package source layout

Each `packages/tools/tool-*` package SHALL keep `src/index.ts` focused on public exports and `ToolModule` assembly, while complex state types, parsing, formatting, and field-building logic SHALL live in focused package-local files.

#### Scenario: Tool internals grow

- **WHEN** a tool package needs non-trivial parser, formatter, state builder, or field builder logic
- **THEN** that logic SHALL be moved out of `src/index.ts` into named package-local files such as `types.ts`, `parse.ts`, `format.ts`, `fields.ts`, or `<tool>-state.ts`.

#### Scenario: Tool behavior tests

- **WHEN** a tool package test exercises detector or converter behavior
- **THEN** the test SHALL import the tool through the public `./index` entrypoint rather than internal helper files.

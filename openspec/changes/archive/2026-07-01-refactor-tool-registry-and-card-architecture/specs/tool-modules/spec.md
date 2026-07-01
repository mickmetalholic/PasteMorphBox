## ADDED Requirements

### Requirement: Focused tool helper boundaries

Tool packages SHALL keep non-trivial detection, derivation, state-building, formatting, field-building, edit handling, and serialization helpers in focused package-local modules rather than accumulating that logic in `src/index.ts`.

#### Scenario: Tool exposes reusable derivation helper

- **WHEN** registry orchestration needs tool-adjacent conversion logic such as Base64, URL, or JWT payload decoding
- **THEN** the relevant tool package SHALL expose a focused helper from a package-local module or public entrypoint instead of requiring the registry to duplicate that conversion logic.

#### Scenario: Tool builds conditional fields

- **WHEN** a tool's result fields require branching, formatting, or repeated field construction
- **THEN** the field-building logic SHALL live in a focused package-local file rather than inside the `ToolModule` object literal.

#### Scenario: Tool index assembly

- **WHEN** a tool package defines its `ToolModule`
- **THEN** `src/index.ts` SHALL assemble public metadata and imported helper functions without becoming the primary home for parser, formatter, state, or field logic.

### Requirement: Tool helper public surface

Tool packages SHALL export only helpers that are intentionally shared outside the package and keep package-internal helpers local.

#### Scenario: Registry imports tool helper

- **WHEN** the registry imports a helper from a tool package
- **THEN** that helper SHALL be part of the package's intentional public surface and covered by package or registry behavior tests.

#### Scenario: Internal implementation helper

- **WHEN** a helper is used only by one tool package implementation
- **THEN** that helper SHALL remain package-local and SHALL NOT be exported solely for test convenience.

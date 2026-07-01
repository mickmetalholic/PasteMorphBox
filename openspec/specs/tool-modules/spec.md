# Tool Module Spec

## Purpose

Define the contract and package layout conventions for conversion tool modules.

## Requirements

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

### Requirement: Tool metadata modules
Tool packages SHALL keep non-trivial tool metadata and examples in a focused package-local metadata module instead of embedding large metadata arrays directly in `src/index.ts`.

#### Scenario: Tool metadata grows
- **WHEN** a tool package defines category, tags, examples, and descriptive text
- **THEN** that metadata SHALL live in a focused package-local module and `src/index.ts` SHALL import it for `ToolModule` assembly.

#### Scenario: Tool example behavior
- **WHEN** metadata examples are moved out of `src/index.ts`
- **THEN** existing public tool and registry tests SHALL continue proving those examples detect through the owning tool.

### Requirement: Multi-responsibility tool internals
Tool packages SHALL split large state, parser, formatter, codec, and pattern files when one file contains multiple independent responsibilities.

#### Scenario: Parser and formatter share a state file
- **WHEN** a state helper file contains both parsing and output formatting logic
- **THEN** the parser and formatter logic SHALL be separated into focused modules if doing so improves readability without changing behavior.

#### Scenario: Pattern definitions and output formatting share an extraction file
- **WHEN** extraction patterns and output formatting live in the same file
- **THEN** pattern definitions and output formatting SHALL be moved into focused modules.

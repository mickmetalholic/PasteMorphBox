## ADDED Requirements

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

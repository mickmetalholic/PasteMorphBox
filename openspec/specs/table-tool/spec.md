# Table Tool Spec

## Purpose

Define table and list detection plus copyable conversion outputs for pasted row-oriented text.

## Requirements

### Requirement: Table and list detection

The table tool SHALL detect pasted delimited rows, Markdown tables, and multi-line lists.

#### Scenario: Delimited rows

- **WHEN** the user pastes CSV, TSV, or pipe-delimited rows
- **THEN** the table tool SHALL return a table conversion match.

#### Scenario: Multi-line list

- **WHEN** the user pastes multiple non-empty plain lines
- **THEN** the table tool SHALL return a list conversion match.

### Requirement: Table conversion outputs

The table tool SHALL provide copyable table format outputs.

#### Scenario: Convert table

- **WHEN** tabular rows are detected
- **THEN** the result card SHALL include Markdown table, CSV, and TSV fields.

### Requirement: List outputs

The table tool SHALL provide copyable list outputs.

#### Scenario: Convert list

- **WHEN** rows are detected
- **THEN** the result card SHALL include numbered list and bullet list fields.

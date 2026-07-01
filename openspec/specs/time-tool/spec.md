# Time Tool Spec

## Purpose

Define Unix timestamp detection and conversion outputs for paste-first time workflows.

## Requirements

### Requirement: Timestamp conversion

The time tool SHALL convert Unix timestamp input into common time formats.

#### Scenario: Seconds timestamp

- **WHEN** the user enters `1700000000`
- **THEN** the app SHALL show a time conversion card with seconds, milliseconds, local time, UTC, and ISO values.

# Color Tool Spec

## Purpose

Define color value detection and conversion behavior for paste-first CSS color workflows.

## Requirements

### Requirement: Color conversion

The color tool SHALL parse CSS color values and display common color formats.

#### Scenario: HEX color

- **WHEN** the user enters `#ff6600`
- **THEN** the app SHALL show a color card with a swatch and common converted formats.

# Project Spec

## Requirements

### Requirement: Monorepo workspace

The project SHALL use pnpm workspace and Turborepo to coordinate apps and packages.

#### Scenario: Run workspace checks

- **WHEN** a developer runs root scripts
- **THEN** Turborepo SHALL dispatch work to app and package scripts.

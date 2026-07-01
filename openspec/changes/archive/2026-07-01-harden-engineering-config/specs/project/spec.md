## ADDED Requirements

### Requirement: Reproducible workspace toolchain
The project SHALL declare the Node.js and pnpm versions required for local development and CI execution.

#### Scenario: Install dependencies
- **WHEN** a developer or CI runner installs workspace dependencies
- **THEN** the declared package manager and Node.js runtime SHALL be discoverable from repository configuration.

### Requirement: Shared engineering configuration
The project SHALL centralize reusable TypeScript and oxlint configuration for workspace packages.

#### Scenario: Run package checks
- **WHEN** a package runs lint or typecheck scripts
- **THEN** the package SHALL use shared workspace configuration unless it has package-specific overrides.

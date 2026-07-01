# Project Spec

## Purpose

Define repository-level workspace and project structure conventions.
## Requirements
### Requirement: Monorepo workspace

The project SHALL use pnpm workspace and Turborepo to coordinate apps and packages.

#### Scenario: Run workspace checks

- **WHEN** a developer runs root scripts
- **THEN** Turborepo SHALL dispatch work to app and package scripts.

### Requirement: Web workspace package inventory

The web app SHALL keep its workspace package transpilation inventory in a dedicated configuration module.

#### Scenario: Workspace package list changes

- **WHEN** a workspace package needs to be transpiled by the web app
- **THEN** developers SHALL update the dedicated workspace package inventory rather than embedding the list directly in the general Next config object.

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

### Requirement: Web frontend foundation

The web app SHALL use Next.js configured for static frontend output as its application shell while preserving pnpm workspace and Turborepo coordination.

#### Scenario: Web package development

- **WHEN** a developer runs the web package development script
- **THEN** the script SHALL start the Next.js development server for `apps/web`.

#### Scenario: Workspace checks

- **WHEN** a developer runs root workspace scripts
- **THEN** Turborepo SHALL dispatch to the Next.js-based web package scripts and workspace package scripts.


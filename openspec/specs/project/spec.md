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

### Requirement: Workspace inventory consistency
The project SHALL minimize duplicated workspace package and tool registration inventories while preserving explicit static imports needed by the frontend bundle.

#### Scenario: Tool package is added
- **WHEN** a new `packages/tools/tool-*` package is registered for detection
- **THEN** developers SHALL update a single clear manifest or mechanically connected inventory path for tool registration and web transpilation needs.

#### Scenario: Workspace transpilation list is reviewed
- **WHEN** the web app's workspace transpilation inventory is reviewed
- **THEN** the inventory SHALL be easy to compare against registered workspace packages and SHALL NOT require searching unrelated files for duplicate tool lists.

### Requirement: Modular implementation guardrail
The project SHALL avoid introducing large files, large components, or broad functions when implementing cross-cutting architecture changes.

#### Scenario: Cross-package refactor is implemented
- **WHEN** a refactor touches registry, tool packages, and web rendering
- **THEN** each new module SHALL have a focused responsibility and broad orchestration SHALL be composed from small functions.

#### Scenario: New abstraction is added
- **WHEN** a new abstraction is introduced during refactoring
- **THEN** it SHALL remove concrete duplication or clarify an existing boundary rather than add an extra layer without a clear maintenance benefit.

### Requirement: Follow-up refactor scope control
Follow-up architecture refactors SHALL keep each commit focused on a bounded module-boundary improvement and SHALL avoid mixing unrelated product behavior changes into structural cleanup.

#### Scenario: Tool package cleanup
- **WHEN** tool package internals are reorganized
- **THEN** the change SHALL preserve existing user-visible behavior and limit edits to package-local organization, tests, and directly affected imports.

#### Scenario: Large helper split
- **WHEN** a helper file is split because it has multiple responsibilities
- **THEN** the resulting modules SHALL have responsibility-oriented names such as `metadata`, `parse`, `format`, `patterns`, `codec`, or `state`.

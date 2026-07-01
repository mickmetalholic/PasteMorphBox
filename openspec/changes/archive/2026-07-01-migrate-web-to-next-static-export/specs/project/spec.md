## ADDED Requirements

### Requirement: Web frontend foundation

The web app SHALL use Next.js configured for static frontend output as its application shell while preserving pnpm workspace and Turborepo coordination.

#### Scenario: Web package development

- **WHEN** a developer runs the web package development script
- **THEN** the script SHALL start the Next.js development server for `apps/web`.

#### Scenario: Workspace checks

- **WHEN** a developer runs root workspace scripts
- **THEN** Turborepo SHALL dispatch to the Next.js-based web package scripts and workspace package scripts.

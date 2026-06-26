# developer-workflow Specification

## Purpose
TBD - created by archiving change install-codex-openspec-skills. Update Purpose after archive.
## Requirements
### Requirement: Codex OpenSpec skills
The project SHALL provide repo-local Codex OpenSpec skills for proposing, applying, continuing, verifying, fast-forwarding, archiving, creating, and exploring OpenSpec changes.

#### Scenario: Developer opens the project in Codex
- **WHEN** a developer opens the repository in Codex after the integration is installed
- **THEN** Codex SHALL be able to discover the project-local OpenSpec skills under `.codex/skills`.

### Requirement: OpenSpec configuration
The project SHALL include repo-local OpenSpec configuration declaring the active planning schema.

#### Scenario: OpenSpec CLI resolves project workflow
- **WHEN** a developer runs OpenSpec commands from the repository root
- **THEN** the CLI SHALL resolve the `spec-driven` schema from `openspec/config.yaml`.

### Requirement: Automated quality gate

The project SHALL run automated workspace quality checks for GitHub pull requests and pushes.

#### Scenario: Pull request validation

- **WHEN** a pull request or push updates project files
- **THEN** CI SHALL install dependencies with the lockfile and run lint, tests, typecheck, and production build.

### Requirement: Registry test coverage

The registry package SHALL have tests for the registered tool aggregation path.

#### Scenario: Run workspace tests

- **WHEN** a developer runs `pnpm test`
- **THEN** the registry package SHALL execute at least one test instead of relying on a no-test pass-through.

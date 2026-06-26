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

### Requirement: Pull request CI checks
The project SHALL run automated CI checks for pull requests using GitHub Actions.

#### Scenario: Pull request validation
- **WHEN** a pull request is opened, synchronized, or reopened
- **THEN** CI SHALL run the repository test suite, type checking, and production build commands

#### Scenario: Main branch validation
- **WHEN** changes are pushed to `main`
- **THEN** CI SHALL run the repository test suite, type checking, and production build commands

#### Scenario: Required check configuration
- **WHEN** repository maintainers configure GitHub branch protection
- **THEN** the CI workflow SHALL expose a stable check that can be required before merging


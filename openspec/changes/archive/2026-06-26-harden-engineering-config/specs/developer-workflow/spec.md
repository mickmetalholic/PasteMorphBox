## ADDED Requirements

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

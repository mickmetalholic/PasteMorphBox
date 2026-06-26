## ADDED Requirements

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

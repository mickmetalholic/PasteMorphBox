## ADDED Requirements

### Requirement: Local verification runtime guidance
The project SHALL document the runtime prerequisites needed to run repository verification commands locally.

#### Scenario: Developer prepares local verification
- **WHEN** a developer reads the project setup instructions
- **THEN** the instructions SHALL identify the required Node major version and pnpm package manager version source.

#### Scenario: Developer runs repository checks
- **WHEN** a developer follows the documented verification workflow
- **THEN** the workflow SHALL include the repository test suite, type checking, and production build commands.

#### Scenario: Node is missing from PATH
- **WHEN** a local shell can run pnpm but cannot resolve node
- **THEN** the documentation SHALL identify this as a runtime setup problem to fix before rerunning checks.

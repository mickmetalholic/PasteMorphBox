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

### Requirement: Tool contract regression coverage
The project SHALL include automated tests for detector and converter behavior when a tool package is changed.

#### Scenario: Tool detector behavior changes
- **WHEN** a tool package detector is added or changed
- **THEN** tests SHALL cover at least one supported match and at least one unsupported non-match.

#### Scenario: Tool converter output changes
- **WHEN** a tool package field output, primary serialization, or editable conversion changes
- **THEN** tests SHALL cover the affected field, serialized value, or edit result.

#### Scenario: Detection orchestration changes
- **WHEN** registry detection ordering, derived-source detection, or deduplication changes
- **THEN** registry tests SHALL cover the affected orchestration behavior.

### Requirement: Web interaction regression coverage
The project SHALL include automated tests for core web app interactions that protect paste-first workflows.

#### Scenario: Smart input workflow changes
- **WHEN** smart input, example selection, result card rendering, or URL search handling changes
- **THEN** web tests SHALL cover the affected user-visible behavior.

#### Scenario: Result card action changes
- **WHEN** result card editing, copy actions, field expansion, or apply-to-input behavior changes
- **THEN** web tests SHALL cover the affected interaction without requiring a real browser permission prompt.

#### Scenario: Web test suite runs
- **WHEN** the repository test suite runs
- **THEN** web interaction tests SHALL run through the existing package test command.

### Requirement: Test source layout
The project SHALL keep package behavior tests colocated with package source and web app behavior tests under `apps/web/src/test`.

#### Scenario: Package behavior tests
- **WHEN** a tool, registry, core, or UI package behavior is tested
- **THEN** the tests SHALL live in that package's `src` tree and import the package through its public entrypoint when validating public behavior.

#### Scenario: Web behavior tests
- **WHEN** web app interactions, examples, discovery surfaces, or route-level workflows are tested
- **THEN** the tests SHALL live under `apps/web/src/test`.

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

### Requirement: Web TypeScript import extension hygiene
The project SHALL validate web app TypeScript using configuration that rejects local `.ts` and `.tsx` source extension imports by default.

#### Scenario: Web app typecheck rejects TypeScript source extension imports
- **WHEN** a developer runs the web app typecheck or the repository typecheck command
- **THEN** TypeScript SHALL reject local imports that include `.ts` or `.tsx` source extensions unless a future change explicitly documents and configures an exception.

#### Scenario: Web app build keeps extensionless import validation
- **WHEN** a developer runs the web app build or the repository build command
- **THEN** the TypeScript build step SHALL validate the web app with extensionless local import expectations before Vite produces production assets.

### Requirement: Web browser TypeScript library coverage
The project SHALL preserve browser DOM iterable type coverage when the web app TypeScript config overrides shared library settings.

#### Scenario: Web app typecheck includes DOM iterable APIs
- **WHEN** a developer runs the web app typecheck or the repository typecheck command
- **THEN** TypeScript SHALL include DOM iterable library definitions for browser app source.

### Requirement: Stable lint configuration metadata
The project SHALL use lint configuration schema metadata that does not depend on workspace dependencies being installed.

#### Scenario: Editor reads root lint config before install
- **WHEN** a developer opens the root oxlint config before installing dependencies
- **THEN** the schema reference SHALL resolve without requiring an app-local `node_modules` directory.

#### Scenario: Editor reads web lint config before install
- **WHEN** a developer opens the web oxlint config before installing dependencies
- **THEN** the schema reference SHALL resolve without requiring a package-local `node_modules` directory.

### Requirement: CI package manager source of truth
The project SHALL activate pnpm in CI from the root `packageManager` field.

#### Scenario: CI enables pnpm
- **WHEN** the CI workflow prepares pnpm with Corepack
- **THEN** it SHALL read the package manager specifier from the root package metadata instead of hardcoding a duplicate pnpm version.


## ADDED Requirements

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

## 1. Toolchain and CI

- [x] 1.1 Add Node.js and pnpm runtime configuration for local and CI usage.
- [x] 1.2 Add a GitHub Actions workflow that installs with the lockfile and runs lint, test, typecheck, and build.

## 2. Workspace Configuration

- [x] 2.1 Declare the web production build output in Turborepo configuration.
- [x] 2.2 Wire shared TypeScript configuration into app and package configs without changing runtime behavior.
- [x] 2.3 Wire shared oxlint configuration into root and app lint configuration.

## 3. Test Gate

- [x] 3.1 Add registry tests for registered tool detection and module lookup.
- [x] 3.2 Remove the registry no-test pass-through once tests exist.

## 4. Verification

- [x] 4.1 Run lint, test, typecheck, and build successfully.
- [x] 4.2 Review the final diff for scope and keep the OpenSpec tasks current.

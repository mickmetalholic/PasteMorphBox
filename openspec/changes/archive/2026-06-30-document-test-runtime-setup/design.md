## Context

The repository declares Node 24 in `.nvmrc` and package metadata, and CI installs dependencies with pnpm before running lint, test, typecheck, and build. Local Codex sessions can still reach a state where `pnpm` is available but `node` is not on `PATH`, which prevents Turbo from starting before any tests run.

## Goals / Non-Goals

**Goals:**

- Make the required local runtime explicit in contributor documentation.
- Keep the verification command sequence aligned with CI and AGENTS.md.
- Provide a concise troubleshooting path for shells that can run pnpm but not Node.

**Non-Goals:**

- Add new dependencies or change package manager behavior.
- Change CI behavior.
- Add or modify product tests in this change.

## Decisions

- Document the existing Node 24 and pnpm requirements in README instead of adding wrapper scripts. This keeps the source of truth aligned with `.nvmrc`, `packageManager`, and CI without introducing another command layer.
- Include the full verification sequence in the setup section so contributors run `pnpm test`, `pnpm typecheck`, and `pnpm build` from a correctly configured shell.
- Add a troubleshooting note for the `node: not found` failure mode because it is a runtime setup issue, not a repository test failure.

## Risks / Trade-offs

- Documentation can drift from package metadata. Mitigation: keep the text short and refer directly to `.nvmrc` and `packageManager`.
- A README note does not fix every local shell. Mitigation: CI remains the enforcement mechanism, while docs make the local prerequisite clear.

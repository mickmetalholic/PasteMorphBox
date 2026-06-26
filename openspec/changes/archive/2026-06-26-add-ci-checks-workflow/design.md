## Context

PasteMorphBox already defines local completion checks in `AGENTS.md`: `pnpm test`, `pnpm typecheck`, and `pnpm build`. Those checks currently depend on a developer running them manually before pushing or merging.

The repository is also being prepared for Cloudflare Pages preview deployments. Preview deployments validate that static output can be deployed, but they should be complemented by source-level CI checks that GitHub branch protection can require.

## Goals / Non-Goals

**Goals:**

- Run the project's required test, typecheck, and build commands automatically on pull requests.
- Run the same checks on pushes to `main`.
- Use a deterministic Node.js and pnpm setup aligned with the deployment configuration.
- Keep the workflow simple enough to maintain as the monorepo grows.

**Non-Goals:**

- Deploy the app from GitHub Actions.
- Replace Cloudflare Pages Git integration or preview deployments.
- Add release automation, publishing, or branch protection rules in code.

## Decisions

- Use GitHub Actions as the CI runner.
  - Rationale: It integrates directly with pull request checks and branch protection.
  - Alternative considered: Rely only on Cloudflare Pages build status. That does not provide explicit test and typecheck gates.

- Run `pnpm test`, `pnpm typecheck`, and `pnpm build` as separate workflow steps.
  - Rationale: Separate steps make failures easier to diagnose while preserving the same commands developers run locally.
  - Alternative considered: Use one combined script. That would be shorter but less readable in GitHub check logs.

- Use Corepack to activate `pnpm@11.9.0`.
  - Rationale: The repository declares pnpm in `packageManager`, and explicit activation avoids runner default drift.
  - Alternative considered: Install pnpm through a third-party action. Corepack is sufficient for this workflow.

## Risks / Trade-offs

- GitHub-hosted runner defaults can change. Mitigation: pin the Node.js major version and pnpm version.
- CI duration may grow as packages are added. Mitigation: cache the pnpm store and keep Turborepo commands at the root.
- Branch protection still requires manual GitHub repository settings. Mitigation: expose a stable workflow job name that can be selected as a required check.

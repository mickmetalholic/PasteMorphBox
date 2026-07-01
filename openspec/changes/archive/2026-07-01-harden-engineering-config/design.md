## Context

PasteMorphBox is a pure frontend pnpm workspace coordinated by Turborepo. The root scripts already cover lint, tests, typecheck, and build, but CI is absent, toolchain versions are only partially declared, shared config packages are not wired into package configs, and Turbo build outputs are not declared for the web app.

## Goals / Non-Goals

**Goals:**

- Make engineering checks reproducible between local development and CI.
- Keep package configuration consistent through shared TypeScript and oxlint config.
- Preserve the current source-first internal package model while making the build pipeline clearer.
- Add minimal tests for the registry package so aggregation changes cannot silently skip tests.

**Non-Goals:**

- Introduce a publishable package build with emitted JavaScript or declaration files.
- Change runtime app behavior, visual design, or conversion logic.
- Add broad end-to-end browser testing.

## Decisions

- Use GitHub Actions for CI because the repository already targets GitHub and the requested outcome includes a GitHub PR. The workflow will run on pushes and pull requests with `pnpm install --frozen-lockfile`, then `lint`, `test`, `typecheck`, and `build`.
- Pin Node with `.nvmrc` and `package.json#engines`, and keep pnpm pinned through `packageManager`. CI will use Corepack so the declared pnpm version is respected instead of relying on the runner default.
- Keep package `build` scripts as TypeScript validation for internal packages. The packages export TypeScript source and are consumed by the Vite app through workspace links; emitting package `dist` output would add packaging work that is not needed for the MVP.
- Move shared TypeScript strictness into `tsconfig.base.json` and have the web app configs extend it. App-specific configs will override only browser or Node differences.
- Use root-level oxlint configuration that extends the shared package config. Package scripts can continue invoking `oxlint src`, while the web app can keep React-specific rules.
- Add `apps/web/dist/**` to Turbo build outputs so production assets participate in task caching.

## Risks / Trade-offs

- CI runtime pinning can fail if the chosen Node version is unavailable on a runner. Mitigation: use a current LTS version supported by `actions/setup-node`.
- Sharing stricter TS options may surface errors in app or config files. Mitigation: apply overrides only where needed and keep the current command set green.
- Keeping internal packages source-first means package `build` remains closer to validation than artifact generation. Mitigation: document that the deployable artifact is the Vite app output.

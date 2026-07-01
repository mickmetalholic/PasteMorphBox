## Context

The web app extends the shared strict TypeScript config and runs `tsc -b` before Vite builds production assets. Its app and Vite config TypeScript projects currently set `allowImportingTsExtensions` even though no web imports rely on explicit `.ts` or `.tsx` source extensions. A few adjacent config values also duplicate or weaken existing sources of truth: the app lib override omits `DOM.Iterable`, oxlint schema metadata points at local `node_modules`, and CI repeats the pnpm version already declared by `packageManager`.

## Goals / Non-Goals

**Goals:**

- Keep web TypeScript validation aligned with extensionless imports used by Vite and the existing source.
- Prevent future app or Vite config code from importing local TypeScript source with `.ts` or `.tsx` extensions by default.
- Keep browser DOM iterable types available in web app typechecking.
- Make lint config schema metadata stable before dependencies are installed.
- Keep CI package manager activation coupled to the root package metadata.
- Preserve the existing no-emit validation model and production build behavior.

**Non-Goals:**

- Change shared TypeScript strictness for package projects.
- Convert the workspace to emitted package builds or declaration-only builds.
- Change any runtime app behavior, UI, or tool conversion logic.

## Decisions

- Remove `allowImportingTsExtensions` from `apps/web/tsconfig.app.json` and `apps/web/tsconfig.node.json`. The default TypeScript behavior is sufficient and makes explicit TypeScript extension imports a validation error.
- Keep `DOM.Iterable` in `apps/web/tsconfig.app.json`. The web config overrides the shared lib list, so browser iterable types must be repeated explicitly.
- Use the SchemaStore oxlint schema URL in root and web oxlint config files. This keeps editor validation independent of whether dependencies have been installed in `apps/web`.
- Use `node -p "require('./package.json').packageManager"` in CI before `corepack prepare`. The root `packageManager` field remains the single source for the exact pnpm version.
- Keep `noEmit` inherited from the shared config. This change is about import hygiene, not changing how web typechecking or builds emit artifacts.
- Avoid adding a replacement lint rule because TypeScript already enforces the relevant import shape once the option is removed.

## Risks / Trade-offs

- Existing or future explicit `.ts` imports in web code will fail typecheck. Mitigation: use extensionless local imports, matching current code style and Vite resolution.
- If a future toolchain requirement genuinely needs TypeScript extension imports, the config will need an explicit documented exception. Mitigation: keep the restriction scoped to web configs rather than changing shared package configuration.
- The CI pnpm activation command now depends on Node being available before Corepack activation. Mitigation: `actions/setup-node` already runs first and reads `.nvmrc`.

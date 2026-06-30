## Context

The web app currently exposes a single paste-first screen. The App Router entry in `apps/web/src/app/page.tsx` delegates to `apps/web/src/App.tsx`, but that file contains most UI components and local behavior. As more tools and card workflows are added, the app needs a source layout that makes ownership clear without adding traditional tool navigation.

## Goals / Non-Goals

**Goals:**

- Separate route entries from product module implementation.
- Split large React components into focused component directories.
- Keep the smart input and result cards behavior unchanged.
- Establish a repeatable directory convention for future web components.

**Non-Goals:**

- Redesign the UI.
- Add routes, navigation, or new tool surfaces.
- Change registry, tool package, or core contracts.
- Move workspace packages; that is handled separately.

## Decisions

- Keep `apps/web/src/App.tsx` as a small app shell instead of turning every file into a directory. The shell is a stable composition point and does not need local substructure.
- Put the paste-first screen under `apps/web/src/modules/paste-workbench`. `modules` is intentionally used instead of `features` because it is a neutral app-internal grouping, not a route convention.
- Use `ComponentName/index.tsx` for workbench components. If a component later needs local helpers, styles, tests, or subcomponents, they live next to that component.
- Move `store.ts` to `store/input-store.ts` to avoid a growing flat app root.

## Risks / Trade-offs

- Moving files can break imports without changing behavior. Mitigation: keep exports simple and run the web tests plus repository verification.
- Component directories add more files. Mitigation: only use directories for meaningful UI units, while simple app shell files stay flat.

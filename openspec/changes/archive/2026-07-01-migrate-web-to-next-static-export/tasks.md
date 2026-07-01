## 1. Next.js Web Package Setup

- [x] 1.1 Replace Vite/TanStack Router web dependencies and scripts with Next.js-compatible dependencies and scripts.
- [x] 1.2 Add Next.js configuration for static export and workspace package transpilation.
- [x] 1.3 Replace Vite entry files with Next App Router files, including root layout, root page, metadata, and global CSS import.
- [x] 1.4 Update Tailwind CSS build integration for the Next.js pipeline.
- [x] 1.5 Remove obsolete Vite-specific files after equivalent Next.js files are in place.

## 2. App Behavior Migration

- [x] 2.1 Move the current interactive paste-first experience into a client component used by the Next root page.
- [x] 2.2 Replace TanStack Router search handling with Next-compatible `q` query initialization.
- [x] 2.3 Preserve stale `q` clearing when the user edits the smart input, tries an example, applies a card value, or clears the input.
- [x] 2.4 Preserve result card editing, copy field, copy all, field folding, examples, empty state, and no-match guidance behavior.

## 3. Static Deployment Output

- [x] 3.1 Ensure `pnpm build` leaves deployable static assets in `apps/web/dist`.
- [x] 3.2 Ensure static host metadata such as `_headers` is present in the generated deployment output.
- [x] 3.3 Update Cloudflare Pages configuration and deployment documentation only if the final output path or build command differs from the existing contract.

## 4. Tests And Documentation

- [x] 4.1 Update web app interaction tests to render the migrated Next client component and cover existing behavior.
- [x] 4.2 Update web app README and project technical documentation to describe Next.js static export instead of Vite/TanStack Router.
- [x] 4.3 Remove or update Vite-specific TypeScript configuration and test setup references.

## 5. Verification

- [x] 5.1 Run `pnpm test`.
- [x] 5.2 Run `pnpm typecheck`.
- [x] 5.3 Run `pnpm build`.
- [x] 5.4 Inspect the generated `apps/web/dist` output for static HTML/assets and copied header rules.

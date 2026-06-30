## 1. Web TypeScript Configuration

- [x] 1.1 Confirm the web app does not rely on local `.ts` or `.tsx` source extension imports.
- [x] 1.2 Remove `allowImportingTsExtensions` from the browser app TypeScript config.
- [x] 1.3 Remove `allowImportingTsExtensions` from the Vite/Node TypeScript config.
- [x] 1.4 Preserve `DOM.Iterable` in the browser app TypeScript lib override.

## 2. Workspace Configuration

- [x] 2.1 Replace dependency-local oxlint schema references with stable schema URLs.
- [x] 2.2 Update CI pnpm activation to read the root `packageManager` field.

## 3. Verification

- [x] 3.1 Run the repository lint suite successfully.
- [x] 3.2 Run the repository test suite successfully.
- [x] 3.3 Run the repository typecheck successfully.
- [x] 3.4 Run the repository production build successfully.

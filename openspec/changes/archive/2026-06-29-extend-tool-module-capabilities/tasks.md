## 1. Core Contract

- [x] 1.1 Add shared category and example metadata types to `packages/core`.
- [x] 1.2 Extend `ToolModule` with optional discovery metadata without changing existing required behavior.

## 2. Tool Metadata

- [x] 2.1 Add category, tags, and examples to existing time, color, JSON, URL, and Base64 tools.
- [x] 2.2 Mark selected examples as suitable no-match suggestions.

## 3. Registry APIs

- [x] 3.1 Add helpers to return grouped tool examples and no-match suggestions from registered modules.
- [x] 3.2 Add tests proving registered examples detect their owning tools.

## 4. Web App Integration

- [x] 4.1 Replace app-local discovery content with registry-derived examples and suggestions.
- [x] 4.2 Update focused web tests for registry-backed discovery data.

## 5. Verification

- [x] 5.1 Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.

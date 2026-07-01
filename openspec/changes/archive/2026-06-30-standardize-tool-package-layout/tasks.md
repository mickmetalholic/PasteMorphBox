## 1. Tool Package Convention

- [x] 1.1 Document current `packages/tools/tool-*` package layout expectations.
- [x] 1.2 Add a `tool-modules` spec requirement for focused tool package internals.

## 2. Tool Splits

- [x] 2.1 Split Base64 state and codec helpers from `tool-base64/src/index.ts`.
- [x] 2.2 Split URL state helpers from `tool-url/src/index.ts`.
- [x] 2.3 Split JSON state helpers from `tool-json/src/index.ts`.
- [x] 2.4 Split JWT state helpers from `tool-jwt/src/index.ts`.
- [x] 2.5 Keep affected tests importing tools through public `./index` entrypoints.

## 3. Verification

- [x] 3.1 Run affected tool tests.
- [x] 3.2 Run `pnpm test`.
- [x] 3.3 Run `pnpm typecheck`.
- [x] 3.4 Run `pnpm build`.

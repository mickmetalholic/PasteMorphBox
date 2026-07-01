# PasteMorphBox Project

PasteMorphBox is a pure frontend, paste-first conversion toolbox. The product avoids a traditional tool navigation in the MVP. Users paste arbitrary text into one smart input, and the app renders ranked conversion cards.

## MVP product rules

- Preserve the smart input as the original source text.
- Result card edits update only that card until the user explicitly applies a card value back to the input.
- Show multiple likely interpretations when input matches more than one tool.
- Keep all MVP conversions local in the browser.
- Keep visuals simple, readable, and responsive.

## Technical rules

- Use Next.js static export, React, TypeScript, Tailwind CSS, Zustand, pnpm workspace, Turborepo, and Vitest.
- Keep conversion capabilities in independent packages.
- Use browser-native APIs or mature libraries for conversion logic.
- App code may compose tools, but must not own tool-specific conversion rules.

## OpenSpec document layout

- `openspec/specs/` contains the current accepted requirements.
- `openspec/changes/<change-name>/` contains active change proposals.
- `openspec/changes/archive/YYYY-MM-DD-<change-name>/` contains completed historical changes.
- Do not create a separate top-level `openspec/archive/` tree; keep all archived changes under `openspec/changes/archive/` so the current OpenSpec tools and docs use one convention.

## Historical baseline

The initial MVP was delivered through these archived changes:

1. `2026-06-26-bootstrap-monorepo`
2. `2026-06-26-create-web-shell`
3. `2026-06-26-define-tool-module-contract`
4. `2026-06-26-add-smart-input-flow`
5. `2026-06-26-add-time-tool`
6. `2026-06-26-add-color-tool`
7. `2026-06-26-add-json-tool`
8. `2026-06-26-add-url-and-base64-tools`
9. `2026-06-26-polish-mvp-experience`
10. `2026-06-26-prepare-deployment`

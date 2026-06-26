# PasteMorphBox Project

PasteMorphBox is a pure frontend, paste-first conversion toolbox. The product avoids a traditional tool navigation in the MVP. Users paste arbitrary text into one smart input, and the app renders ranked conversion cards.

## MVP product rules

- Preserve the smart input as the original source text.
- Result card edits update only that card until the user explicitly applies a card value back to the input.
- Show multiple likely interpretations when input matches more than one tool.
- Keep all MVP conversions local in the browser.
- Keep visuals simple, readable, and responsive.

## Technical rules

- Use React, TypeScript, Vite, TanStack Router, Tailwind CSS, Zustand, pnpm workspace, Turborepo, and Vitest.
- Keep conversion capabilities in independent packages.
- Use browser-native APIs or mature libraries for conversion logic.
- App code may compose tools, but must not own tool-specific conversion rules.

## MVP changes

1. `bootstrap-monorepo`
2. `create-web-shell`
3. `define-tool-module-contract`
4. `add-smart-input-flow`
5. `add-time-tool`
6. `add-color-tool`
7. `add-json-tool`
8. `add-url-and-base64-tools`
9. `polish-mvp-experience`
10. `prepare-deployment`

## Why

Local verification can fail before tests execute when the shell cannot resolve the required Node runtime. The repository already declares Node and pnpm requirements, but the test workflow should make those prerequisites explicit for contributors and Codex sessions.

## What Changes

- Document the required Node 24 and pnpm setup for local development.
- Document the standard verification commands and the expectation that they run from a shell where Node is available.
- Add a short troubleshooting note for environments where `pnpm` is present but `node` is not on `PATH`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `developer-workflow`: Require local test runtime setup guidance for running repository checks.

## Impact

- Affects README developer instructions.
- No runtime application behavior, package APIs, or dependencies change.

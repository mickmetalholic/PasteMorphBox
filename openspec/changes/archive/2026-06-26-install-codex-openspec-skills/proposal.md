## Why

The project already uses OpenSpec planning artifacts, but Codex does not yet have the project-local OpenSpec skills and slash commands available. Installing the Codex OpenSpec integration keeps future proposals, application work, verification, and archive steps consistent and discoverable from inside the repo.

## What Changes

- Add repo-local Codex OpenSpec skills under `.codex/skills/`.
- Add repo-local OpenSpec configuration at `openspec/config.yaml`.
- Keep the existing `openspec/project.md`, specs, and archived changes intact while the project migrates to the new OpenSpec skill-based workflow.

## Capabilities

### New Capabilities

- `developer-workflow`: Developer-facing OpenSpec/Codex workflow support for proposing, applying, verifying, and archiving changes.

### Modified Capabilities

None.

## Impact

- Adds checked-in Codex skill files and OpenSpec configuration.
- Does not change app runtime behavior, package APIs, or conversion tool behavior.
- Developers should restart Codex after installation so newly generated skills and slash commands are loaded.

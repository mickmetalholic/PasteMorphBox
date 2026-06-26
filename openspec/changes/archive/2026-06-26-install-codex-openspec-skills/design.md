## Context

The repository already contains OpenSpec specs and archived changes, but it was missing the generated Codex integration files that expose OpenSpec as local agent skills. OpenSpec 1.4.1 supports a skill-based workflow for Codex via `openspec init --tools codex --force .`.

## Goals / Non-Goals

**Goals:**

- Generate repo-local Codex OpenSpec skills and commands.
- Add the OpenSpec configuration file required by the current CLI workflow.
- Preserve existing OpenSpec specs, archives, and project context.

**Non-Goals:**

- Change frontend product behavior.
- Change package APIs, tool module contracts, or conversion logic.
- Remove or migrate `openspec/project.md` content during this change.

## Decisions

- Use the OpenSpec CLI generator instead of hand-writing skill files. The generated files track the CLI's current expected structure and reduce drift from upstream OpenSpec conventions.
- Keep the generated files repo-local under `.codex/skills/`. This makes the OpenSpec workflow available to contributors working in this project without requiring unrelated global skill installation.
- Keep `openspec/project.md` for now. The CLI flags it as legacy context, but deleting or migrating that content is a separate documentation decision.

## Risks / Trade-offs

- Generated skill files can drift as OpenSpec evolves. Mitigation: refresh them with `pnpm dlx @fission-ai/openspec update .` or rerun the Codex setup when upgrading OpenSpec.
- Codex may require a restart before newly generated skills and slash commands are loaded. Mitigation: document this in tasks and final rollout notes.

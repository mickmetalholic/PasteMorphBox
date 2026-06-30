## Context

Tool packages expose the shared `ToolModule` contract and the registry composes direct and derived detections. As the tool list has grown, regressions can come from individual parsers, editable converters, metadata examples, or registry ordering and deduplication.

## Goals / Non-Goals

**Goals:**

- Strengthen tests around detector non-matches, field generation, primary serialization, and edit error paths.
- Add targeted registry regression tests for ambiguous inputs and derived sources.
- Keep implementation behavior unchanged unless a test exposes an existing defect.

**Non-Goals:**

- Introduce a new test framework.
- Add browser or React rendering tests; those are handled separately.
- Require every package to share a new helper abstraction before duplication proves costly.

## Decisions

- Expand colocated Vitest suites in each affected package. This matches the current monorepo pattern and keeps tool-specific behavior close to each tool.
- Prefer targeted examples over broad snapshot tests. The outputs are structured enough for direct assertions, and snapshots would make intentional formatter changes noisy.
- Cover registry behavior in `packages/registry` rather than in individual tool packages because sorting, derived source penalties, and deduplication are orchestration concerns.

## Risks / Trade-offs

- More tests can make refactors noisier. Mitigation: assert behavior-level fields and ordering, not every presentation string.
- Some outputs depend on local time formatting. Mitigation: avoid locale-sensitive assertions or use fixed timestamp values where possible.

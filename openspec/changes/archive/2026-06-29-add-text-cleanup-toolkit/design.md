## Context

Current tools only respond to recognizable structured inputs. When users paste ordinary text, the app can show suggestions but cannot yet transform that input. The text toolkit should become the broad fallback card that makes almost any pasted text useful while keeping specialized converters ranked first.

## Goals / Non-Goals

**Goals:**

- Add a standalone tool package that follows the existing `ToolModule` pattern.
- Produce deterministic, copyable text cleanup fields using browser/TypeScript primitives.
- Use low confidence so specialized tools remain primary matches.
- Support common list operations and basic text statistics in one card.

**Non-Goals:**

- Add AI summarization or semantic rewriting.
- Detect or extract structured entities such as emails or phone numbers; that belongs to the extraction toolkit.
- Add table parsing; that belongs to the table/list toolkit.
- Persist user preferences for cleanup operations.

## Decisions

- The text tool returns one match for non-empty input that is not too short. This keeps fallback behavior predictable.
- Confidence is based on shape: multi-line/list-like text ranks higher than single sentence text, but remains below specialized converters.
- Outputs are fields rather than separate cards. This keeps the first broad implementation compact and consistent with existing copy actions.
- The primary serialization is the "removed empty lines" output because it is a conservative cleanup that preserves content and line order.

## Risks / Trade-offs

- A fallback card can appear too often -> keep confidence low and register it after specialized tools.
- Many output fields can crowd the card -> mark long fields wide and rely on existing field copy actions.
- Title casing is language-naive -> document through tests as simple ASCII/word-boundary behavior for now.

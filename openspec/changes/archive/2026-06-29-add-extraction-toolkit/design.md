## Context

The text cleanup tool makes ordinary text useful, but it does not extract structured entities. A dedicated extraction tool can return a stronger match when pasted text contains emails, URLs, money, dates, numbers, or other recognizable tokens, while the generic text tool remains available as a lower-confidence cleanup card.

## Goals / Non-Goals

**Goals:**

- Add deterministic browser-local extraction with no external dependencies.
- Return categorized, deduplicated, copyable lists.
- Provide a CSV representation suitable for spreadsheets.
- Keep confidence below highly explicit converters but above generic text cleanup when entities are found.

**Non-Goals:**

- Perfect international phone/address parsing.
- Validation against external systems.
- Entity editing workflows.
- NLP classification or summarization.

## Decisions

- Use conservative regular expressions for MVP coverage. They are intentionally shallow and will be refined later per entity type.
- Build one extraction card containing multiple entity fields rather than one card per entity class. This avoids overwhelming the result list for messy text.
- Deduplicate within each entity class preserving first-seen order, which is usually better for operational copy/paste tasks.
- Generate CSV rows as `type,value`, escaping values with quotes so the output can be pasted into spreadsheets.

## Risks / Trade-offs

- Regex extraction may produce false positives -> use confidence based on entity count and require at least one useful extraction.
- Phone/date formats vary globally -> start with common phone-like/date-like patterns and refine later.
- URLs and domains can overlap -> keep them in separate fields because users may want both raw URLs and standalone domains.

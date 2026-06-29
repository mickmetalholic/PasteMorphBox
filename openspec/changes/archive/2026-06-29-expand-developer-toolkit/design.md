## Context

Existing developer converters cover JSON, URL, Base64, time, and color. Additional debugging values are common but do not need deep editors yet. A developer toolkit can provide shallow inspection coverage while preserving independent tool package boundaries.

## Goals / Non-Goals

**Goals:**

- Add browser-local, synchronous inspection for common developer values.
- Return multiple matches from one toolkit when a pasted value has more than one developer interpretation.
- Decode JWT and Base64URL payloads when they are valid UTF-8/JSON.
- Identify UUID and common hash-shaped strings.
- Encode/decode a small practical HTML entity set.

**Non-Goals:**

- Verify JWT signatures.
- Compute cryptographic hashes asynchronously.
- Implement full HTML entity database coverage.
- Replace existing JSON, URL, or Base64 tools.

## Decisions

- Use one `tool-developer` package for related shallow developer inspections. Each match has a `kind` in state so fields remain specific.
- Keep confidence below exact specialized tools where overlap is likely.
- Use native `atob`, `TextDecoder`, and `TextEncoder` for Base64URL decoding.
- Use a small named entity map plus numeric entity decoding for HTML entities.

## Risks / Trade-offs

- One toolkit contains multiple related detections -> keep state discriminated and tests focused per kind.
- HTML entity coverage is partial -> include numeric decoding and common named entities, refine later.
- Hash support identifies shape but does not compute digests -> label it as hash inspection rather than hash generation.

## Context

Text cleanup handles raw lines, and extraction handles entities. Users still need row-oriented conversions for copied spreadsheet fragments, CSV/TSV snippets, Markdown tables, and plain lists. This tool should provide broad shallow coverage before future refinement.

## Goals / Non-Goals

**Goals:**

- Add a standalone table/list tool package.
- Detect common delimited row formats with deterministic local parsing.
- Provide copyable CSV, TSV, Markdown table, numbered list, and bullet list outputs.
- Keep table/list matches above generic text cleanup and below explicit structured converters.

**Non-Goals:**

- Full RFC 4180 edge-case support beyond basic quoted CSV cells.
- Spreadsheet preview/editing UI.
- File upload/download.
- Type inference or formula evaluation.

## Decisions

- Use a small parser that handles quoted CSV cells, tabs, pipes, and Markdown table separator rows. This is enough for pasted snippets without adding a dependency.
- Normalize rows to a string matrix, then render each output format from that matrix.
- Treat single-column multi-line input as a list and still provide numbered/bullet outputs.
- Use the first row as Markdown header when multiple columns exist; otherwise use a generic `Value` header.

## Risks / Trade-offs

- CSV parsing is intentionally basic -> document with tests and refine later if real-world inputs demand it.
- Table detection may overlap with text cleanup -> confidence is higher for multi-column rows and lower for plain lists, while registry order keeps table before text.
- Large pasted tables can create large fields -> rely on existing copyable wide fields for now.

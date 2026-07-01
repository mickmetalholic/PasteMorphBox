# Change: Standardize test layout

## Summary

Standardize where repository tests live so package behavior tests stay near package source while web app workflow tests live under a single web test directory.

## Motivation

After the source tree split, tests are easy to scatter at package roots or app roots. A stable convention makes it easier to find the right test surface and keeps future component moves from leaving unrelated test files in high-level directories.

## Scope

- Document the test layout convention for packages and the web app.
- Move web app interaction and discovery tests under `apps/web/src/test`.
- Keep tool, core, registry, and package-level behavior tests colocated with the package source they exercise.

## Non-Goals

- No test framework migration.
- No broad rewrite of test assertions.
- No changes to user-facing behavior.

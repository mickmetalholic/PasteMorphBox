## ADDED Requirements

### Requirement: Test source layout

The project SHALL keep package behavior tests colocated with package source and web app behavior tests under `apps/web/src/test`.

#### Scenario: Package behavior tests

- **WHEN** a tool, registry, core, or UI package behavior is tested
- **THEN** the tests SHALL live in that package's `src` tree and import the package through its public entrypoint when validating public behavior.

#### Scenario: Web behavior tests

- **WHEN** web app interactions, examples, discovery surfaces, or route-level workflows are tested
- **THEN** the tests SHALL live under `apps/web/src/test`.

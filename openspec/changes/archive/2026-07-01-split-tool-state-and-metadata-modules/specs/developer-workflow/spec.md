## ADDED Requirements

### Requirement: Public-entrypoint regression tests during internal splits
Internal tool package splits SHALL preserve public behavior and SHALL keep behavior tests pointed at each package's public entrypoint.

#### Scenario: Metadata module extraction
- **WHEN** tool metadata or examples move into a package-local metadata module
- **THEN** tests SHALL continue importing the tool through `./index` and verifying example-backed behavior through public APIs.

#### Scenario: Helper module extraction
- **WHEN** parser, formatter, codec, pattern, or state helpers move into focused modules
- **THEN** existing detector, field, edit, and serialization tests SHALL pass without importing private helper modules.

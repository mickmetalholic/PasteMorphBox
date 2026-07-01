## ADDED Requirements

### Requirement: Web workspace package inventory

The web app SHALL keep its workspace package transpilation inventory in a dedicated configuration module.

#### Scenario: Workspace package list changes

- **WHEN** a workspace package needs to be transpiled by the web app
- **THEN** developers SHALL update the dedicated workspace package inventory rather than embedding the list directly in the general Next config object.

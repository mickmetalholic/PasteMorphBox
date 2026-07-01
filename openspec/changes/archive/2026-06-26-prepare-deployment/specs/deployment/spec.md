# Deployment Spec Delta

## ADDED Requirements

### Requirement: Static deployability

The MVP SHALL build to static assets that can be deployed without a backend service.

#### Scenario: Production build

- **WHEN** a developer runs `pnpm build`
- **THEN** the web app SHALL produce deployable assets in `apps/web/dist`.

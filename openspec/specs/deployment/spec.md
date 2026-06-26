# Deployment Spec

## Requirements

### Requirement: Static deployability

The MVP SHALL build to static assets that can be deployed without a backend service.

#### Scenario: Production build

- **WHEN** a developer runs `pnpm build`
- **THEN** the web app SHALL produce deployable assets in `apps/web/dist`.

### Requirement: Cached production build output

The workspace build configuration SHALL declare the web app static build directory as a Turborepo build output.

#### Scenario: Production build cache

- **WHEN** a developer or CI runner runs `pnpm build`
- **THEN** Turborepo SHALL know that `apps/web/dist` contains the deployable build output.

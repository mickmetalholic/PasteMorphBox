# Deployment Spec

## Purpose

Define deployment expectations for producing static frontend assets without requiring a backend service.
## Requirements
### Requirement: Static deployability

The MVP SHALL build to static assets that can be deployed without a backend service, and the web app build SHALL leave deployable assets in `apps/web/dist`.

#### Scenario: Production build

- **WHEN** a developer runs `pnpm build`
- **THEN** the web app SHALL produce deployable static assets in `apps/web/dist`.

#### Scenario: No backend runtime

- **WHEN** the production web app build is generated
- **THEN** it SHALL NOT require a Next.js server runtime, API route runtime, middleware runtime, Cloudflare Worker, or Pages Function to serve the MVP.

### Requirement: Cached production build output
The workspace build configuration SHALL declare the web app static build directory as a Turborepo build output.

#### Scenario: Production build cache
- **WHEN** a developer or CI runner runs `pnpm build`
- **THEN** Turborepo SHALL know that `apps/web/dist` contains the deployable build output.


## MODIFIED Requirements

### Requirement: Static deployability

The MVP SHALL build to static assets that can be deployed without a backend service, and the web app build SHALL leave deployable assets in `apps/web/dist`.

#### Scenario: Production build

- **WHEN** a developer runs `pnpm build`
- **THEN** the web app SHALL produce deployable static assets in `apps/web/dist`.

#### Scenario: No backend runtime

- **WHEN** the production web app build is generated
- **THEN** it SHALL NOT require a Next.js server runtime, API route runtime, middleware runtime, Cloudflare Worker, or Pages Function to serve the MVP.

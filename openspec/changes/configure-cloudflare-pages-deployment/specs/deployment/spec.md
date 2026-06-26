## ADDED Requirements

### Requirement: Cloudflare Pages configuration
The deployment setup SHALL include repository-owned Cloudflare Pages configuration for publishing the static web app without a backend service.

#### Scenario: Pages output directory
- **WHEN** Cloudflare Pages or Wrangler reads the repository deployment configuration
- **THEN** the configured build output directory SHALL be `apps/web/dist`

#### Scenario: Static host headers
- **WHEN** a developer runs `pnpm build`
- **THEN** the generated static output SHALL include Cloudflare Pages header rules for basic security headers and immutable caching of content-hashed assets

### Requirement: Cloudflare Pages deployment documentation
The project documentation SHALL describe the Cloudflare Pages settings needed to deploy the monorepo static web app.

#### Scenario: Dashboard setup
- **WHEN** a developer configures a Cloudflare Pages project from the repository
- **THEN** the documentation SHALL identify the repository root, `pnpm build` as the build command, and `apps/web/dist` as the build output directory

#### Scenario: Build runtime guidance
- **WHEN** a developer configures the Cloudflare Pages build environment
- **THEN** the documentation SHALL provide recommended Node.js and pnpm version environment variables

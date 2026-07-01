# Design: Standardize test layout

## Test Ownership

Package tests remain colocated in each package's `src` tree because they validate package contracts and should move with package internals. Web app tests move under `apps/web/src/test` because they validate route-level workflows, app composition, and discovery surfaces rather than a single component implementation file.

## Import Boundary

Tests that validate public package behavior should import through package entrypoints. Web app tests may import web app components or state through app-local relative paths, but the files themselves should stay out of the app root so route and composition files stay visually prominent.

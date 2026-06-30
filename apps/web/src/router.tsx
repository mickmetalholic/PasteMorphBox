import { createRootRoute, createRoute, createRouter, Outlet, type RouterHistory } from '@tanstack/react-router'
import { App } from './App'

type SearchParams = {
  q?: string | number | boolean
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search): SearchParams => ({
    q:
      typeof search.q === 'string' || typeof search.q === 'number' || typeof search.q === 'boolean'
        ? search.q
        : undefined,
  }),
  component: App,
})

export const routeTree = rootRoute.addChildren([Route])

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    history,
  })
}

export const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import OpportunityDetailsPage from './pages/OpportunityDetailsPage';
import SubmitOpportunityPage from './pages/SubmitOpportunityPage';
import AboutPage from './pages/AboutPage';
import BuilderPage from './pages/BuilderPage';
import { Toaster } from '@/components/ui/sonner';

function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browse',
  component: BrowsePage,
});

const opportunityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/opportunity/$id',
  component: OpportunityDetailsPage,
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit',
  component: SubmitOpportunityPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const builderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/builder',
  component: BuilderPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  browseRoute,
  opportunityRoute,
  submitRoute,
  aboutRoute,
  builderRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

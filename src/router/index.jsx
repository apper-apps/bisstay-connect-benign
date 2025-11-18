import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";
import Root from "@/layouts/Root";
import { authRoutes } from "@/router/authRoutes";

// Lazy load all page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const BrowsePropertiesPage = lazy(() => import('@/components/pages/BrowsePropertiesPage'));
const PropertyDetailPage = lazy(() => import('@/components/pages/PropertyDetailPage'));
const OwnerDashboardPage = lazy(() => import('@/components/pages/OwnerDashboardPage'));
const CompanyDashboardPage = lazy(() => import('@/components/pages/CompanyDashboardPage'));
const CreateListingPage = lazy(() => import('@/components/pages/CreateListingPage'));
const MessagesPage = lazy(() => import('@/components/pages/MessagesPage'));
const HowItWorksPage = lazy(() => import('@/components/pages/HowItWorksPage'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

// Suspense fallback component
const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<SuspenseFallback />}>
    <Component />
  </Suspense>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: withSuspense(HomePage)
  },
  {
    path: "browse",
    element: withSuspense(BrowsePropertiesPage)
  },
  {
    path: "property/:id",
    element: withSuspense(PropertyDetailPage)
  },
  {
    path: "owner-dashboard",
    element: withSuspense(OwnerDashboardPage)
  },
  {
    path: "company-dashboard",
    element: withSuspense(CompanyDashboardPage)
  },
  {
    path: "create-listing",
    element: withSuspense(CreateListingPage)
  },
  {
    path: "messages",
    element: withSuspense(MessagesPage)
  },
  {
    path: "how-it-works",
    element: withSuspense(HowItWorksPage)
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

// Router configuration
const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [...mainRoutes]
      },
      ...authRoutes
    ]
  }
];

export const router = createBrowserRouter(routes);
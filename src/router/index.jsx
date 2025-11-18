import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { getRouteConfig } from "@/router/route.utils";
import Layout from "@/components/organisms/Layout";
import Root from "@/layouts/Root";

// Lazy load page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const BrowsePropertiesPage = lazy(() => import('@/components/pages/BrowsePropertiesPage'));
const PropertyDetailPage = lazy(() => import('@/components/pages/PropertyDetailPage'));
const CreateListingPage = lazy(() => import('@/components/pages/CreateListingPage'));
const OwnerDashboardPage = lazy(() => import('@/components/pages/OwnerDashboardPage'));
const CompanyDashboardPage = lazy(() => import('@/components/pages/CompanyDashboardPage'));
const MessagesPage = lazy(() => import('@/components/pages/MessagesPage'));
const HowItWorksPage = lazy(() => import('@/components/pages/HowItWorksPage'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

// Lazy load authentication pages
const Login = lazy(() => import('@/components/pages/Login'));
const Signup = lazy(() => import('@/components/pages/Signup'));
const Callback = lazy(() => import('@/components/pages/Callback'));
const ErrorPage = lazy(() => import('@/components/pages/ErrorPage'));
const ResetPassword = lazy(() => import('@/components/pages/ResetPassword'));
const PromptPassword = lazy(() => import('@/components/pages/PromptPassword'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
  </div>
);

// Wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

// Create route helper function
const createRoute = (config) => ({
  path: config.path,
  element: withSuspense(config.component || (() => config.element)),
  ...getRouteConfig(config.path)
});

// Router configuration
// Router configuration
const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
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
        ]
      },
      // Authentication routes (outside Layout)
      {
        path: "login",
        element: withSuspense(Login)
      },
      {
        path: "signup",
        element: withSuspense(Signup)
      },
      {
        path: "callback",
        element: withSuspense(Callback)
      },
      {
        path: "error",
        element: withSuspense(ErrorPage)
      },
      {
        path: "reset-password/:appId/:fields",
        element: withSuspense(ResetPassword)
      },
      {
        path: "prompt-password/:appId/:emailAddress/:provider",
        element: withSuspense(PromptPassword)
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
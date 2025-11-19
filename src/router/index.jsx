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

// createRoute helper
const createRoute = ({ path, index, element, access, children, ...meta }) => {
  const configPath = index ? "/" : (path?.startsWith('/') ? path : `/${path}`);
  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;
  
  return {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<LoadingSpinner />}>{element}</Suspense> : element,
    handle: { access: finalAccess, ...meta },
    ...(children && { children })
  };
};

// Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Layout component - NO createRoute wrapper
    children: [
      {
        path: '/',
        element: <Layout />, // Layout component - NO createRoute wrapper
        children: [
          // Public routes with Layout
          createRoute({
            index: true,
            element: <HomePage />,
            title: 'Home'
          }),
          createRoute({
            path: 'browse',
            element: <BrowsePropertiesPage />,
            title: 'Browse Properties'
          }),
          createRoute({
            path: 'property/:id',
            element: <PropertyDetailPage />,
            title: 'Property Details'
          }),
          createRoute({
            path: 'how-it-works',
            element: <HowItWorksPage />,
            title: 'How It Works'
          }),
          
          // Protected routes with Layout
          createRoute({
            path: 'owner-dashboard',
            element: <OwnerDashboardPage />,
            title: 'Owner Dashboard'
          }),
          createRoute({
            path: 'company-dashboard',
            element: <CompanyDashboardPage />,
            title: 'Company Dashboard'
          }),
          createRoute({
            path: 'create-listing',
            element: <CreateListingPage />,
            title: 'Create Listing'
          }),
          createRoute({
            path: 'messages',
            element: <MessagesPage />,
            title: 'Messages'
          }),
          
          // 404 route
          createRoute({
            path: '*',
            element: <NotFound />,
            title: 'Page Not Found'
          })
        ]
      },
      
      // Authentication routes (outside Layout)
      createRoute({
        path: 'login',
        element: <Login />,
        title: 'Login'
      }),
      createRoute({
        path: 'signup',
        element: <Signup />,
        title: 'Sign Up'
      }),
      createRoute({
        path: 'callback',
        element: <Callback />,
        title: 'Authentication Callback'
      }),
      createRoute({
        path: 'error',
        element: <ErrorPage />,
        title: 'Error'
      }),
      createRoute({
        path: 'reset-password/:appId/:fields',
        element: <ResetPassword />,
        title: 'Reset Password'
      }),
      createRoute({
        path: 'prompt-password/:appId/:emailAddress/:provider',
        element: <PromptPassword />,
        title: 'Prompt Password'
      })
    ]
  }
]);
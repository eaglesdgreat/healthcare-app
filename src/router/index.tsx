import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import PageLoader from '@/components/PageLoader'
import AuthLayout from '@/layout/AuthLayout'
import RootLayout from '@/layout/RootLayout'
import LoginOption from '@/views/auths/LoginOption'
import SignIn from '@/views/auths/SignIn'
import SignUp from '@/views/auths/SignUp'
import LandingPage from '@/views/LandingPage'
import NotFoundPage from '@/views/NotFoundPage'

// Lazy load pages for better performance
// const LandingPage = lazy(() => import('@/views/LandingPage'))
// const AboutPage = lazy(() => import('../pages/AboutPage'));
// const ProductsPage = lazy(() => import('../pages/ProductsPage'));
// const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'login/options',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginOption />
          </Suspense>
        ),
      },
      {
        path: 'signin',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUp />
          </Suspense>
        ),
      },
      // {
      //   path: 'products',
      //   children: [
      //     {
      //       index: true,
      //       element: (
      //         <Suspense fallback={<PageLoader />}>
      //           <ProductsPage />
      //         </Suspense>
      //       ),
      //     },
      //     {
      //       path: ':productId',
      //       element: (
      //         <Suspense fallback={<PageLoader />}>
      //           <ProductDetailPage />
      //         </Suspense>
      //       ),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '/appointments',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [],
  },
])

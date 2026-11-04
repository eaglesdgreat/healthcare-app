import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import PageLoader from '@/components/PageLoader'
import ProtectedRoute from '@/components/ProtectedRoute'
import AuthLayout from '@/layout/AuthLayout'
import RootLayout from '@/layout/RootLayout'
import ActivateAccount from '@/views/auths/ActivateAccount'
import ForgetPassword from '@/views/auths/ForgetPassword'
import LoginOption from '@/views/auths/LoginOption'
import SignIn from '@/views/auths/SignIn'
import SignUp from '@/views/auths/SignUp'
import DashboardPage from '@/views/DashboardPage'
import LandingPage from '@/views/LandingPage'
import NotFoundPage from '@/views/NotFoundPage'

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
      {
        path: 'activate',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ActivateAccount />
          </Suspense>
        ),
      },
      {
        path: 'forget-password',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgetPassword />
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
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
])

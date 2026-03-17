import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import PageLoader from '@/components/PageLoader'
import RootLayout from '@/layout/RootLayout'
import NotFoundPage from '@/views/NotFoundPage'

// Lazy load pages for better performance
// const HomePage = lazy(() => import('../pages/HomePage'));
// const AboutPage = lazy(() => import('../pages/AboutPage'));
// const ProductsPage = lazy(() => import('../pages/ProductsPage'));
// const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // {
      //   index: true,
      //   element: (
      //     <Suspense fallback={<PageLoader />}>
      //       <HomePage />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: 'about',
      //   element: (
      //     <Suspense fallback={<PageLoader />}>
      //       <AboutPage />
      //     </Suspense>
      //   ),
      // },
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
])

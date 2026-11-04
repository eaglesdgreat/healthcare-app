import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NetworkStatus from '@/components/NetworkStatus'
import { AuthProvider } from '@/context/auth/AuthProvider'
import ThemeProvider from '@/context/theme/ThemeProvider'
import { router } from '@/router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <ThemeProvider>
          <NetworkStatus />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/context/auth/useAuth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  return session ? children : <Navigate to="/signin" replace />
}

import { createContext } from 'react'
import type { AuthUser, LoginResponse } from '@/api/auth'

interface AuthSession {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface AuthContextValue {
  session: AuthSession | null
  establishSession: (response: LoginResponse) => void
  clearSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { LoginResponse } from '@/api/auth'
import type { AuthContextValue } from './authContext'
import { AuthContext } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthContextValue['session']>(null)

  function establishSession(response: LoginResponse) {
    setSession({
      user: response.data,
      accessToken: response.meta.accessToken,
      refreshToken: response.meta.refreshToken,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        establishSession,
        clearSession: () => setSession(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

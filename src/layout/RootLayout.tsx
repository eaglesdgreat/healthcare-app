import { HeartPulse, LogOut } from 'lucide-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signOut as revokeSession } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth/useAuth'

export default function RootLayout() {
  const { session, clearSession } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    const refreshToken = session?.refreshToken
    clearSession()
    navigate('/', { replace: true })
    if (!refreshToken) return

    try {
      await revokeSession(refreshToken)
    } catch (error) {
      console.error('Unable to revoke the signed-out session.', error)
      toast.warn(
        'You have been signed out on this device, but the server could not revoke the session.'
      )
    }
  }

  const role = session
    ? session.user.role.charAt(0) + session.user.role.slice(1).toLowerCase()
    : undefined

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/20">
        <nav className="container-custom flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            to="/appointments"
            className="flex items-center gap-2 font-semibold text-white no-underline!"
          >
            <HeartPulse className="text-primary" aria-hidden="true" />
            Medical
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-text sm:inline">
              {session?.user.firstName} {session?.user.lastName}
              {role ? ` · ${role}` : ''}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => void handleSignOut()}
              className="min-h-10 border-white/15 text-white hover:bg-white/10"
            >
              <LogOut size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
              <span className="sm:hidden">Sign out</span>
            </Button>
          </div>
        </nav>
      </header>
      <main className="container-custom py-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  )
}

import { WifiOff } from 'lucide-react'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'

export default function NetworkStatus() {
  const isOnline = useNetworkStatus()

  if (isOnline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-sm font-medium text-amber-950"
    >
      <WifiOff aria-hidden="true" size={16} />
      You are offline. The app shell is available, but sign-in and account
      changes need a connection.
    </div>
  )
}

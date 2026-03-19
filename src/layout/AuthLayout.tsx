import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Outlet />
    </div>
  )
}

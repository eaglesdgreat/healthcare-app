import { NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-colors ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-colors ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-colors ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area - Child routes render here */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 My App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default RootLayout

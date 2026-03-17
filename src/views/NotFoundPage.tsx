import { Link, useRouteError } from 'react-router-dom'

const NotFoundPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string }
  console.error(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          {error?.statusText ||
            error?.message ||
            "The page you're looking for doesn't exist."}
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
